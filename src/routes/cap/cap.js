import Cap from "@cap.js/server";

if (!globalThis.cap) {
  globalThis.cap = new Cap({
    tokens_store_path: ".tokens.json",
  });
}

export default globalThis.cap;
