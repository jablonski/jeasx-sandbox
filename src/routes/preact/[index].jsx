import Layout from "../Layout";
import Preact from "./Preact";

export default function Jokes() {
  return (
    <Layout
      title="Jokes"
      description="Tell me some jokes"
      script="/preact/index.js"
    >
      <h1 class="center">Jokes</h1>
      <section>
        <Preact component="Clock" />
      </section>
      <section>
        <Preact component="Jokes" api="/jokes/api" initial={3} />
      </section>
    </Layout>
  );
}
