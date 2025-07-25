import fastifyCookie from "@fastify/cookie";
import fastifyFormbody from "@fastify/formbody";
import fastifyMultipart from "@fastify/multipart";
import fastifyStatic from "@fastify/static";
import Fastify, { FastifyReply, FastifyRequest } from "fastify";
import { jsxToString } from "jsx-async-runtime";
import { stat } from "node:fs/promises";
import { join } from "node:path";
import env from "./env.js";

env();

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";
const CWD = process.cwd();

const FASTIFY_STATIC_HEADERS =
  process.env.FASTIFY_STATIC_HEADERS &&
  JSON.parse(process.env.FASTIFY_STATIC_HEADERS);

const JEASX_ROUTE_CACHE_LIMIT =
  process.env.JEASX_ROUTE_CACHE_LIMIT &&
  JSON.parse(process.env.JEASX_ROUTE_CACHE_LIMIT);

declare module "fastify" {
  interface FastifyRequest {
    path: string; // Path without query parameters
    route: string; // Path to resolved route handler
  }
}

// Create and export a Fastify app instance
export default Fastify({
  logger: true,
  disableRequestLogging: JSON.parse(
    process.env.FASTIFY_DISABLE_REQUEST_LOGGING || "false"
  ),
  bodyLimit: Number(process.env.FASTIFY_BODY_LIMIT) || undefined,
  trustProxy: JSON.parse(process.env.FASTIFY_TRUST_PROXY || "false"),
  rewriteUrl:
    process.env.FASTIFY_REWRITE_URL &&
    new Function(`return ${process.env.FASTIFY_REWRITE_URL}`)(),
})
  .register(fastifyCookie)
  .register(fastifyFormbody)
  .register(fastifyMultipart, {
    attachFieldsToBody: JSON.parse(
      process.env.FASTIFY_MULTIPART_ATTACH_FIELDS_TO_BODY || '"keyValues"'
    ),
  })
  .register(fastifyStatic, {
    root: ["public", "dist/browser"].map((dir) => join(CWD, dir)),
    prefix: "/",
    wildcard: false,
    cacheControl: false,
    setHeaders: FASTIFY_STATIC_HEADERS
      ? (reply, path) => {
          for (const [suffix, headers] of Object.entries(
            FASTIFY_STATIC_HEADERS
          )) {
            if (path.endsWith(suffix)) {
              for (const [key, value] of Object.entries(headers)) {
                reply.setHeader(key, value);
              }
            }
          }
        }
      : undefined,
  })
  .decorateRequest("route", "")
  .decorateRequest("path", "")
  .addHook("onRequest", async (request, reply) => {
    // Set default content type to text/html
    reply.header("Content-Type", "text/html; charset=utf-8");
    // Extract path from url
    const index = request.url.indexOf("?");
    request.path = index === -1 ? request.url : request.url.slice(0, index);
  })
  .all("*", async (request: FastifyRequest, reply: FastifyReply) => {
    try {
      return await handler(request, reply);
    } catch (error) {
      console.error("❌", error);
      throw error;
    }
  });

// Cache for resolved route modules, 'null' means no module exists.
const modules = new Map<string, { default: Function }>();

/**
 * Resolves route module based on the request path and execute it.
 */
