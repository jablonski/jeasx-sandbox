import reactToString from "../../browser/react/react-to-string";

export default function React({ component, ...rest }) {
  return reactToString(component, rest);
}
