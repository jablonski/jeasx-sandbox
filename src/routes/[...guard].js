import { escapeEntities } from "jsx-async-runtime";

/**
 * @param {import("./types").RouteProps} props
 */
export default function RootGuard({ request, reply }) {
  // Set the request and reply objects as context
  this.request = request;
  this.reply = reply;
  this.escape = escapeEntities;
}
