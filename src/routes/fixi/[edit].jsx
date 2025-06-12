import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Form({ request }) {
  const body = request.body || {};

  return (
    <form fx-action="./view" fx-method="post" method="post">
      <input type="hidden" name="action" value="view" />
      {fields.map(({ label, name, type, value }) => (
        <label>
          {label}:
          <input
            // @ts-ignore
            type={type}
            name={name}
            value={this.escape(body[name] ?? value)}
          />
        </label>
      ))}
      <input type="submit" value="Submit" />
    </form>
  );
}
