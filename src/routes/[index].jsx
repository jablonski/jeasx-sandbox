import Layout from "./Layout";
import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Frontpage({}) {
  return (
    <Layout title="jeasx expo" description="Welcome to jeasx - JSX with Ease">
      <section class="center">
        <h1>jeasx - expo</h1>
        <p>
          Here are some simple examples of what can be done with the power of{" "}
          <a href="https://www.jeasx.dev">jeasx</a>.
        </p>
      </section>
      {sitemap.map(({ title, links }) => (
        <section class="center">
          <hr />
          <h2>{title}</h2>
          <div class="grid">
            {links.map(({ title, path }) => (
              <a href={path}>
                <article>{title}</article>
              </a>
            ))}
          </div>
        </section>
      ))}
    </Layout>
  );
}
