import Layout from "../Layout";
import React from "./assets/React";

/**
 * @param {import("../types").RouteProps} props
 */
export default function ({}) {
  return (
    <Layout
      title="React example"
      css="/react/assets/index.css"
      script="/react/assets/index.js"
    >
      <div class="App">
        <React component="Lottery" title="Lottery 6 from 49" />
      </div>
    </Layout>
  );
}
