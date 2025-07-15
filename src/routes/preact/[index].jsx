import Layout from "../Layout";
import Preact from "./Preact";

export default function () {
  return (
    <Layout
      title="Jokes"
      description="Tell me some jokes"
      script="/preact/index.js"
    >
      <div class="center">
        <h1>Preact examples with state &amp; signals</h1>
        <section>
          <h2>Jokes</h2>
          <p>The jokes widget handles reactivity via manipulating state.</p>
          <div style="text-align:left">
            <Preact component="Jokes" api="/jokes/api" initial={3} />
          </div>
        </section>
        <div>
          <h2>Clocks</h2>
          <p>
            Both clocks are synchronized via a common signal. You can use this
            pattern to create interactive islands which share a common state.
          </p>
          <div style="display:flex; flex-direction:row; gap:2rem; justify-content: center;">
            <section>
              <h3>en-US</h3>
              <Preact component="Clock" locale="en-US" />
            </section>
            <section>
              <h3>de-DE</h3>
              <Preact component="Clock" locale="de-DE" />
            </section>
          </div>
        </div>
      </div>
    </Layout>
  );
}
