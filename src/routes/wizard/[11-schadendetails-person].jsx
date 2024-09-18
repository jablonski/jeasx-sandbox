import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import RadioGroup from "./components/RadioGroup";
import Textarea from "./components/Textarea";
import Layout from "./Layout";

export default function SchadendetailsPerson({ data, form, errors }) {
  return (
    <Layout title="Schadendetails für Person" data={data}>
      <Form>
        <Legend>
          Sie haben angegeben, dass eine Person beschädigt wurde. Haben Sie
          hierzu noch weitere Details?
        </Legend>
        <RadioGroup
          label="Ist die Person, die Geschädigt wurde, die Person, die Sie schon angegeben haben?"
          options={["Ja", "Nein"]}
          name="weitere_person"
          value={form.weitere_person}
        />
        <RadioGroup
          name="anrede"
          label="Anrede"
          options={["Frau", "Herr"]}
          value={form.anrede}
        />
        <Input name="vorname" label="Vorname" value={form.vorname} />
        <Input name="nachname" label="Nachname" value={form.nachname} />
        <Textarea
          name="beschreibung"
          label="Können Sie Angaben zur Verletzung der Person machen?"
          value={form.beschreibung}
          placeholder="z.B. Armbruch / Beinbruch"
        />
        <RadioGroup
          label="Wurden noch weitere Personen geschädigt?"
          options={["Ja", "Nein"]}
          name="noch_weitere_person"
          value={form.noch_weitere_person}
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
