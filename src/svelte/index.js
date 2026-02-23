import { hydrate } from "svelte";
import Animate from "./animate.svelte";
import Counter from "./counter.svelte";
import Crud from "./crud.svelte";

const COMPONENTS = { Counter, Crud, Animate };

document.querySelectorAll("[data-component]").forEach((target) => {
  if (target instanceof HTMLElement) {
    const component = COMPONENTS[target.dataset.component];
    const props = target.dataset.props ? JSON.parse(target.dataset.props) : {};
    if (component) {
      hydrate(component, { target, props });
    }
  }
});
