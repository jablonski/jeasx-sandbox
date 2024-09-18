import Actions from "./components/Actions";
import Form from "./components/Form";
import Headline from "./components/Headline";
import Paragraph from "./components/Paragraph";
import Layout from "./Layout";

export default function Rechtsbelehrung({ data }) {
  return (
    <Layout title="Rechtsbelehrung" data={data}>
      <Form>
        <Headline>Rechtliche Belehrung</Headline>
        <Paragraph>
          Mir ist bekannt, dass falsche, unvollständige oder verspätete Angaben,
          Belege und Unterlagen zum Fortfall des Versicherungsschutzes führen
          können, soweit diese für die Feststellung des Versicherungsfalles oder
          der Leistungspflicht des Versicherers dem Grunde oder der Höhe nach
          von Belang sind.
        </Paragraph>
        <Paragraph>
          Bei vorsätzlich falschen, unvollständigen oder verspäteten Angaben,
          Belegen und Unterlagen kann die Leistungspflicht vollständig
          entfallen. Beruhen diese lediglich auf grober Fahrlässigkeit, kann der
          Versicherer berechtigt sein, seine Leistung in einem der Schwere
          dieses Verschuldens entsprechenden Verhältnis, ggf. bis zum
          vollständigen Verlust des Anspruches, zu kürzen.
        </Paragraph>
        <Actions />
      </Form>
    </Layout>
  );
}
