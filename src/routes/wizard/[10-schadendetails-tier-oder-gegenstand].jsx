import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import Textarea from "./components/Textarea";
import Layout from "./Layout";

export default function SchadendetailsTierOderGegenstand({
  data,
  form,
  errors,
}) {
  return (
    <Layout title="Schadendetails für Tier oder Gegenstand" data={data}>
      <Form>
        <Legend>
          Sie haben angegeben, dass ein Gegenstand beschädigt wurde. Haben Sie
          hierzu noch weitere Details?
        </Legend>
        <Input
          name="bezeichnung"
          label="Beschreibung/Bezeichnung des Gegenstands bzw. Tieres?"
          value={form.bezeichnung}
          placeholder="z.B. Brille, Fahrrad, Hund "
        />
        <Textarea
          name="beschreibung"
          label="Was wurde an dem Gegenstand oder Tier genau beschädigt?"
          value={form.beschreibung}
          placeholder="z.B. der Poller wurde umgefahren"
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
