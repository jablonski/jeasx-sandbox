import reactToString from "./react-to-string";

export default function React({ component, ...rest }) {
  return reactToString(component, rest);
}
