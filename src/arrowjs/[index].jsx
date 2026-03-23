import Layout from "../Layout";

export default function () {
  return (
    <Layout title="Use ArrowJS with Jeasx" css="./index.css" script="./index.js">
      <h1>Use ArrowJS with Jeasx</h1>
      <p>
        <a href="https://arrow-js.com/">ArrowJS</a> is a lightweight, lightning-fast,
        zero-dependency framework that ensures type safety without requiring a build step. It
        enables you to build fast, maintainable islands of interactivity.
      </p>
      <hr />
      <h2>Password-Generator</h2>
      <div data-arrowjs="PasswordGenerator" />
      <hr />
      <h2>Pomodoro-Timer</h2>
      <div data-arrowjs="PomodoroTimer" />
    </Layout>
  );
}
