export default {
  JEASX_ROUTE_CACHE_LIMIT: 10000,

  /** @type import("fastify").FastifyServerOptions */
  FASTIFY_SERVER_OPTIONS: {
    // @ts-ignore
    http2: process.env.NODE_ENV !== "development",
    disableRequestLogging: process.env.NODE_ENV === "development",
    bodyLimit: 1024 * 1024,
    rewriteUrl: (req) => req.url?.replace(/^\/jeasx/, ""),
  },

  /** @type import("@fastify/static").FastifyStaticOptions */
  FASTIFY_STATIC_OPTIONS: {
    setHeaders: (reply, path, stats) => {
      reply.setHeader(
        "Cache-Control",
        process.env.NODE_ENV === "development"
          ? "no-store"
          : "public,max-age=31536000,s-maxage=31536000"
      );
    },
  },
};
