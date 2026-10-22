/* ═══════════════════════════════════════════════════════════════════════
   DERIVED GEOGRAPHY — every place-fact the copy needs that can be COMPUTED.

   A fact that can be calculated is never typed by hand: distance and
   direction from the Charlton shop, which towns genuinely border a town,
   how far it is from salt water, and the finished jobs nearest to it all
   fall out of the coordinates. They cannot contradict each other, cannot go
   stale, and cannot be invented by a copywriter who needs one more sentence.

   Deterministic: no Math.random, no Date — a page renders the same on every
   build.
   ═══════════════════════════════════════════════════════════════════════ */

import { ADDRESS } from './constants';
import { CITY_FACTS, type County } from './city-facts';
import { CITY_GEO as PROJECT_TOWNS } from './project-geo';

export type { County };

/** The shop at 13 Stoneybrook Rd, Charlton. */
const HQ: [number, number] = [ADDRESS.lat, ADDRESS.lng];

/* Points on the Massachusetts shoreline inside or just beyond the service
   area. Distance to the nearest one is what "salt air" means here. */
const COAST_ANCHORS: [number, number][] = [
  [42.34, -70.96], // Boston Harbor
  [42.28, -70.9], // Quincy Bay / Hull
  [42.25, -70.92], // Hingham / Weymouth Back River
  [42.44, -70.92], // Lynn Harbor / Nahant
  [42.53, -70.87], // Salem & Beverly harbours
];

const R_MILES = 3958.7613;

export function haversineMiles(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(b[0] - a[0]);
  const dLng = toRad(b[1] - a[1]);
  const s = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.sin(dLng / 2) ** 2;
  return 2 * R_MILES * Math.asin(Math.sqrt(s));
}

function bearingDeg(a: [number, number], b: [number, number]): number {
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLng = toRad(b[1] - a[1]);
  const y = Math.sin(dLng) * Math.cos(toRad(b[0]));
  const x = Math.cos(toRad(a[0])) * Math.sin(toRad(b[0])) - Math.sin(toRad(a[0])) * Math.cos(toRad(b[0])) * Math.cos(dLng);
  return ((Math.atan2(y, x) * 180) / Math.PI + 360) % 360;
}

const COMPASS = ['north', 'northeast', 'east', 'southeast', 'south', 'southwest', 'west', 'northwest'] as const;
export type Compass = (typeof COMPASS)[number];

function compass(a: [number, number], b: [number, number]): Compass {
  return COMPASS[Math.round(bearingDeg(a, b) / 45) % 8];
}

export function coordsOf(slug: string): [number, number] | null {
  return CITY_FACTS[slug]?.coords ?? null;
}

/** Straight-line miles from the Charlton shop, rounded. */
export function milesFromHQ(slug: string): number | null {
  const c = coordsOf(slug);
  return c ? Math.round(haversineMiles(HQ, c)) : null;
}

/** Which way the town lies from the shop, on an 8-point compass. */
export function directionFromHQ(slug: string): Compass | null {
  const c = coordsOf(slug);
  return c ? compass(HQ, c) : null;
}

export function milesFromCoast(slug: string): number | null {
  const c = coordsOf(slug);
  if (!c) return null;
  return Math.round(Math.min(...COAST_ANCHORS.map((a) => haversineMiles(a, c))));
}

export type Exposure = 'coastal' | 'near-coastal' | 'inland' | 'upland';

/* Upland = the higher, colder interior around and west of Worcester, where a
   longer freeze-thaw season and snow load are the real story. Classified by
   position, so a town is described by where it actually is. */
export function exposure(slug: string): Exposure | null {
  const c = coordsOf(slug);
  if (!c) return null;
  const coast = milesFromCoast(slug)!;
  if (coast <= 6) return 'coastal';
  if (coast <= 14) return 'near-coastal';
  const [lat, lng] = c;
  if (lng <= -71.75 && lat >= 42.2) return 'upland';
  return 'inland';
}

/** Towns we serve that are genuinely next door, nearest first. */
export function neighbours(slug: string, count = 5): string[] {
  const c = coordsOf(slug);
  if (!c) return [];
  return Object.keys(CITY_FACTS)
    .filter((s) => s !== slug)
    .map((s) => ({ s, d: haversineMiles(c, CITY_FACTS[s].coords) }))
    .sort((a, b) => a.d - b.d)
    .slice(0, count)
    .map((x) => x.s);
}

export function milesBetween(a: string, b: string): number | null {
  const ca = coordsOf(a);
  const cb = coordsOf(b);
  return ca && cb ? Math.round(haversineMiles(ca, cb)) : null;
}

/** Compass direction from town a to town b. */
export function directionBetween(a: string, b: string): Compass | null {
  const ca = coordsOf(a);
  const cb = coordsOf(b);
  return ca && cb ? compass(ca, cb) : null;
}

export function countyOf(slug: string): County | null {
  return CITY_FACTS[slug]?.county ?? null;
}

/** Plain-words description of the trip from the shop. */
export function driveDescription(slug: string): string | null {
  const mi = milesFromHQ(slug);
  const dir = directionFromHQ(slug);
  if (mi === null || dir === null) return null;
  if (mi <= 2) return 'home to our Charlton shop';
  if (mi <= 10) return `about ${mi} miles ${dir} of our Charlton shop`;
  if (mi <= 35) return `roughly ${mi} miles ${dir} of our Charlton shop`;
  return `about ${mi} miles ${dir} of our Charlton shop, a run our crews make regularly`;
}

/* ── Distance from a town to a finished job ──────────────────────────────
   Project towns are keyed "Town, ST" in project-geo.ts (town centres, never
   a customer's address). */
export function milesToProjectTown(slug: string, location: string): number | null {
  const c = coordsOf(slug);
  const p = PROJECT_TOWNS[location];
  return c && p ? Math.round(haversineMiles(c, p)) : null;
}

export function directionToProjectTown(slug: string, location: string): Compass | null {
  const c = coordsOf(slug);
  const p = PROJECT_TOWNS[location];
  return c && p ? compass(c, p) : null;
}

/** Miles from the shop to a finished job's town centre. */
export function milesHQToProjectTown(location: string): number | null {
  const p = PROJECT_TOWNS[location];
  return p ? Math.round(haversineMiles(HQ, p)) : null;
}

export interface CityGeo {
  slug: string;
  county: County;
  milesFromHQ: number;
  direction: Compass;
  milesFromCoast: number;
  exposure: Exposure;
  neighbours: string[];
  drive: string;
}

export function cityGeo(slug: string): CityGeo | null {
  const f = CITY_FACTS[slug];
  if (!f) return null;
  return {
    slug,
    county: f.county,
    milesFromHQ: milesFromHQ(slug)!,
    direction: directionFromHQ(slug)!,
    milesFromCoast: milesFromCoast(slug)!,
    exposure: exposure(slug)!,
    neighbours: neighbours(slug),
    drive: driveDescription(slug)!,
  };
}
