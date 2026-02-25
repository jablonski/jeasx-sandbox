import Layout from "../Layout";

export default function () {
  return (
    <Layout
      title="Jeasx with Lit"
      description="Jeasx integrates easily with Lit"
      script="./index.js"
    >
      <section class="center">
        <h1>Lit example</h1>
        <p>
          Jeasx works smoothly with <a href="https://lit.dev">Lit.</a>
        </p>
      </section>
      <section>
        <logo-animation />
        <list-animation />
      </section>
    </Layout>
  );
}
