/**
 * @param {import("../types").RouteProps} props
 */
export default function Redirect({ reply }) {
  reply.redirect("/wizard/1-start");
}
