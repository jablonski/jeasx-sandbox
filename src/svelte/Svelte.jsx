import { render } from "svelte/server";

export default function Svelte({ component, ...props }) {
  return (
    <div data-component={component.name} data-props={props}>
      {render(component, { props })}
    </div>
  );
}
