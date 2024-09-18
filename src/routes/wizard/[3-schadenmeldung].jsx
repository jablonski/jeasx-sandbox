import Actions from "./components/Actions";
import Error from "./components/Error";
import Form from "./components/Form";
import Input from "./components/Input";
import Legend from "./components/Legend";
import Layout from "./Layout";

export default function Schadenmeldung({ data, form, errors }) {
  return (
    <Layout title="Schadenmeldung" data={data}>
      <Form>
        <Legend>Ich melde den Schaden als:</Legend>
        <Input
          name="schadenmeldung"
          value="Versicherter"
          type="radio"
          checked={form.schadenmeldung === "Versicherter"}
          label="Ich bin Versicherter und habe jemand anderes geschädigt"
        />
        <Input
          name="schadenmeldung"
          value="Unfallbeteiligter"
          type="radio"
          checked={form.schadenmeldung === "Unfallbeteiligter"}
          label="Unfallbeteiligter, der von einer Person geschädigt werde, welche versichert ist"
        />
        <Actions />
        <Error message={errors} />
      </Form>
    </Layout>
  );
}
