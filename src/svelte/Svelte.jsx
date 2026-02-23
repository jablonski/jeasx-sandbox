import { render } from "svelte/server";

import COMPONENTS from "./components/$index";

export default function Svelte({ component, ...props }) {
  return (
    <div data-component={component} data-props={props}>
      {render(COMPONENTS[component], { props })}
    </div>
  );
}
