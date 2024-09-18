import { createHash } from "node:crypto";
import Layout from "./Layout";
import Form from "./components/Form";
import Headline from "./components/Headline";
import Input from "./components/Input";
import Submit from "./components/Submit";
import { compress } from "./utils/zip";

/**
 * @param {import("../types").RouteProps & any} props
 */
export default function Speichern({ reply, data }) {
  const token =
    "PHV-" +
    createHash("sha1")
      .update(JSON.stringify(data))
      .digest("hex")
      .slice(0, 8)
      .toUpperCase();
  reply.setCookie(token, compress(data), {
    path: "/",
    httpOnly: true,
    sameSite: "strict",
  });
  reply.clearCookie("data");

  return (
    <Layout title="Speichern">
      <Form>
        <Headline>Ihre Angaben wurden gespeichert</Headline>
        <Input
          label="Um ihre Angaben neu zu laden, benutzen Sie bitte den folgenden Schlüssel:"
          readonly
          disabled
          value={token}
        />
        <Submit label="Schadenmeldung neu starten" />
      </Form>
    </Layout>
  );
}
