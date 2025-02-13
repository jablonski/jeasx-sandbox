import Layout from "../Layout";

export default function () {
  return (
    <Layout script="/client-jsx/index.js">
      <h1 class="center">JSX components in the browser</h1>
      <p class="center">
        You can use JSX components built with{" "}
        <a href="https://github.com/jeasx/jsx-async-runtime" target="_blank">
          jsx-async-runtime
        </a>{" "}
        also in the browser for lightweight rendering of client-side markup.
      </p>
      <form
        action={
          /* js */ `javascript:
          renderJSX(
            "root", 
            document.getElementById('component').value,
            {
                category: document.getElementById('category').value,
                amount: document.getElementById('number').value
            }
            );`
        }
      >
        <input type="number" id="number" min="1" max="5" value="3" />
        <select id="category">
          <option>general</option>
          <option>knock-knock</option>
          <option>programming</option>
        </select>
        <select id="component">
          <option value="JokesHTML">HTML</option>
          <option value="JokesJSON">JSON</option>
        </select>
        <button type="submit">Tell me jokes</button>
      </form>
      <div id="root"></div>
    </Layout>
  );
}
