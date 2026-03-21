import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request }) {
  if (request.headers["fx-request"] === "true") {
    return <Fragment request={request} />;
  }

  return (
    <Layout
      title="Fixi.js and Jeasx - lightweight hypermedia controls"
      description="Jeasx integrates easily with fixi.js"
      script="./index.js"
    >
      <h1>Fixi.js and Jeasx - lightweight hypermedia controls</h1>
      <p>
        <a href="https://github.com/bigskysoftware/fixi" target="_blank">
          Fixi.js
        </a>{" "}
        is a minimalist alternative to HTMX, developed by the creators of HTMX. Enhancing a Jeasx
        server rendered application with Fixi.js works without problems.
      </p>
      <h2>Link editor example</h2>
      <Fragment request={request} />
    </Layout>
  );
}

const entries = (globalThis.entries = {
  0: { name: "Jeasx", link: "https://www.jeasx.dev" },
  1: { name: "jsx-async-runtime", link: "https://github.com/jeasx/jsx-async-runtime" },
  2: { name: "Fastify", link: "https://fastify.dev" },
  3: { name: "esbuild", link: "https://esbuild.github.io" },
});

function Fragment({ request }) {
  const body = request?.body || {};

  if (["save", "create"].includes(body["action"])) {
    entries[body["id"]] = {
      name: body["name"],
      link: body["link"],
    };
  }

  return (
    <article id="entries" class="card-secondary">
      {Object.entries(entries).map(([id, { name, link }]) => {
        const isEditMode = body["id"] === id && ["edit", "create"].includes(body["action"]);
        return (
          <form class="row" fx-action="." fx-method="post" fx-target="#entries">
            <input type="hidden" name="id" value={id} />
            <div class="col-md-4 col-sm-12">
              {isEditMode ? (
                <input type="text" name="name" value={name} placeholder="Please enter the name" />
              ) : (
                name
              )}
            </div>
            <div class="col-md-6 col-sm-12">
              {isEditMode ? (
                <input type="text" name="link" value={link} placeholder="Please enter the URL" />
              ) : (
                link
              )}
            </div>
            <div class="col-md-2 col-sm-12">
              {isEditMode ? (
                <button type="submit" name="action" value="save">
                  Save
                </button>
              ) : (
                <button type="submit" name="action" value="edit">
                  Edit
                </button>
              )}
            </div>
          </form>
        );
      })}
      <form class="row" fx-action="." fx-method="post" fx-target="#entries">
        <div class="offset-md-10 col-md-2 col-sm-12">
          <input type="hidden" name="id" value={Object.keys(entries).length} />
          <button type="submit" name="action" value="create">
            Add
          </button>
        </div>
      </form>
    </article>
  );
}
