export interface City {
  name: string;
  slug: string;
  county: string;
  state: string;
  zip: string;
  /** Broad area name used in navigation, e.g. "Metro West". */
  region?: string;
  /** Straight-line miles from the Charlton shop (generated, see geo.ts). */
  distance: number;
  population?: number;
  description?: string;
  isHeadquarters?: boolean;
}
