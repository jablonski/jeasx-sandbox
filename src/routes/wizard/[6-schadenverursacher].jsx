import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import RadioGroup from "./components/RadioGroup";
import Layout from "./Layout";

export default function Schadenverursacher({ data, form, errors }) {
  return (
    <Layout title="Schadenverursacher" data={data}>
      <Form>
        <Legend>Angaben zum Versicherten (Schadenverursacher)</Legend>
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
        <Legend>Anschrift</Legend>
        <Input name="strasse" label="Straße" value={form.strasse} />
        <Input name="hausnummer" label="Nr." value={form.hausnummer} />
        <Input name="plz" label="Postleitzahl" value={form.plz} />
        <Input name="ort" label="Ort" value={form.ort} />
        <Input
          name="kennzeichen"
          label="Ggf. Amtliches Kennzeichen"
          value={form.kennzeichen}
        />
        <Legend>Kontaktdaten für Rückfragen und Benachrichtigungen</Legend>
        <Input name="telefon" label="Telefon" value={form.telefon} type="tel" />
        <Input
          name="versicherungsschein"
          label="Ggf. Nummer des Versicherungsscheins"
          value={form.versicherungsschein}
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
