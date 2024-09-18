import { SLUGS } from "./constants";

/**
 * Generates a flow of steps based on the given data.
 *
 * @param {{ [x: string]: { [x: string]: string | string[]; }; }} data
 * @returns {string[]}
 */
export default function flow(data) {
  const steps = [];

  steps.push(SLUGS.START);
  steps.push(SLUGS.SCHADENTYPEN);
  steps.push(SLUGS.SCHADENMELDUNG);
  steps.push(SLUGS.SCHADENMELDER);

  if (data?.[SLUGS.SCHADENMELDUNG]?.["schadenmeldung"] === "Versicherter") {
    steps.push(SLUGS.SCHADENNEHMER);
  } else {
    steps.push(SLUGS.SCHADENVERURSACHER);
  }

  steps.push(SLUGS.SCHADENDETAILS);

  if (
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("1") ||
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("4")
  ) {
    steps.push(SLUGS.SCHADENDETAILS_FREMDES_FAHRZEUG);
  }

  if (
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("3") ||
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("6")
  ) {
    steps.push(SLUGS.SCHADENDETAILS_EIGENES_FAHRZEUG);
  }

  if (
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("2") ||
    data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("5")
  ) {
    steps.push(SLUGS.SCHADENDETAILS_TIER_ODER_GEGENSTAND);
  }

  if (data?.[SLUGS.SCHADENTYPEN]?.["schadentypen[]"]?.includes("7")) {
    steps.push(SLUGS.SCHADENDETAILS_PERSON);
  }

  steps.push(SLUGS.RECHTSBELEHRUNG);
  steps.push(SLUGS.DANKE);
  steps.push(SLUGS.START);

  return steps;
}
