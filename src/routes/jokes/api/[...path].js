import jokes from "../jokes.js";

/**
 * @param {import("../../types.js").RouteProps} props
 */
export default function Jokes({ request, reply }) {
  const path = request.urlData().path;
  const category = path.slice(path.lastIndexOf("/") + 1);
  const amount = request.query["amount"] || 1;

  reply.header("content-type", "application/json");
  return jokes(category, amount);
}
