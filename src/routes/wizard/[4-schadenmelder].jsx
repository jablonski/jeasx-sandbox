import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import RadioGroup from "./components/RadioGroup";
import Layout from "./Layout";

export default function Schadenmelder({ form, errors, data }) {
  return (
    <Layout title="Schadenmelder" data={data}>
      <Form>
        <Legend>Ihre persönlichen Daten</Legend>
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
          name="geburtsdatum"
          label="Geburtsdatum"
          value={form.geburtsdatum}
          type="date"
        />
        <Legend>Anschrift</Legend>
        <Input name="strasse" label="Straße" value={form.strasse} />
        <Input name="hausnummer" label="Nr." value={form.hausnummer} />
        <Input name="plz" label="Postleitzahl" value={form.plz} />
        <Input name="ort" label="Ort" value={form.ort} />
        <Legend>Kontaktdaten für Rückfragen und Benachrichtigungen</Legend>
        <Input name="email" label="E-Mail" value={form.email} type="email" />
        <Input name="telefon" label="Telefon" value={form.telefon} type="tel" />
        <Legend>Sonstige Daten</Legend>
        {data["/3-schadenmeldung"]?.["schadenmeldung"] === "Versicherter" && (
          <Input
            name="versicherungsschein"
            label="Nummer des Versicherungsscheins"
            value={form.versicherungsschein}
          />
        )}
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
