import { jsxToString } from "jsx-async-runtime";
import JokesHTML from "./components/JokesHTML";
import JokesJSON from "./components/JokesJSON";

const Components = { JokesHTML, JokesJSON };

globalThis.renderJSX = async (container = "", component = "", props = {}) => {
  const Component = Components[component];
  document.getElementById(container).innerHTML = await jsxToString(
    <Component {...props} />
  );
};
