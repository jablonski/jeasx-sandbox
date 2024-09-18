import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import RadioGroup from "./components/RadioGroup";
import Layout from "./Layout";

export default function Schadennehmer({ data, form, errors }) {
  return (
    <Layout title="Schadennehmer" data={data}>
      <Form>
        <Legend>Wer wurde durch Sie geschädigt?</Legend>
        <RadioGroup
          name="anrede"
          label="Anrede"
          options={["Frau", "Herr", "Firma"]}
          value={form.anrede}
          submitOnChange
        />
        {["Firma", undefined].includes(form.anrede) && (
          <Input name="firma" label="Firma" value={form.firma} />
        )}
        <Input name="vorname" label="Vorname" value={form.vorname} />
        <Input name="nachname" label="Nachname" value={form.nachname} />
        <Input
          name="kennzeichen"
          label="Amtliches Kennzeichen"
          value={form.kennzeichen}
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
