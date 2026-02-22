import { render } from "svelte/server";
import Layout from "../Layout";
import App from "./app.svelte";

export default function () {
  return (
    <Layout title="Svelte" description="Svelte integration in Jeasx" script="./index.js">
      <div class="center">
        <h1>Svelte example</h1>
        <section>
          <p>
            Svelte is a UI framework that uses a compiler to let you write breathtakingly concise
            components that do minimal work in the browser, using languages you already know — HTML,
            CSS and JavaScript. It’s a love letter to web development.
          </p>
          <div id="app">{render(App)}</div>
        </section>
      </div>
    </Layout>
  );
}
