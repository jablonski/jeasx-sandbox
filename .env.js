export default {
  /** @type import("fastify").FastifyServerOptions */
  FASTIFY_SERVER_OPTIONS: {
    disableRequestLogging: process.env.NODE_ENV === "development",
    bodyLimit: 1024 * 1024,
    rewriteUrl: (req) => String(req.url).replace(/^\/foo/, ""),
    // @ts-ignore
    http2: process.env.NODE_ENV !== "development",
  },

  /** @type import("@fastify/cookie").FastifyCookieOptions */
  FASTIFY_COOKIE_OPTIONS: {
    parseOptions: {
      path: "/",
      httpOnly: true,
      secure: "auto",
      sameSite: "strict",
    },
  },

  /** @type import("@fastify/static").FastifyStaticOptions */
  FASTIFY_STATIC_OPTIONS: {
    immutable: process.env.NODE_ENV !== "development",
    maxAge: process.env.NODE_ENV === "development" ? "0" : "365d",
  },
};
