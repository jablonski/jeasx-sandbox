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
  return (
    <>
      {"<!DOCTYPE html>"}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta
            http-equiv="content-security-policy"
            content={`default-src 'none'; script-src 'self'${cspScriptUnsafeEval ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; font-src 'self'; img-src 'self' data:; object-src 'none'; form-action 'self'; base-uri 'self'; connect-src 'self'; frame-src 'self';`}
          />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="stylesheet" href={`${css}?${process.env.BUILD_TIME}`} />
          {script && (
            <script
              type="module"
              src={`${script}?${process.env.BUILD_TIME}`}
              defer
            ></script>
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
