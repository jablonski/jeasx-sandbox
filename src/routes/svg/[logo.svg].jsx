/**
 * @param {import("../types").RouteProps} props
 */
export default function Logo({ request, reply }) {
  const text = request.query["text"] || "";
  reply.header("Content-Type", "image/svg+xml; charset=utf-8");
  return (
    <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
      {["red", "orange", "yellow", "green", "blue", "black"].map(
        (color, index) => (
          <text
            x={index}
            y={40 + (index % 2)}
            style={`font: italic 40px serif; fill: ${color};`}
          >
            {this.escape(text)}
          </text>
        )
      )}
    </svg>
  );
}
