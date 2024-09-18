require("dotenv/config");

module.exports = {
  apps: [
    {
      name: "jeasx:start:server",
      script: "server.js",
      watch: ["public"],
      autorestart: true,
    },
    {
      name: "jeasx:build:routes",
      script: "esbuild.config.js",
      args: "routes",
      watch: ["js", "jsx", "ts", "tsx", "json"].map((ext) => `src/**/*.${ext}`),
      ignore_watch: ["src/browser"],
      autorestart: false,
    },
    {
      name: "jeasx:build:js",
      script: "esbuild.config.js",
      args: "js",
      watch: (process.env.JEASX_BUILD_JS_WATCH
        ? process.env.JEASX_BUILD_JS_WATCH.replace(/\s/g, "").split(",")
        : ["src/browser"]
      ).flatMap((path) =>
        ["js", "jsx", "ts", "tsx", "json"].map((ext) => `${path}/**/*.${ext}`)
      ),
      autorestart: false,
    },
    {
      name: "jeasx:build:css",
      script: "esbuild.config.js",
      args: "css",
      watch: ["src/**/*.css"],
      autorestart: false,
    },
  ],
};
