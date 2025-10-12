import reactToString from "./react-to-string";

export default function React({ component, ...rest }) {
  return { html: reactToString(component, rest) };
}
