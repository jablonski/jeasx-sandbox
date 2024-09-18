import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Context({ request, reply }) {
  this.theme = request.query["theme"] || "light";

  return (
    <Layout
      title="Context object"
      description="Use 'this' to avoid prop drilling"
    >
      <section class="center">
        <h1>Avoid prop drilling via 'this'</h1>
        <p>
          In Jeasx you can use 'this' to provide data to subcomponents without
          prop drilling.
        </p>
        <p>
          You should use this with care, but it is a handy feature for global
          state like themes.
        </p>
        <p>Have a look at the source to see how it works.</p>
      </section>
      <hr />
      <Subcomponent />
    </Layout>
  );
}

function Subcomponent() {
  return (
    <>
      <div style="display: flex; justify-content: space-evenly; align-items: center;">
        <a href="?theme=light" role="button" disabled={this.theme === "light"}>
          Light
        </a>
        <a href="?theme=dark" role="button" disabled={this.theme === "dark"}>
          Dark
        </a>
      </div>
      <hr />
      <div
        style={{
          "background-color": this.theme === "dark" ? "black" : "lightgray",
        }}
      >
        <Subsubcomponent />
      </div>
    </>
  );
}

function Subsubcomponent() {
  return (
    <div
      style={{
        color: this.theme === "dark" ? "white" : "black",
        "text-align": "center",
      }}
    >
      {this.theme}
    </div>
  );
}
