import jokes from "../jokes.js";

/**
 * @this {import("../../types.js").ThisContext}
 * @param {import("../../types.js").RouteProps} props
 */
export default function Jokes({ request, reply }) {
  const category = this.path.slice(this.path.lastIndexOf("/") + 1);
  const amount = request.query["amount"] || 1;

  reply.header("content-type", "application/json");
  return jokes(category, amount);
}
