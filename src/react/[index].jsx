import Layout from "../Layout";
import React from "./assets/React";

export default function () {
  return (
    <Layout title="React example" css="./assets/index.css" script="./assets/index.js">
      <div class="App">
        <React component="Lottery" title="Lottery 6 from 49" />
      </div>
    </Layout>
  );
}
