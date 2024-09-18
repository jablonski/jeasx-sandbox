import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import Layout from "./Layout";

export default function Schadentypen({ data, form, errors }) {
  return (
    <Layout title="Schadentypen" data={data}>
      <Form>
        <Legend>
          Bitte wählen Sie aus den folgenden Optionen aus (Mehrfach-Nennung
          möglich):
        </Legend>
        {[
          "Ich hatte einen Verkehrsunfall mit einer weiteren Person, welche mir bekannt ist",
          "Ich hatte einen Verkehrsunfall mit einem oder durch ein Tier",
          "Mein Fahrzeug ist zu Schaden gekommen",
          "Das Fahrzeug der anderen Person ist beschädigt",
          "Ich habe einen Gegenstand oder ein Tier beschädigt",
          "Die Person, die mein Auto beschädigt hat, ist mir unbekannt (konnte nicht ermittelt werden)",
          "Bei dem Unfall sind Personen verletzt worden (auch Sie selber)",
        ].map((schadentyp, index) => (
          <Input
            type="checkbox"
            name="schadentypen[]"
            value={`${index + 1}`}
            checked={form["schadentypen[]"]?.includes(String(index + 1))}
            label={schadentyp}
          />
        ))}
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
