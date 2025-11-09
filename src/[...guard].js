import { promisify } from "node:util";
import { gzip } from "node:zlib";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Prepare "this" context
  this.request = request;
  this.reply = reply;

  this.responseHandler = (payload) => {
    if (
      typeof payload === "string" &&
      request.headers["accept-encoding"]?.includes("gzip")
    ) {
      reply.header("content-encoding", "gzip");
      return promisify(gzip)(payload);
    } else {
      return payload;
    }
  };
}
