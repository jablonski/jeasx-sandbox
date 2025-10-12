import Layout from "../Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ({ request }) {
  const text = request.body?.["text"];
  return (
    <Layout title="SVG demo">
      <form method="post">
        <label>
          Enter some text
          <input type="text" name="text" value={text} autofocus />
        </label>
        <input type="submit" value="Submit" />
      </form>
      {text && <img src={`/svg/logo.svg?text=${encodeURIComponent(text)}`} />}
    </Layout>
  );
}
