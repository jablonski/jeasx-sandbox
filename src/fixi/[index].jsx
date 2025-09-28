import Layout from "../Layout";
import Edit from "./[edit]";
import View from "./[view]";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  const body = request.body || { action: "edit" };
  return (
    <Layout
      title="Fixi example"
      description="Jeasx integrates easily with Fixi"
      script="./index.js"
    >
      <h1 class="center">Fixi example</h1>
      <p>
        Jeasx is the perfect match for{" "}
        <a href="https://github.com/bigskysoftware/fixi" target="_blank">
          Fixi
        </a>{" "}
        because it makes it easy to create routes that emit HTML fragments. This
        example works even without JavaScript.
      </p>
      {body["action"] === "edit" ? (
        <Edit request={request} reply={reply} />
      ) : (
        <View request={request} reply={reply} />
      )}
    </Layout>
  );
}
