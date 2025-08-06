import cap from "../cap.js";

/**
 * @param {import("../../types").RouteProps} props
 */
export default async function ({ request, reply }) {
  reply.type("application/json");
  reply.send(await cap.createChallenge());
}
