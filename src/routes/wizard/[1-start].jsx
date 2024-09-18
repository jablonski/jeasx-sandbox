import Form from "./components/Form";
import Input from "./components/Input";
import Paragraph from "./components/Paragraph";
import Submit from "./components/Submit";
import Layout from "./Layout";

export default function Start() {
  return (
    <Layout title="Start">
      <Form>
        <Paragraph>
          Im Folgenden stellen wir Ihnen einige Fragen, damit wir den
          entstandenen Schaden zuordnen und bearbeiten können.
        </Paragraph>
        <Paragraph>
          Sie können Ihre Schadenmeldung jederzeit Zwischenspeichern und unter
          Angabe des Codes innerhalb von 10 Tagen wieder aufrufen.
        </Paragraph>
        <Input
          label="Falls Sie eine schon begonnene Schadenmeldung weiterführen wollen:"
          name="$hash"
          placeholder="PHV-XVYZ9SH"
        />
        <Submit label="Schadenmeldung starten" />
      </Form>
    </Layout>
  );
}
