import Layout from "./Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function PageNotFound({}) {
  return (
    <Layout title="404 - Seite nicht gefunden">
      <h2>Fehler 404</h2>
      <p>Die Seite existiert nicht.</p>
      <a href="/wizard">Zur Homepage</a>
    </Layout>
  );
}
