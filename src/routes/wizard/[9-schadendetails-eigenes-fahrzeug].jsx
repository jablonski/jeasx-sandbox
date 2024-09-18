import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Legend from "./components/Legend";
import RadioGroup from "./components/RadioGroup";
import Textarea from "./components/Textarea";
import Layout from "./Layout";

export default function SchadendetailsEigenesFahrzeug({ data, form, errors }) {
  return (
    <Layout title="Schadendetails für eigenes Fahrzeug" data={data}>
      <Form>
        <Legend>
          Sie haben angegeben, dass Ihr eigenes Fahrzeug beschädigt wurde. Haben
          Sie hierzu noch weitere Details?
        </Legend>
        <Textarea
          name="beschreibung"
          label="Wo wurde das Fahrzeug beschädigt?"
          value={form.beschreibung}
          placeholder="z.B. Stoßstange oder Beifahrertür"
        />
        <RadioGroup
          label="Haben Sie das Fahrzeug geliehen, gemietet oder gepachtet?"
          options={["Ja", "Nein"]}
          name="leihe_miete_pacht"
          value={form.leihe_miete_pacht}
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
