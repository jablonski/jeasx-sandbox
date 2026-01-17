const NODE_ENV_IS_DEVELOPMENT = process.env.NODE_ENV === "development";

export default {
  /** @type import("fastify").FastifyServerOptions */
  FASTIFY_SERVER_OPTIONS: {
    disableRequestLogging: NODE_ENV_IS_DEVELOPMENT,
    bodyLimit: 1024 * 1024,
    rewriteUrl: (req) => String(req.url).replace(".html", ""),
    // @ts-ignore
    http2: !NODE_ENV_IS_DEVELOPMENT,
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
    immutable: !NODE_ENV_IS_DEVELOPMENT,
    maxAge: NODE_ENV_IS_DEVELOPMENT ? 0 : "365d",
  },

  /** @type import("@fastify/formbody").FastifyFormbodyOptions */
  // FASTIFY_FORMBODY_OPTIONS: {},

  /** @type import("@fastify/multipart").FastifyMultipartOptions */
  // FASTIFY_MULTIPART_OPTIONS: {},
};
