import Layout from "../Layout";
import Animate from "./animate.svelte";
import Counter from "./counter.svelte";
import Crud from "./crud.svelte";
import Svelte from "./Svelte";

export default function () {
  return (
    <Layout title="Svelte" description="Svelte integration in Jeasx" script="./index.js">
      <div class="center">
        <h1>Svelte example</h1>
        <section>
          <p>
            <a href="https://svelte.dev" target="_blank">
              Svelte
            </a>{" "}
            is a UI framework that uses a compiler to let you write breathtakingly concise
            components that do minimal work in the browser, using languages you already know — HTML,
            CSS and JavaScript. It’s a love letter to web development.
          </p>
        </section>
        <h2>Counter example</h2>
        <Svelte component={Counter} init={5} />
        <hr />
        <h2>Crud example</h2>
        <Svelte
          component={Crud}
          data={[
            { first: "Hans", last: "Emil" },
            { first: "Max", last: "Mustermann" },
            { first: "Roman", last: "Tisch" },
          ]}
        />
        <hr />
        <h3>Animation example</h3>
        <Svelte component={Animate} />
      </div>
    </Layout>
  );
}
