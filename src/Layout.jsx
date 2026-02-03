/**
 * @this {import("./types").ThisContext}
 */
export default function Layout({
  title = "",
  description = "",
  css = "/index.css",
  script = undefined,
  robots = undefined,
  children = undefined,
}) {
  const path = this.request.path;
  return (
    <>
      {{ html: "<!DOCTYPE html>" }}
      <html lang="en">
        <head>
          <base href={`${path.endsWith("/") ? path : path + "/"}`} />
          <meta charset="utf-8" />
          <meta name="description" content={description} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <meta name="robots" content={robots} />
          <link rel="stylesheet" href={`${css}?${process.env.BUILD_TIME}`} />
          <link
            rel="canonical"
            href={`https://expo.jeasx.dev${path.endsWith("/") ? path.slice(0, -1) : path}`}
          ></link>
          {script && <script type="module" src={`${script}?${process.env.BUILD_TIME}`}></script>}
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
                href={`https://github.com/jeasx/jeasx-expo/tree/main/src/${path.split("/")[1]}`}
                target="_blank"
                style={{
                  position: "absolute",
                  top: "1rem",
                  left: "calc(100vw - 4em)",
                }}
              >
                <img
                  src="/icons/github.svg"
                  width="20"
                  height="20"
                  alt="GitHub Logo"
                  title="Server source"
                />
              </a>
            </header>
          )}
          <main class="container">{children}</main>
        </body>
      </html>
    </>
  );
}
