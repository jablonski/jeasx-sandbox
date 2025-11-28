export default {
  JEASX_ROUTE_CACHE_LIMIT: 10000,

  /** @type import("fastify").FastifyServerOptions */
  FASTIFY_SERVER_OPTIONS: {
    disableRequestLogging: process.env.NODE_ENV === "development",
    bodyLimit: 1024 * 1024,
    rewriteUrl: (req) => String(req.url).replace(/^\/jeasx/, ""),
    // @ts-ignore
    http2: process.env.NODE_ENV !== "development",
  },

  /** @type import("@fastify/static").FastifyStaticOptions */
  FASTIFY_STATIC_OPTIONS: {
    maxAge:
      process.env.NODE_ENV === "development" ? 0 : 365 * 24 * 60 * 60 * 1000,
  },
};
