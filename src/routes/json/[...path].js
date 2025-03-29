/**
 * @param {import("../types").RouteProps} props
 */
export default function Status({ request, reply }) {
  const { url, path, route, query, method, headers, body } = request;
  reply.header("Content-Type", "application/json");
  return {
    url,
    path,
    route,
    query,
    method,
    headers,
    body,
    runtime: process.versions,
  };
}
