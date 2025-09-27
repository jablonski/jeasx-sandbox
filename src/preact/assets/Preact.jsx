import preactToString from "./preact-to-string";

export default function Preact({ component, ...rest }) {
  return preactToString(component, rest);
}
