import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function PageNotFound({ request }) {
  const { url, query, method, headers, body } = request;
  const urlData = request.urlData();

  return (
    <Layout title="404 - Resource Not Found">
      <section class="center">
        <h1>Error 404</h1>
        <p>
          The resource you requested has not been found at the specified
          address.
        </p>
        {JSON.stringify(urlData)}
        {JSON.stringify({
          node: `${process.version} (${process.arch})`,
          url,
          query,
          method,
          headers,
          body,
        })}
        <a href="/">Go to homepage</a>
      </section>
    </Layout>
  );
}
