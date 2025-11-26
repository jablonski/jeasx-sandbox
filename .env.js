const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  FASTIFY_SERVER_OPTIONS: {
    disableRequestLogging: NODE_ENV_IS_DEVELOPMENT,
    bodyLimit: 1024 * 1024,
    rewriteUrl: (/** @type import("fastify").FastifyRequest */ req) =>
      req.url.replace(/^\/jeasx/, ""),
  },
  FASTIFY_STATIC_HEADERS: NODE_ENV_IS_DEVELOPMENT
    ? { "": { "Cache-Control": "no-store" } }
    : {
        "": { "Cache-Control": "public,max-age=31536000,s-maxage=31536000" },
        "robots.txt": { "Cache-Control": "public,max-age=100,s-maxage=100" },
      },
  JEASX_ROUTE_CACHE_LIMIT: 10000,
};
