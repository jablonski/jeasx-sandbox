/**
 * @param {import("../types").RouteProps} props
 */
export default function ({ request, reply }) {
  reply.header("Content-Type", "application/json");
  reply.status(200);
  return { status: 200 };
}
