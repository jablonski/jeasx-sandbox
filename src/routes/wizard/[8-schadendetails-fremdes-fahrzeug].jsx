import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import Textarea from "./components/Textarea";
import Layout from "./Layout";

export default function SchadendetailsFremdesFahrzeug({ data, form, errors }) {
  return (
    <Layout title="Schadendetails für fremdes Fahrzeug" data={data}>
      <Form>
        <Legend>
          Sie haben angegeben, dass ein fremdes Fahrzeug beschädigt wurde. Haben
          Sie hierzu noch weitere Details?
        </Legend>
        <Input
          name="kennzeichen"
          label="Amtliches Kennzeichen"
          value={form.kennzeichen}
          placeholder="XYZ-XV 123"
        />
        <Textarea
          name="beschreibung"
          label="Wo wurde das Fahrzeug beschädigt?"
          value={form.beschreibung}
          placeholder="z.B. Stoßstange oder Beifahrertür"
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
