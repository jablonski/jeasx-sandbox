import fastifyCompress from "@fastify/compress";
import mdx from "@mdx-js/esbuild";
import sveltePlugin from "esbuild-svelte";
import rehypePrismPlus from "rehype-prism-plus";
import rehypeSlug from "rehype-slug";
import remarkGFM from "remark-gfm";

const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_SERVER_OPTIONS: () => ({
    plugins: [
      sveltePlugin({ compilerOptions: { generate: "server", css: "injected" } }),
      mdx({
        development: NODE_ENV_IS_DEVELOPMENT,
        jsxImportSource: "jsx-async-runtime",
        elementAttributeNameCase: "html",
        stylePropertyNameCase: "css",
        remarkPlugins: [[remarkGFM, { singleTilde: false }]],
        rehypePlugins: [rehypePrismPlus, [rehypeSlug, { prefix: "jeasx-" }]],
      }),
    ],
  }),

  /** @type {() => import("esbuild").BuildOptions} */
  ESBUILD_BROWSER_OPTIONS: () => ({
    plugins: [sveltePlugin({ compilerOptions: { generate: "client", css: "injected" } })],
    target: ["chrome130", "edge130", "firefox130", "safari18"],
  }),

  /** @type {(fastify: import("fastify").FastifyInstance) => import("fastify").FastifyInstance} */
  FASTIFY_SERVER: (fastify) => fastify.register(fastifyCompress),

  /** @type {() => import("fastify").FastifyServerOptions} */
  FASTIFY_SERVER_OPTIONS: () => ({
    disableRequestLogging: NODE_ENV_IS_DEVELOPMENT,
    bodyLimit: 1024 * 1024,
    rewriteUrl: (req) => String(req.url).replace(/\.html(?=\?|$)/, ""),
    ...(!NODE_ENV_IS_DEVELOPMENT ? { http2: true } : {}),
  }),

  /** @type {() => import("@fastify/cookie").FastifyCookieOptions} */
  FASTIFY_COOKIE_OPTIONS: () => ({
    parseOptions: {
      path: "/",
      httpOnly: true,
      secure: "auto",
      sameSite: "strict",
    },
  }),

  /** @type {() => import("@fastify/static").FastifyStaticOptions} */
  FASTIFY_STATIC_OPTIONS: () => ({
    immutable: !NODE_ENV_IS_DEVELOPMENT,
    maxAge: NODE_ENV_IS_DEVELOPMENT ? 0 : "365d",
  }),

  /** @type {() => import("@fastify/formbody").FastifyFormbodyOptions} */
  // FASTIFY_FORMBODY_OPTIONS: () => ({}),

  /** @type {() => import("@fastify/multipart").FastifyMultipartOptions} */
  // FASTIFY_MULTIPART_OPTIONS: () => ({}),
};
