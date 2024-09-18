import { SLUGS } from "../domain/constants";
import Progress from "./Progress";

const groups = [
  { label: "Start", links: [SLUGS.SCHADENTYPEN] },
  {
    label: "Schadenmeldung",
    links: [
      SLUGS.SCHADENMELDUNG,
      SLUGS.SCHADENMELDER,
      SLUGS.SCHADENNEHMER,
      SLUGS.SCHADENVERURSACHER,
    ],
  },
  {
    label: "Schadendetails",
    links: [
      SLUGS.SCHADENDETAILS,
      SLUGS.SCHADENDETAILS_FREMDES_FAHRZEUG,
      SLUGS.SCHADENDETAILS_EIGENES_FAHRZEUG,
      SLUGS.SCHADENDETAILS_TIER_ODER_GEGENSTAND,
      SLUGS.SCHADENDETAILS_PERSON,
    ],
  },
  { label: "Rechtliche Belehrung", links: [SLUGS.RECHTSBELEHRUNG] },
  { label: "Vielen Dank", links: [SLUGS.DANKE] },
];

export default function Header({ path, data }) {
  const currentStep = groups.findIndex(({ links }) => links?.includes(path));

  return (
    <header>
      <h1>Ihre Schadenmeldung zur KFZ-Versicherung</h1>
      <nav aria-label="breadcrumb">
        <ul>
          {groups.slice(0, currentStep + 1).map(({ label, links }) => (
            <li>
              <a href={links[0]}>{label}</a>
            </li>
          ))}
        </ul>
      </nav>
      <Progress url={path} data={data} />
    </header>
  );
}
