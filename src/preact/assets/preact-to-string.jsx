import { render } from "preact-render-to-string";
import Components from "./components/$index";

/**
 * @param {string} component
 * @param {object} props
 */
export default function preactToString(component, props = {}) {
  const Component = Components[component];
  return render(
    <div data-component={component} data-props={JSON.stringify(props)}>
      <Component {...props} />
    </div>,
  );
}
