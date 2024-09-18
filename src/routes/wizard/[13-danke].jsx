import Form from "./components/Form";
import Headline from "./components/Headline";
import Paragraph from "./components/Paragraph";
import Submit from "./components/Submit";
import Layout from "./Layout";

/**
 * @param {import("../types").RouteProps} props
 */
export default function Danke({ reply }) {
  reply.clearCookie("data");

  return (
    <Layout title="Danke">
      <Form>
        <Headline>Vielen Dank</Headline>
        <Paragraph>
          Sie haben Ihren Schaden zur Privathaftplfichtversicherung erfolgreich
          gemeldet.
        </Paragraph>
        <Paragraph>
          Momentan beträgt die durchschnittliche Bearbeitungsdauer circa. 10
          Werktage.
        </Paragraph>
        <Paragraph>
          Falls Sie Rückfragen haben sollten, können Sie sich per Chat oder
          telefonisch unter Angabe des Kennzeichens „XYZ 3450“ melden.
        </Paragraph>
        <Submit label="Schadenmeldung neu starten" />
      </Form>
    </Layout>
  );
}
