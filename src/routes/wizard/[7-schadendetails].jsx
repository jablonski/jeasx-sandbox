import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import Textarea from "./components/Textarea";
import Layout from "./Layout";

export default function Schadendetails({ data, form, errors }) {
  return (
    <Layout title="Schadendetails" data={data}>
      <Form>
        <Legend>
          Wann ist der Schaden passiert bzw. ab wann hatten Sie Kenntnis von dem
          Schaden
        </Legend>
        <Input name="datum" type="date" label="Datum" value={form.datum} />
        <Input
          name="uhrzeit"
          type="time"
          label="Uhrzeit"
          value={form.uhrzeit}
        />
        <Legend>An welcher Adresse ist der Schaden passiert?</Legend>
        <Input name="strasse" label="Straße" value={form.strasse} />
        <Input name="hausnummer" label="Nr." value={form.hausnummer} />
        <Input name="plz" label="Postleitzahl" value={form.plz} />
        <Input name="ort" label="Ort" value={form.ort} />
        <Legend>
          Bitte beschreiben Sie in kurzen Worten, was passiert ist.
        </Legend>
        <Textarea
          name="beschreibung"
          value={form.beschreibung}
          placeholder="z.B. Landstraße zwischen Ortschaft A und Ortschaft B"
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
