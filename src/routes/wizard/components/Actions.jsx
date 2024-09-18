import Submit from "./Submit";

export default function Actions() {
  return (
    <section role="group">
      <Submit label="Zurück" value="Zurück" />
      &nbsp;
      <Submit label="Speichern" value="Speichern" class="secondary" />
      &nbsp;
      <Submit label="Weiter" value="Weiter" />
    </section>
  );
}
