import { gzip } from "node:zlib";

/**
 * @param {import("./types").RouteProps} props
 */
export default function ({ request, reply }) {
  // Prepare "this" context
  this.request = request;
  this.reply = reply;

  this.responseHandler = async (payload) => {
    if (
      typeof payload === "string" &&
      request.headers["accept-encoding"]?.includes("gzip")
    ) {
      reply.header("content-encoding", "gzip");
      return new Promise((resolve, reject) => {
        gzip(payload, {}, (error, result) => {
          error ? reject(error) : resolve(result);
        });
      });
    } else {
      return payload;
    }
  };
}
