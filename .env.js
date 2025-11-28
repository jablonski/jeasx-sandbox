export default {
  FASTIFY_SERVER_OPTIONS: {
    http2: process.env.NODE_ENV !== "development",
    disableRequestLogging: process.env.NODE_ENV === "development",
    bodyLimit: 1024 * 1024,
    rewriteUrl: (/** @type import("fastify").FastifyRequest */ req) =>
      req.url.replace(/^\/jeasx/, ""),
  },
  FASTIFY_STATIC_OPTIONS: {
    setHeaders: (
      /** @type import("@fastify/static").SetHeadersResponse */ reply,
      /** @type string */ path
    ) => {
      reply.setHeader(
        "Cache-Control",
        process.env.NODE_ENV === "development"
          ? "no-store"
          : "public,max-age=31536000,s-maxage=31536000"
      );
    },
  },
  JEASX_ROUTE_CACHE_LIMIT: 10000,
};
