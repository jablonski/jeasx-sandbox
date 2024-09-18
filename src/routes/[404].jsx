import Layout from "./Layout";

/**
 * @param {import("./types").RouteProps} props
 */
export default function PageNotFound({ request }) {
  return (
    <Layout title="404 - Resource Not Found">
      <section class="center">
        <h1>Error 404</h1>
        <p>
          The resource you requested has not been found at the specified
          address.
        </p>
        {JSON.stringify(request.headers)}
        {JSON.stringify(request.urlData())}
        <a href="/">Go to homepage</a>
      </section>
    </Layout>
  );
}
