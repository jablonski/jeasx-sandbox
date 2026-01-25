import mdx from "@mdx-js/esbuild";
import * as esbuild from "esbuild";
import env from "./env.js";

await env();

const BUILD_TIME = `"${Date.now().toString(36)}"`;

const BROWSER_PUBLIC_ENV = Object.keys(process.env)
  .filter((key) => key.startsWith("BROWSER_PUBLIC_"))
  .reduce(
    (env, key) => {
      env[`process.env.${key}`] = `"${process.env[key]}"`;
      return env;
    },
    { "process.env.BROWSER_PUBLIC_BUILD_TIME": BUILD_TIME }
  );

const ESBUILD_BROWSER_TARGET =
  process.env.ESBUILD_BROWSER_TARGET ?
    process.env.ESBUILD_BROWSER_TARGET.replace(/\s/g, "").split(",")
  : ["chrome130", "edge130", "firefox130", "safari18"];

const ESBUILD_MDX_OPTIONS = JSON.parse(process.env.ESBUILD_MDX_OPTIONS || "{}");
for (const key of ["remarkPlugins", "rehypePlugins", "recmaPlugins"]) {
  if (key in ESBUILD_MDX_OPTIONS) {
    const plugins = [];
    for (const config of ESBUILD_MDX_OPTIONS[key]) {
      const plugin = [];
      plugin.push(
        (await import(Array.isArray(config) ? config[0] : config)).default
      );
      if (config.length === 2) {
        plugin.push(config[1]);
      }
      plugins.push(plugin);
    }
    ESBUILD_MDX_OPTIONS[key] = plugins;
  }
}

const ESBUILD_MDX_PLUGIN = mdx({
  development: process.env.NODE_ENV === "development",
  jsxImportSource: "jsx-async-runtime",
  elementAttributeNameCase: "html",
  stylePropertyNameCase: "css",
  ...ESBUILD_MDX_OPTIONS
});

/** @type esbuild.BuildOptions[] */
const buildOptions = [
  {
    entryPoints: ["js", "ts", "jsx", "tsx", "mdx"].map(
      (ext) => `src/**/[*].${ext}`
    ),
    define: {
      "process.env.BUILD_TIME": BUILD_TIME
    },
    minify: process.env.NODE_ENV !== "development",
    logLevel: "info",
    logOverride: {
      "empty-glob": "silent"
    },
    color: true,
    bundle: true,
    sourcemap: process.sourceMapsEnabled,
    sourcesContent: false,
    outdir: "dist/server",
    platform: "neutral",
    packages: "external",
    plugins: [ESBUILD_MDX_PLUGIN]
  },
  {
    entryPoints: ["js", "ts", "jsx", "tsx", "css"].map(
      (ext) => `src/**/index.${ext}`
    ),
    define: BROWSER_PUBLIC_ENV,
    minify: process.env.NODE_ENV !== "development",
    logLevel: "info",
    logOverride: {
      "empty-glob": "silent"
    },
    color: true,
    bundle: true,
    sourcemap: process.sourceMapsEnabled,
    sourcesContent: true,
    outdir: "dist/browser",
    platform: "browser",
    format: "esm",
    target: ESBUILD_BROWSER_TARGET,
    external: [
      "*.avif",
      "*.gif",
      "*.jpg",
      "*.jpeg",
      "*.png",
      "*.svg",
      "*.webp",
      "*.eot",
      "*.ttf",
      "*.otf",
      "*.woff",
      "*.woff2"
    ],
    plugins: [ESBUILD_MDX_PLUGIN]
  }
];

buildOptions.forEach(async (options) => {
  if (process.env.NODE_ENV === "development") {
    (await esbuild.context(options)).watch();
  } else {
    await esbuild.build(options);
  }
});
