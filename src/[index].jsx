import Layout from "./Layout";
import sitemap from "./sitemap.json";

export default function () {
  return (
    <Layout title="The power of Jeasx in examples" description="Welcome to Jeasx - JSX with Ease">
      <section class="hero hero-primary">
        <div class="container">
          <h1>Explore Jeasx</h1>
          <p class="hero-tagline">
            Asynchronous JSX as self-evident templating technology
            <br />
            for the server-side rendered web.
          </p>
          <p>
            Visit <a href="https://www.jeasx.dev">jeasx.dev</a> to learn more about the framework...
          </p>
        </div>
      </section>
      <section>
        <div class="container center">
          <p>
            The examples are styled with <a href="https://mucss.org/">µCSS</a> (a lightweight,
            themeable CSS framework), so they are easier to read in source code. The code is also
            optimized for readability: no unnecessary abstractions, no fancy stuff, just simple and
            clean code to get you started quickly.
          </p>
          <p>
            You can find the complete repository on{" "}
            <a href="https://github.com/jeasx/jeasx-expo">GitHub</a> to start experimenting with
            Jeasx right on your computer.
          </p>
        </div>
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
