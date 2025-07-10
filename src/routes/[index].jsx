import Layout from "./Layout";
import sitemap from "./sitemap.json";

/**
 * @param {import("./types").RouteProps} props
 */
export default function Frontpage({}) {
  return (
    <Layout title="Jeasx-Expo" description="Welcome to Jeasx - JSX with Ease">
      <section class="center">
        <h1>Jeasx-Expo</h1>
        <p>
          Here are some examples of what can be done with the power of{" "}
          <a href="https://www.jeasx.dev">Jeasx</a>.
        </p>
        <p>
          The examples are styled with{" "}
          <a href="https://picocss.com" target="_blank">
            Pico CSS
          </a>{" "}
          (mostly classless), so they are easier to read in source code. The
          code is also optimized for readability: no unnecessary abstractions,
          no fancy stuff, just simple and clean code to get you started quickly.
        </p>
      </section>
      {sitemap.map(({ title, description, links }) => (
        <section class="center">
          <hr />
          <h2>{title}</h2>
          <p>{description}</p>
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
