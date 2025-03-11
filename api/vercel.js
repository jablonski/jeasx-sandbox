import env from "../env.js";
import serverless from "../serverless.js";

env();

await serverless.ready();

export default async (req, res) => {
  serverless.server.emit("request", req, res);
};
