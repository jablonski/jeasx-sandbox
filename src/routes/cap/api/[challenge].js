import cap from "../cap.js";

/**
 * @param {import("../../types").RouteProps} props
 */
export default function ({ request, reply }) {
  reply.type("application/json");
  reply.send(cap.createChallenge());
}
