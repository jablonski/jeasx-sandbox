import preactToString from "../../browser/preact/preact-to-string";

export default function Preact({ component, ...rest }) {
  return preactToString(component, rest);
}
