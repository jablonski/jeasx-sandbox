/**
 * @this {import("./types").ThisContext}
 */
export default function Layout({
  title = "",
  description = "",
  children = [],
  css = "/index.css",
  script = undefined,
  cspScriptUnsafeEval = false,
}) {
  const path = this.request.path;
  const version =
    process.env.NODE_ENV === "development"
      ? Date.now().toString(36)
      : process.env.BUILD_TIME;

  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta
            http-equiv="Content-Security-Policy"
            content={`default-src 'none'; script-src 'self'${cspScriptUnsafeEval ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'none'; form-action 'self'; base-uri 'self'; connect-src 'self'; frame-src 'self';`}
          />
          <meta http-equiv="Referrer-Policy" content="same-origin" />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="view-transition" content="same-origin" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`${css}?${version}`} />
          {script && (
            <script type="module" src={`${script}?${version}`} defer></script>
          )}
          <title>{title} &raquo; Jeasx - JSX with Ease</title>
        </head>
        <body>
          {path !== "/" && (
            <header>
              <a
                href="/"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "1rem",
                }}
              >
                &laquo; Back
              </a>
              <a
                href={`https://github.com/jeasx/jeasx-expo/tree/main/src/routes/${
                  path.split("/")[1]
                }`}
                target="_blank"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "calc(100vw - 6em)",
                }}
              >
                Source &raquo;
              </a>
            </header>
          )}
          <main class="container">{children}</main>
        </body>
      </html>
    </>
  );
}
