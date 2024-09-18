/**
 * @param {import("../types").RouteProps} props
 */
export default function Status({ request, reply }) {
  const { url, query, method, headers, body } = request;
  reply.header("Content-Type", "application/json");
  return {
    node: `${process.version} (${process.arch})`,
    url,
    query,
    method,
    headers,
    body,
  };
}
