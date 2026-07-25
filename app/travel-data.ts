/**
 * Countries Rudra has been to, by depth of visit.
 * ISO 3166-1 numeric ids match world-atlas / Natural Earth country features.
 */
export type VisitKind = "lived" | "explored" | "layover";

export type VisitedCountry = {
  name: string;
  /** ISO 3166-1 alpha-3 */
  isoA3: string;
  /** ISO 3166-1 numeric, zero-padded to 3 digits for world-atlas ids */
  isoNumeric: string;
  kind: VisitKind;
};

export const visitedCountries: VisitedCountry[] = [
  // Lived in
  { name: "Australia", isoA3: "AUS", isoNumeric: "036", kind: "lived" },

  // Explored
  { name: "New Zealand", isoA3: "NZL", isoNumeric: "554", kind: "explored" },
  { name: "Indonesia", isoA3: "IDN", isoNumeric: "360", kind: "explored" },
  { name: "Malaysia", isoA3: "MYS", isoNumeric: "458", kind: "explored" },
  { name: "Singapore", isoA3: "SGP", isoNumeric: "702", kind: "explored" },
  { name: "Thailand", isoA3: "THA", isoNumeric: "764", kind: "explored" },
  { name: "Cambodia", isoA3: "KHM", isoNumeric: "116", kind: "explored" },
  { name: "Hong Kong", isoA3: "HKG", isoNumeric: "344", kind: "explored" },
  { name: "India", isoA3: "IND", isoNumeric: "356", kind: "explored" },
  { name: "Pakistan", isoA3: "PAK", isoNumeric: "586", kind: "explored" },
  { name: "United Arab Emirates", isoA3: "ARE", isoNumeric: "784", kind: "explored" },
  { name: "Qatar", isoA3: "QAT", isoNumeric: "634", kind: "explored" },
  { name: "Norway", isoA3: "NOR", isoNumeric: "578", kind: "explored" },
  { name: "Sweden", isoA3: "SWE", isoNumeric: "752", kind: "explored" },
  { name: "Finland", isoA3: "FIN", isoNumeric: "246", kind: "explored" },
  { name: "Estonia", isoA3: "EST", isoNumeric: "233", kind: "explored" },

  // Layover only
  { name: "Vietnam", isoA3: "VNM", isoNumeric: "704", kind: "layover" },
];

export const visitKindLabel: Record<VisitKind, string> = {
  lived: "Lived in",
  explored: "Explored",
  layover: "Layover only",
};

export function visitKindForNumericId(id: string): VisitKind | null {
  const normalized = id.padStart(3, "0");
  const match = visitedCountries.find((c) => c.isoNumeric === normalized);
  return match?.kind ?? null;
}

export const visitedCountryCount = visitedCountries.length;
