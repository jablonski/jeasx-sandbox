import { jsxToString } from "jsx-async-runtime";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Prepare "this" context
  this.request = request;
  this.reply = reply;

  // Add target=_blank to all external links
  this.jsxToString = (jsxElement) => {
    if (jsxElement?.type === "tag") {
      if (jsxElement?.tag === "a" && jsxElement?.props?.href?.startsWith("https://")) {
        jsxElement.props.target = "_blank";
      }
    }
    return jsxToString.call(this, jsxElement);
  };
}
