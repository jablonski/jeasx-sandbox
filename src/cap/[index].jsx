import Layout from "../Layout";
import cap from "./cap";

/**
 * @param {import("../types").RouteProps} props
 */
export default async function ({ request }) {
  if (request.method === "POST") {
    const token = request.body?.["cap-token"];
    if (token) {
      const { success } = await cap.validateToken(token);
      if (success) {
        const name = request.body?.["name"];
        return (
          <Layout>
            <h1>Thank you, {name}!</h1>
            <p>Simply reload this page to simulate an invalid captcha process.</p>
            <hr />
            <a href={request.path}>Start again</a>
          </Layout>
        );
      } else {
        return (
          <Layout>
            <h1>No success!</h1>
            <a href={request.path}>Start again</a>
          </Layout>
        );
      }
    }
  }

  return (
    <Layout
      title="Captcha example"
      description="Using Cap.js as proof-of-work captcha"
      script="./index.js"
    >
      <h1 class="center">Cap.js</h1>
      <p class="center">
        A modern, lightning-quick PoW captcha Cap is a lightweight, modern open-source CAPTCHA
        alternative using proof-of-work.
        <br />
        <a href="https://capjs.js.org" target="_blank">
          Learn more...
        </a>
      </p>
      <form action="" method="post">
        <label>
          Enter your name:
          <input type="text" name="name" value={request?.body?.["name"]} />
        </label>
        <label>
          <cap-widget data-cap-api-endpoint={`${request.path}/`}></cap-widget>
        </label>
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </Layout>
  );
}
