import { escapeEntities } from "jsx-async-runtime";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Prepare "this" context
  this.request = request;
  this.reply = reply;
  this.escape = escapeEntities;
}