async function handler(request: FastifyRequest, reply: FastifyReply) {
  let response: unknown;

  // Global context object for route handlers
  const context = {};

  try {
    // Execute route handlers for current request
    for (const route of generateRoutes(request.path)) {
      // Resolve module via cache
      let module = modules.get(route);

      // Module was cached as not found?
      if (module === null) {
        continue;
      }

      // Module was not loaded yet?
      if (module === undefined) {
        try {
          const modulePath = join(CWD, "dist", `routes${route}.js`);
          if (NODE_ENV_IS_DEVELOPMENT) {
            if (typeof require === "function") {
              // Bun: Remove module from cache before importing
              // as query parameter for import is ignored (see Node.js).
              if (require.cache[modulePath]) {
                delete require.cache[modulePath];
              }
              module = await import(`file://${modulePath}`);
            } else {
              // Node.js: Use timestamp as query parameter to update modules.
              const mtime = (await stat(modulePath)).mtime.getTime();
              module = await import(`file://${modulePath}?${mtime}`);
            }
          } else {
            // Load and cache module for non-development
            module = await import(`file://${modulePath}`);
            modules.set(route, module);
          }
        } catch {
          if (!NODE_ENV_IS_DEVELOPMENT) {
            // Cache module as not found
            modules.set(route, null);
          }
          continue;
        } finally {
          // Remove oldest entry from cache if limit is reached
          if (
            typeof JEASX_ROUTE_CACHE_LIMIT === "number" &&
            modules.size > JEASX_ROUTE_CACHE_LIMIT
          ) {
            modules.delete(modules.keys().next().value);
          }
        }
      }

      // Store current route in request
      request.route = route;

      // Call the handler with request, reply and optional props
      response = await module.default.call(context, {
        request,
        reply,
        ...(typeof response === "object" ? response : {}),
      });

      if (reply.sent) {
        return;
      } else if (
        typeof response === "string" ||
        Buffer.isBuffer(response) ||
        isJSX(response)
      ) {
        break;
      } else if (
        route.endsWith("/[...guard]") &&
        (response === undefined || typeof response === "object")
      ) {
        continue;
      } else if (route.endsWith("/[404]")) {
        reply.status(404);
        break;
      } else if (reply.statusCode === 404) {
        continue;
      } else {
        break;
      }
    }
    return await renderJSX(context, response);
  } catch (error) {
    const errorHandler = context["errorHandler"];
    if (typeof errorHandler === "function") {
      reply.status(500);
      response = await errorHandler.call(context, error);
      return await renderJSX(context, response);
    } else {
      throw error;
    }
  }
}

/**
 * Generates all possible routes based on the given input path.
 */
function generateRoutes(path: string): string[] {
  // "/a/b/c" => ["/a/b/c", "/a/b", "/a", ""]
  const segments = generateSegments(path);

  // "/a/b/c" => ["/a/b/[c]", "/a/b/c/[index]"]
  const edges = generateEdges(segments[0]);

  return [
    ...segments
      .toReversed() // [...guard]s are evaluated from top to bottom
      .map((segment) => `${segment}/[...guard]`),
    ...edges.map((edge) => `${edge}`),
    ...segments.map((segment) => `${segment}/[...path]`),
    ...segments.map((segment) => `${segment}/[404]`),
  ];
}

/**
 * Transforms a given path into an array of all its segments.
 *
 * @example
 * generateSegments("/a/b/c") => ["/a/b/c", "/a/b", "/a", ""]
 */
function generateSegments(path: string): string[] {
  return path
    .split("/")
    .filter((segment) => segment !== "")
    .reduce((acc, segment) => {
      acc.push((acc.length > 0 ? acc[acc.length - 1] : "") + "/" + segment);
      return acc;
    }, [])
    .reverse()
    .concat("");
}

/**
 * Generates edge routes for the given input path.
 *
 * An edge is either a route with a named segment (e.g. "/a/b/[c]")
 * or a route with an "index" segment (e.g. "/a/b/c/[index]").
 */
function generateEdges(path: string): string[] {
  const edges = [];
  if (path) {
    const lastSegment = path.lastIndexOf("/") + 1;
    edges.push(
      `${path.substring(0, lastSegment)}[${path.substring(lastSegment)}]`
    );
  }
  edges.push(`${path}/[index]`);
  return edges;
}

/**
 * Determines if a given object is a JSX element.
 */
function isJSX(obj: unknown): boolean {
  return !!obj && typeof obj === "object" && "type" in obj && "props" in obj;
}

/**
 * Renders JSX to string and applies optional response handler.
 */
async function renderJSX(context: object, response: unknown) {
  const payload = isJSX(response)
    ? await jsxToString.call(context, response)
    : response;

  // Post-process the payload with an optional response handler
  const responseHandler = context["responseHandler"];
  return typeof responseHandler === "function"
    ? await responseHandler.call(context, payload)
    : payload;
}
