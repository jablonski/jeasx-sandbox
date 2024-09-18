import Layout from "../Layout";

export default async function Jokes() {
  return (
    <Layout
      title="Jokes"
      description="Some funny jokes"
      script="/alpinejs/index.js"
      cspScriptUnsafeEval
    >
      <h1 class="center">Jokes</h1>
      <form
        method="post"
        x-data="{
              jokes:[],
              counter: +(sessionStorage.getItem('counter') || 3),
              async load(category) {
                this.jokes = await (await fetch(`/jokes/api/${category}?amount=${this.counter}`)).json()
              },
            }"
        x-effect={`sessionStorage.setItem('counter', counter)`}
      >
        <div class="grid">
          <button
            type="button"
            class="secondary"
            x-on:click="counter--"
            x-bind:disabled="counter === 1"
          >
            -
          </button>
          <button
            type="button"
            class="secondary"
            name="counter"
            x-on:click="counter++"
            x-bind:disabled="counter === 5"
          >
            +
          </button>
        </div>
        <div class="grid">
          <button
            type="button"
            name="category"
            x-on:click="load('programming')"
          >
            Tell me{" "}
            <span x-text="counter === 1 ? `a joke` : `${counter} jokes`" />
          </button>
        </div>
        <div class="grid">
          <button type="button" name="category" x-on:click="load('general')">
            Tell me{" "}
            <span x-text="counter === 1 ? `a pun` : `${counter} puns`" />
          </button>
        </div>
        <template x-if="jokes.length">
          <ul>
            <template x-for="joke in jokes">
              <li x-text="joke" />
            </template>
          </ul>
        </template>
      </form>
    </Layout>
  );
}
