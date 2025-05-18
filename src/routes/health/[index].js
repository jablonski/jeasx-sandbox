globalThis.replyStatus = 200;

/**
 * @param {import("../types").RouteProps} props
 */
export default function Status({ request, reply }) {
  if (request.query["status"]) {
    globalThis.replyStatus = parseInt(request.query["status"]);
  }
  reply.header("Content-Type", "application/json");
  reply.status(globalThis.replyStatus);
  return { status: globalThis.replyStatus };
}
