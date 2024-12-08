import Layout from "./Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function PageNotFound({}) {
  return (
    <Layout title="404 - Page not found">
      <h2>Error 404</h2>
      <p>The page does not exist.</p>
      <a href="/wizard">To the homepage</a>
    </Layout>
  );
}
