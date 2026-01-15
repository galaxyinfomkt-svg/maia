export interface City {
  name: string;
  slug: string;
  county: string;
  state: string;
  zip: string;
  distance: number;
  population?: number;
  description?: string;
  isHeadquarters?: boolean;
}
