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
  { name: "United Arab Emirates", isoA3: "ARE", isoNumeric: "784", kind: "explored" },
  { name: "Qatar", isoA3: "QAT", isoNumeric: "634", kind: "explored" },
  { name: "Norway", isoA3: "NOR", isoNumeric: "578", kind: "explored" },
  { name: "Sweden", isoA3: "SWE", isoNumeric: "752", kind: "explored" },
  { name: "Finland", isoA3: "FIN", isoNumeric: "246", kind: "explored" },
  { name: "Estonia", isoA3: "EST", isoNumeric: "233", kind: "explored" },

  // Layover only
  { name: "Vietnam", isoA3: "VNM", isoNumeric: "704", kind: "layover" },
];

export type VisitedCity = {
  name: string;
  country: string;
  lat: number;
  lng: number;
};

/** City dots on the travel map. Coordinates are WGS84. */
export const visitedCities: VisitedCity[] = [
  { name: "Oslo", country: "Norway", lat: 59.9139, lng: 10.7522 },
  { name: "Bergen", country: "Norway", lat: 60.3913, lng: 5.3221 },
  { name: "Narvik", country: "Norway", lat: 68.4384, lng: 17.4272 },
  { name: "Tromsø", country: "Norway", lat: 69.6492, lng: 18.9553 },

  { name: "Stockholm", country: "Sweden", lat: 59.3293, lng: 18.0686 },
  { name: "Kiruna", country: "Sweden", lat: 67.8558, lng: 20.2253 },

  { name: "Helsinki", country: "Finland", lat: 60.1699, lng: 24.9384 },
  { name: "Rovaniemi", country: "Finland", lat: 66.5039, lng: 25.7294 },

  { name: "Tallinn", country: "Estonia", lat: 59.437, lng: 24.7536 },

  { name: "Doha", country: "Qatar", lat: 25.2854, lng: 51.531 },

  { name: "Abu Dhabi", country: "United Arab Emirates", lat: 24.4539, lng: 54.3773 },

  { name: "Mumbai", country: "India", lat: 19.076, lng: 72.8777 },
  { name: "Navi Mumbai", country: "India", lat: 19.033, lng: 73.0297 },
  { name: "Nashik", country: "India", lat: 19.9975, lng: 73.7898 },
  { name: "Pune", country: "India", lat: 18.5204, lng: 73.8567 },
  { name: "Chhatrapati Sambhajinagar", country: "India", lat: 19.8762, lng: 75.3433 },
  { name: "Surat", country: "India", lat: 21.1702, lng: 72.8311 },
  { name: "Vadodara", country: "India", lat: 22.3072, lng: 73.1812 },
  { name: "Ahmedabad", country: "India", lat: 23.0225, lng: 72.5714 },
  { name: "Gandhinagar", country: "India", lat: 23.2156, lng: 72.6369 },
  { name: "Dholera", country: "India", lat: 22.247, lng: 72.193 },
  { name: "Sasan Gir", country: "India", lat: 21.137, lng: 70.795 },
  { name: "Delhi", country: "India", lat: 28.6139, lng: 77.209 },
  { name: "Agra", country: "India", lat: 27.1767, lng: 78.0081 },
  { name: "Satara", country: "India", lat: 17.6805, lng: 74.0183 },
  { name: "Kolhapur", country: "India", lat: 16.705, lng: 74.2433 },
  { name: "Goa", country: "India", lat: 15.4909, lng: 73.8278 },
  { name: "Kochi", country: "India", lat: 9.9312, lng: 76.2673 },

  { name: "Bangkok", country: "Thailand", lat: 13.7563, lng: 100.5018 },
  { name: "Hat Yai", country: "Thailand", lat: 7.0084, lng: 100.4767 },

  { name: "Kuala Lumpur", country: "Malaysia", lat: 3.139, lng: 101.6869 },
  { name: "Singapore", country: "Singapore", lat: 1.3521, lng: 103.8198 },

  { name: "Phnom Penh", country: "Cambodia", lat: 11.5564, lng: 104.9282 },

  { name: "Ho Chi Minh City", country: "Vietnam", lat: 10.8231, lng: 106.6297 },

  { name: "Hong Kong", country: "Hong Kong", lat: 22.3193, lng: 114.1694 },

  { name: "Jakarta", country: "Indonesia", lat: -6.2088, lng: 106.8456 },

  { name: "Cairns", country: "Australia", lat: -16.9186, lng: 145.7781 },
  { name: "Brisbane", country: "Australia", lat: -27.4698, lng: 153.0251 },
  { name: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { name: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
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
export const visitedCityCount = visitedCities.length;
