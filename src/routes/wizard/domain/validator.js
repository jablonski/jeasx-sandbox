import { SLUGS } from "./constants";

/**
 * @param {string} path
 * @param {{ [x: string]: string; }} form
 */
export default function validator(path, form) {
  const errors = {};

  switch (path) {
    case SLUGS.SCHADENTYPEN:
      if (!form?.["schadentypen[]"]) {
        errors["schadentypen[]"] =
          "Bitte wählen Sie mindestens einen Schadentyp aus.";
      }
      break;

    case SLUGS.SCHADENMELDUNG:
      if (!form?.["schadenmeldung"]) {
        errors["schadenmeldung"] = "Bitte wählen Sie eine Variante aus.";
      }
      break;
  }

  if (
    form?.["telefon"] &&
    !/^(\(?([\d \-\)\–\+\(]+\/?){6,}\)?([ .\-–\/]?)([\d]+))$/im.test(
      form?.["telefon"]
    )
  ) {
    errors["telefon"] = "Bitte geben Sie eine gültige Telefonnummer ein.";
  }

  if (form?.["plz"] && !/^\d\d\d\d\d$/im.test(form?.["plz"])) {
    errors["plz"] = "Bitte geben Sie eine gültige Postleitzahl ein.";
  }

  return errors;
}
