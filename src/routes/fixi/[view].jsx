import fields from "./fields";

/**
 * @param {import("../types").RouteProps} props
 */
export default function View({ request }) {
  const body = request.body || {};

  return (
    <form fx-action="./edit" fx-method="post" method="post">
      <fieldset>
        <input type="hidden" name="action" value="edit" />
        {fields.map(({ label, name }) => (
          <div>
            {label}: <b>{this.escape(body[name])}</b>
            <input type="hidden" name={name} value={this.escape(body[name])} />
          </div>
        ))}
      </fieldset>
      <input type="submit" value="Edit" />
    </form>
  );
}
