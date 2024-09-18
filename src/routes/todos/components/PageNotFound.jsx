import Layout from "./Layout";

export default function PageNotFound() {
  return (
    <Layout title="Error 404" description="Resource Not Found">
      <h1>Error 404</h1>
      <p>
        The resource you requested has not been found at the specified address.
      </p>
      <a href="/">Go to homepage</a>
    </Layout>
  );
}
