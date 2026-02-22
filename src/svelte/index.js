import { hydrate } from "svelte";
import App from "./app.svelte";

hydrate(App, { target: document.querySelector("#app") });
