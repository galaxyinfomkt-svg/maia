/* ═══════════════════════════════════════════════════════════════════════
   LOCAL CONTENT — what makes a city page about THAT city.

   What went wrong before: the old engine picked sentences from pools with a
   hash of the city name. Measured across the live site, only 2–7% of a city
   page's text was its own; the rest was the same sentences reshuffled — the
   pattern Google's spam policy calls scaled content ("automated
   transformations like synonymizing"). It also said every town was a few
   miles from Charlton, because the distances were measured from somewhere
   else (Framingham said 5 miles; it is 30).

   What this file does instead: every local sentence is built from a fact
   that is computed from coordinates (geo.ts) or taken from our own records
   (projects.ts). Distance and direction from the shop, distance to salt
   water, which towns border this one and how far each is, where the town
   ranks among the 109 we serve, and which of our finished jobs are nearest.
   Those facts differ for every town, so the text differs for every town —
   with no thesaurus and no random picks anywhere.

   Two rules:
   1. Nothing is invented. If it cannot be computed or verified, it is not
      written. (Neighbourhood names appear only for the towns where someone
      wrote real ones down.)
   2. Shared facts stay shared. Warranty, licence, prices and process are the
      same on every page because they are the same in real life.
   ═══════════════════════════════════════════════════════════════════════ */

import type { City, Service, ExposureBand } from '@/types';
import { cities, getCityBySlug } from './cities';
import {
  cityGeo,
  milesBetween,
  milesToProjectTown,
  directionToProjectTown,
  milesFromHQ,
  milesFromCoast,
  directionBetween,
  countyOf,
  milesHQToProjectTown,
  type CityGeo,
} from './geo';
import { projects, type Project } from './projects';
import { TOWN_DATA, type TownData } from './town-data';
import { PHONE, HIC_NUMBER } from './constants';

/* ── Shared descriptions, written once, true of every town in the group ── */

const BAND_LABEL: Record<ExposureBand, string> = {
  coastal: 'close enough to the ocean for salt air',
  'near-coastal': 'within reach of salt on an onshore wind',
  inland: 'inland, where freeze-thaw does the damage',
  upland: 'on the colder, snowier ground around and west of Worcester',
};

const BAND_HOOK: Record<ExposureBand, string> = {
  coastal: 'detailed for salt air',
  'near-coastal': 'built for salt air and hard freezes',
  inland: 'built for freeze-thaw winters',
  upland: 'built for a long, snowy winter',
};

/* Real neighbourhood names, kept only where someone wrote them down. */
const NEIGHBOURHOODS: Record<string, string[]> = {
  marlborough: ['East Marlborough', 'West Marlborough', 'Downtown', 'Millham', 'Ward Park'],
  framingham: ['Nobscot', 'Saxonville', 'Downtown Framingham', 'Framingham Centre', 'Cochituate'],
  natick: ['Natick Center', 'South Natick', 'East Natick', 'West Natick', 'Walnut Hill'],
  worcester: ['Main South', 'Burncoat', 'Greendale', 'Tatnuck Square', 'Indian Lake', 'College Hill'],
  hudson: ['Downtown Hudson', 'Lake Boon', 'Gates Pond', 'Fort Meadow'],
  newton: ['Newton Centre', 'Newton Corner', 'Chestnut Hill', 'Auburndale', 'Waban', 'West Newton'],
  lexington: ['Lexington Center', 'East Lexington', 'Meriam Hill', 'Moon Hill', 'Five Fields'],
  wellesley: ['Wellesley Hills', 'Wellesley Farms', 'Wellesley Square', 'Babson Park'],
  sudbury: ['Sudbury Center', 'South Sudbury', 'North Sudbury'],
  hopkinton: ['Hopkinton Center', 'Woodville', 'Lake Maspenock'],
};

/* ── Rankings among the 109 towns, computed once ── */
const BY_SHOP = [...cities].sort((a, b) => a.distance - b.distance).map((c) => c.slug);
const BY_COAST = [...cities]
  .sort((a, b) => (milesFromCoast(a.slug) ?? 999) - (milesFromCoast(b.slug) ?? 999))
  .map((c) => c.slug);

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd'];
  const v = n % 100;
  return n + (s[(v - 20) % 10] || s[v] || s[0]);
}

function firstSentence(t: string): string {
  const m = t.match(/^.*?[.!?](\s|$)/);
  return m ? m[0].trim() : t;
}

function cityName(slug: string): string {
  return getCityBySlug(slug)?.name ?? slug;
}

/* ── Which of our nine services a finished job demonstrates ── */
function projectServices(p: Project): string[] {
  const t = `${p.title} ${p.description}`.toLowerCase();
  const out: string[] = [];
  if (p.service === 'Doors') out.push('doors');
  if (/window/.test(t)) out.push('windows');
  if (/trim/.test(t)) out.push('exterior-trim');
  if (/cedar shingle|cedar siding/.test(t) && !/cedar-to-vinyl/.test(t)) out.push('cedar-shingle-siding');
  if (/fiber[- ]cement|hardie/.test(t)) out.push('fiber-cement-siding');
  if (/vinyl/.test(t)) out.push('siding');
  if (/replacement|whole-house|complete|full|transformation/.test(t) && p.service === 'Siding') out.push('siding-replacement');
  if (p.service === 'Siding' && out.length === 0) out.push('siding');
  return out;
}

export interface NearbyJob {
  project: Project;
  miles: number;
  direction: string;
  sameService: boolean;
}

/** Our finished jobs nearest to a town, nearest first; same-service jobs win ties. */
export function nearestJobs(citySlug: string, serviceSlug?: string, limit = 3): NearbyJob[] {
  return projects
    .map((p) => {
      const miles = milesToProjectTown(citySlug, p.location);
      return miles === null
        ? null
        : {
            project: p,
            miles,
            direction: directionToProjectTown(citySlug, p.location) ?? '',
            sameService: serviceSlug ? projectServices(p).includes(serviceSlug) : false,
          };
    })
    .filter((x): x is NearbyJob => x !== null)
    .sort((a, b) => a.miles - b.miles || Number(b.sameService) - Number(a.sameService))
    .slice(0, limit);
}

function jobWhere(j: NearbyJob, town: string): string {
  return j.miles <= 1 ? `in ${town} itself` : `in ${j.project.location}, ${j.miles} miles ${j.direction} of ${town}`;
}

/* ── Housing age, from the Census, and what it means for each service ── */
type AgeBand = 'old' | 'mixed' | 'newer';

function ageBand(h: TownData['housing']): AgeBand {
  if (h.pre1980 >= 65) return 'old';
  if (h.medianYear >= 1983) return 'newer';
  return 'mixed';
}

const AGE_MEANING: Record<string, Record<AgeBand, string>> = {
  _city: {
    old: 'With most of the housing built before 1980, many of these walls are on their second or third exterior, and lead-safe work practices matter: federal EPA rules apply to disturbing paint on homes built before 1978.',
    mixed: 'A stock this mixed means no two quotes start the same way: an older house may be hiding asbestos-cement shingles or lead paint under its current siding, while a newer one is usually down to its original builder-grade materials.',
    newer: 'A younger housing stock usually means original builder-grade siding, windows and trim reaching the end of their first life, with less old paint and fewer hidden layers to deal with.',
  },
  siding: {
    old: 'On houses this old, vinyl usually goes over the second or third exterior the wall has had, so we strip to the sheathing and expect to repair some of it. Homes built before 1978 come under federal lead-safe rules when old paint is disturbed.',
    mixed: 'On the older houses here vinyl often replaces aluminium or painted clapboard; on the newer ones it replaces the builder-grade vinyl that went on first.',
    newer: 'Most vinyl jobs on houses this young replace the original builder-grade panels, which tend to go brittle and fade long before the wall behind them is in trouble.',
  },
  'fiber-cement-siding': {
    old: 'Fiber cement suits these older houses well because it reads like the painted wood they were built with, but an old wall is rarely flat enough for it without furring or sheathing repairs first.',
    mixed: 'Fiber cement is a natural step up on the older houses here, where it can stand in for the original painted wood, and a durable choice on the newer ones.',
    newer: 'On a younger house fiber cement usually replaces builder-grade vinyl, and the wall is generally flat enough to take it with little preparation.',
  },
  'cedar-shingle-siding': {
    old: 'Older houses are where cedar shingle is most often original, so a lot of our cedar work here is weaving new shingles into a wall that is otherwise worth keeping.',
    mixed: 'Cedar here is a mix of repairs to original shingle walls on the older houses and new installs on the newer ones.',
    newer: 'On a younger house cedar is usually a deliberate upgrade from the original siding rather than a repair.',
  },
  'clapboard-siding': {
    old: 'Clapboard is the original wall on many houses this old, often painted many times over, and the trim around it is what makes a repair look right.',
    mixed: 'On the older houses here clapboard is usually original; on the newer ones it is a choice homeowners make for the traditional look.',
    newer: 'On a younger house clapboard, usually in fiber cement, is chosen for the traditional look rather than inherited.',
  },
  'siding-replacement': {
    old: 'Houses this old are where full replacements turn up the most behind the old siding: earlier layers, asbestos-cement shingles, and sheathing that has taken on water. Homes built before 1978 come under federal lead-safe rules.',
    mixed: 'Replacements here range from stripping several layers off an older house to replacing the first, builder-grade siding on a newer one.',
    newer: 'A replacement on a younger house is usually a single layer of original siding over sound sheathing, which keeps the hidden-damage line of the quote small.',
  },
  'siding-repair': {
    old: 'On older houses a repair often means matching a profile that is no longer made, and looking for the old leak behind the stain before patching anything.',
    mixed: 'Repairs here range from matching discontinued profiles on older houses to fixing storm damage on newer ones.',
    newer: 'Most repairs on younger houses are storm damage or a leak at a window or roofline, on siding that is still easy to match.',
  },
  'exterior-trim': {
    old: 'Older houses carry the most trim worth keeping: wide casings, corner boards and water tables, often with rot behind decades of paint.',
    mixed: 'Trim work here ranges from rebuilding original wood trim on older houses to replacing wrapped or builder-grade trim on newer ones.',
    newer: 'On a younger house trim work is usually replacing original wood fascia and sills that have started to rot, often with PVC.',
  },
  windows: {
    old: 'On houses this old we still find original single-pane sashes and weight pockets, and openings rarely square; homes built before 1978 come under federal lead-safe rules when old paint is disturbed.',
    mixed: 'Window jobs here range from original single-pane sashes in older houses to the first-generation double-pane units in newer ones, now fogging between the glass.',
    newer: 'On a younger house the windows being replaced are usually the original double-pane units, with failed seals rather than rotted frames.',
  },
  doors: {
    old: 'Older houses often have entries that have settled out of square, so a door job here usually starts with the opening rather than the door.',
    mixed: 'Door jobs here range from rebuilding settled openings on older houses to replacing original builder-grade units on newer ones.',
    newer: 'On a younger house the door being replaced is usually the original builder-grade unit, in an opening that is still square.',
  },
};

const BY_AGE = [...cities]
  .sort((a, b) => (TOWN_DATA[a.slug]?.housing.medianYear ?? 9999) - (TOWN_DATA[b.slug]?.housing.medianYear ?? 9999))
  .map((c) => c.slug);

function homesParagraph(name: string, slug: string, serviceSlug?: string): string {
  const t = TOWN_DATA[slug];
  if (!t) return '';
  const h = t.housing;
  const rank = BY_AGE.indexOf(slug) + 1;
  const multi =
    h.twoFour >= 20
      ? `, and ${h.twoFour}% are in two- to four-family buildings, the three-deckers and two-families this part of Massachusetts is known for`
      : `, and ${h.single}% are single-family houses`;
  const facts = `The Census counts ${h.units.toLocaleString('en-US')} homes in ${name}. The typical one was built in ${h.medianYear}, which makes ${name}'s housing the ${ordinal(rank)} oldest of the 109 towns we serve; ${h.pre1960}% went up before 1960 and ${h.pre1980}% before 1980. ${h.owner}% are lived in by their owners${multi}.`;
  const meaning = AGE_MEANING[serviceSlug ?? '_city']?.[ageBand(h)] ?? AGE_MEANING._city[ageBand(h)];
  return `${facts} ${meaning}`;
}

/* What the housing age means for THIS service in THIS town: the town's own
   numbers joined to the service's own reason they matter. One per page. */
const AGE_CLAUSE: Record<string, string> = {
  siding: 'the houses most likely to have an older layer, or asbestos-cement shingles, under the current siding',
  'fiber-cement-siding': 'walls that usually need furring or sheathing repair before fiber cement can go up flat',
  'cedar-shingle-siding': 'the age where an original cedar wall is often worth repairing rather than replacing',
  'clapboard-siding': 'many of them with original clapboard still under later siding',
  'siding-replacement': 'the houses where a replacement most often turns up earlier layers and wet sheathing',
  'siding-repair': 'where a repair usually means matching a profile that is no longer made',
  'exterior-trim': 'where original wood trim is most likely hiding rot under layers of paint',
  windows: 'where original single-pane sashes and empty weight pockets still turn up',
  doors: 'where entries have often settled out of square',
};

function serviceTownLine(service: Service, name: string, slug: string, g: CityGeo): string {
  const t = TOWN_DATA[slug];
  if (!t) return '';
  const h = t.housing;
  const old = Math.round((h.units * h.pre1980) / 100).toLocaleString('en-US');
  const clause = AGE_CLAUSE[service.slug] ?? 'the houses that need the most preparation';
  return `Of ${name}'s ${h.units.toLocaleString('en-US')} homes, roughly ${old} predate 1980: ${clause}. Our ${service.shortName} quotes there start from a ${h.medianYear} house at ${t.elevFt} ft, ${g.milesFromCoast} mi inland.`;
}

function tripLine(name: string, slug: string): string {
  const t = TOWN_DATA[slug];
  if (!t?.route) return `${name} is where our shop is.`;
  const roads = t.route.roads.length > 1 ? `${t.route.roads.slice(0, -1).join(', ')} and ${t.route.roads[t.route.roads.length - 1]}` : t.route.roads[0];
  return `From the shop it is ${t.route.miles} road miles to the centre of ${name}, about ${t.route.minutes} minutes without traffic${roads ? `, mostly on ${roads}` : ''}.`;
}

function elevationLine(name: string, slug: string): string {
  const t = TOWN_DATA[slug];
  const shop = TOWN_DATA.charlton?.elevFt;
  if (!t || shop === undefined) return '';
  if (slug === 'charlton') return `The town centre sits about ${t.elevFt} feet above sea level.`;
  const diff = t.elevFt - shop;
  return `The centre of ${name} sits about ${t.elevFt} feet above sea level, ${Math.abs(diff)} feet ${diff >= 0 ? 'higher' : 'lower'} than our shop.`;
}

export const SOURCES_NOTE = 'Sources: US Census ACS 2020–24, OpenStreetMap, USGS.';

/** Label/value facts for a town — rendered as a fact sheet, not prose. */
export function townFacts(city: City): { label: string; value: string }[] {
  const g = cityGeo(city.slug);
  const t = TOWN_DATA[city.slug];
  if (!g || !t) return [];
  const h = t.housing;
  const rows: { label: string; value: string }[] = [
    { label: 'County', value: `${g.county}, ZIP ${city.zip}` },
    {
      label: 'From our shop',
      value: t.route
        ? `${g.milesFromHQ} mi ${g.direction} · ${t.route.miles} road mi · ~${t.route.minutes} min`
        : 'Our shop is here',
    },
  ];
  if (t.route?.roads.length) rows.push({ label: 'Main roads from the shop', value: t.route.roads.join(', ') });
  rows.push(
    { label: 'Closest of our 109 towns', value: ordinal(BY_SHOP.indexOf(city.slug) + 1) },
    { label: 'To the coast', value: `${g.milesFromCoast} mi (${ordinal(BY_COAST.indexOf(city.slug) + 1)} closest)` },
    { label: 'Town-centre elevation', value: `${t.elevFt.toLocaleString('en-US')} ft` },
    { label: 'Homes (Census)', value: h.units.toLocaleString('en-US') },
    { label: 'Typical year built', value: `${h.medianYear} (${ordinal(BY_AGE.indexOf(city.slug) + 1)} oldest)` },
    { label: 'Built before 1960 / 1980', value: `${h.pre1960}% / ${h.pre1980}%` },
    { label: 'Owner-occupied', value: `${h.owner}%` },
    { label: 'Single-family / 2–4 family', value: `${h.single}% / ${h.twoFour}%` },
  );
  return rows;
}

/* ── The towns around this one, each described by its own facts ── */
export interface NeighbourRow {
  slug: string;
  name: string;
  miles: number;
  direction: string;
  county: string;
  coast: number;
  shop: number;
  /** Census: typical year built and number of homes. */
  year: number;
  homes: number;
}

function neighbourRows(slug: string): NeighbourRow[] {
  const g = cityGeo(slug);
  if (!g) return [];
  return nearestTowns(slug).map((s) => ({
    slug: s,
    name: cityName(s),
    miles: milesBetween(slug, s) ?? 0,
    direction: directionBetween(slug, s) ?? '',
    county: countyOf(s) ?? '',
    coast: milesFromCoast(s) ?? 0,
    shop: milesFromHQ(s) ?? 0,
    year: TOWN_DATA[s]?.housing.medianYear ?? 0,
    homes: TOWN_DATA[s]?.housing.units ?? 0,
  }));
}

function nearestTowns(slug: string): string[] {
  return cities
    .filter((c) => c.slug !== slug)
    .map((c) => ({ s: c.slug, d: milesBetween(slug, c.slug) ?? 999 }))
    .sort((a, b) => a.d - b.d)
    .slice(0, 10)
    .map((x) => x.s);
}

/* ── This town against its county and against all 109, from the Census ── */
export interface Comparison {
  label: string;
  town: string;
  county: string;
  all: string;
}

function avg(nums: number[]): number {
  return nums.length ? nums.reduce((a, b) => a + b, 0) / nums.length : 0;
}

export function townComparison(city: City): Comparison[] {
  const t = TOWN_DATA[city.slug];
  if (!t) return [];
  const same = cities.filter((c) => c.county === city.county).map((c) => TOWN_DATA[c.slug]?.housing).filter(Boolean) as TownData['housing'][];
  const all = cities.map((c) => TOWN_DATA[c.slug]?.housing).filter(Boolean) as TownData['housing'][];
  const row = (label: string, pick: (h: TownData['housing']) => number, fmt: (n: number) => string) => ({
    label,
    town: fmt(pick(t.housing)),
    county: fmt(avg(same.map(pick))),
    all: fmt(avg(all.map(pick))),
  });
  const pct = (n: number) => `${Math.round(n)}%`;
  return [
    row('Typical year built', (h) => h.medianYear, (n) => String(Math.round(n))),
    row('Built before 1980', (h) => h.pre1980, pct),
    row('Built before 1940', (h) => h.pre1940, pct),
    row('Owner-occupied', (h) => h.owner, pct),
    row('In 2–4 family buildings', (h) => h.twoFour, pct),
  ];
}

/** One sentence comparing the town with the towns around it, from the numbers. */
function neighbourSummary(name: string, g: CityGeo, rows: NeighbourRow[]): string {
  const byCoast = [...rows].sort((a, b) => a.coast - b.coast);
  const byShop = [...rows].sort((a, b) => a.shop - b.shop);
  const other = rows.filter((r) => r.county !== g.county);
  const byYear = [...rows].sort((a, b) => a.year - b.year);
  const agePart = `${byYear[0].name} has the oldest housing of them (typical ${byYear[0].year}) and ${byYear[byYear.length - 1].name} the newest (${byYear[byYear.length - 1].year}).`;
  const countyPart = other.length
    ? `${other.map((r) => r.name).join(' and ')} ${other.length === 1 ? 'is' : 'are'} across the line in ${[...new Set(other.map((r) => r.county))].join(' and ')} County`
    : `all ${rows.length} are in ${g.county} County with it`;
  return `Around ${name}, ${byCoast[0].name} sits closest to the coast at ${byCoast[0].coast} miles and ${byCoast[byCoast.length - 1].name} farthest at ${byCoast[byCoast.length - 1].coast}; ${byShop[0].name} is the nearest of them to our shop (${byShop[0].shop} mi) and ${byShop[byShop.length - 1].name} the farthest (${byShop[byShop.length - 1].shop} mi). ${countyPart[0].toUpperCase() + countyPart.slice(1)}. ${agePart}`;
}

/** One line per nearby job: distance from the town and from the shop. */
function jobLines(jobs: NearbyJob[], town: string): string[] {
  return jobs.map((j) => {
    const shop = milesHQToProjectTown(j.project.location);
    const where = j.miles <= 1 ? `here in ${town}` : `${j.miles} miles ${j.direction} of ${town}`;
    return `${j.project.title}, ${j.project.location}: ${where}${shop !== null ? `, ${shop} miles from our shop` : ''}.`;
  });
}

/* ═══════════════════════════════ CITY × SERVICE ═══════════════════════ */

export interface ServiceCityContent {
  heroSubtitle: string;
  placement: string;
  climate: string;
  housing: string;
  neighbourLine: string;
  neighbours: { slug: string; name: string; miles: number }[];
  neighbourRows: NeighbourRow[];
  neighbourSummary: string;
  lead: string;
  facts: { label: string; value: string }[];
  comparison: Comparison[];
  jobsIntro: string;
  jobs: NearbyJob[];
  jobLines: string[];
  neighbourhoods: string[];
  faqs: { question: string; answer: string }[];
  title: string;
  description: string;
}

export function getServiceCityContent(service: Service, city: City): ServiceCityContent {
  const g = cityGeo(city.slug) as CityGeo;
  const shopRank = BY_SHOP.indexOf(city.slug) + 1;
  const coastRank = BY_COAST.indexOf(city.slug) + 1;
  const isHome = city.slug === 'charlton';
  const neighbours = g.neighbours.map((s) => ({ slug: s, name: cityName(s), miles: milesBetween(city.slug, s) ?? 0 }));
  const jobs = nearestJobs(city.slug, service.slug, 3);
  const nearestSame = jobs.find((j) => j.sameService);

  const heroSubtitle = isHome
    ? `${service.name} for ${city.name} homes, from the shop on Stoneybrook Road. Licensed, insured, our own crew.`
    : `${service.name} for ${city.name} homes, ${g.milesFromHQ} miles ${g.direction} of our Charlton shop. Licensed, insured, our own crew.`;

  const placement = isHome
    ? `${city.name} is where our shop is: 13 Stoneybrook Road, ${city.zip}. A ${service.shortName} job here is on our own doorstep, ${g.milesFromCoast} miles from the coast, in ${g.county} County.`
    : `${city.name} (${city.zip}) is in ${g.county} County, ${g.drive}. Of the 109 towns we serve it is the ${ordinal(shopRank)} closest to the shop and sits ${g.milesFromCoast} miles from salt water, ${BAND_LABEL[g.exposure]}. ${tripLine(city.name, city.slug)}`;

  const climate = `${firstSentence(service.exposureNotes[g.exposure])} ${elevationLine(city.name, city.slug)} ${
    g.exposure === 'coastal' || g.exposure === 'near-coastal'
      ? `At ${g.milesFromCoast} miles from the water, ${city.name} is the ${ordinal(coastRank)} closest of our towns to the coast.`
      : g.exposure === 'upland'
        ? `${city.name} is ${g.milesFromCoast} miles from the coast and ${g.milesFromHQ} from the shop, well into that colder ground.`
        : `${city.name} is ${g.milesFromCoast} miles from the coast, so the winter, not salt, is what a ${service.shortName} job here is detailed for.`
  }`;

  const housing = `${homesParagraph(city.name, city.slug, service.slug)} ${serviceTownLine(service, city.name, city.slug, g)}`;

  const neighbourLine = `${city.name} borders ${neighbours
    .slice(0, 4)
    .map((n) => `${n.name} (${n.miles} mi)`)
    .join(', ')} and ${neighbours[4]?.name ?? ''} (${neighbours[4]?.miles ?? 0} mi). We offer ${service.shortName} in each of them.`;

  const jobsIntro = nearestSame
    ? `The closest ${service.shortName === 'window replacement' || service.shortName === 'door installation' ? service.shortName : `${service.shortName} job`} we have photographed is ${nearestSame.project.title} ${jobWhere(nearestSame, city.name)}. These are our finished jobs nearest to ${city.name}:`
    : `These are our photographed jobs nearest to ${city.name}, the closest ${jobWhere(jobs[0], city.name)}:`;

  const lead = serviceTownLine(service, city.name, city.slug, g);

  const faqs = [
    {
      question: `How far is ${city.name} from your shop?`,
      answer: isHome
        ? `We are in ${city.name}: the shop is at 13 Stoneybrook Road. Estimates here are usually the same week.`
        : `${city.name} is ${g.milesFromHQ} miles ${g.direction} of our shop at 13 Stoneybrook Road in Charlton, straight-line. It is the ${ordinal(shopRank)} closest of the 109 towns we serve. Estimates are free and we come to you.`,
    },
    {
      question: `What is the nearest job you have done to ${city.name}?`,
      answer: `${jobs[0].project.title}, ${jobWhere(jobs[0], city.name)}. ${jobs
        .slice(1)
        .map((j) => `${j.project.title} in ${j.project.location} is ${j.miles} miles ${j.direction}.`)
        .join(' ')} Photos of each are on our projects page.`,
    },
  ];
  const rows = neighbourRows(city.slug);

  const title = `${service.name} in ${city.name}, MA | Maia Construction`;
  const description = isHome
    ? `${service.name} in ${city.name}, MA from our Stoneybrook Rd shop. ${BAND_HOOK[g.exposure][0].toUpperCase() + BAND_HOOK[g.exposure].slice(1)}. Free estimate: ${PHONE}.`
    : `${service.name} in ${city.name}, MA, ${g.milesFromHQ} mi from our Charlton shop. ${BAND_HOOK[g.exposure][0].toUpperCase() + BAND_HOOK[g.exposure].slice(1)}. Free estimate: ${PHONE}.`;

  return {
    heroSubtitle,
    placement,
    climate,
    housing,
    neighbourLine,
    neighbours,
    neighbourRows: rows,
    neighbourSummary: neighbourSummary(city.name, g, rows),
    lead,
    facts: townFacts(city),
    comparison: townComparison(city),
    jobsIntro,
    jobs,
    jobLines: jobLines(jobs, city.name),
    neighbourhoods: NEIGHBOURHOODS[city.slug] ?? [],
    faqs,
    title,
    description,
  };
}

/* ═══════════════════════════════════ CITY ═════════════════════════════ */

export interface CityContent {
  heroSubtitle: string;
  placement: string;
  climate: string;
  housing: string;
  neighbours: { slug: string; name: string; miles: number }[];
  neighbourRows: NeighbourRow[];
  neighbourSummary: string;
  jobs: NearbyJob[];
  jobLines: string[];
  neighbourhoods: string[];
  faqs: { q: string; a: string }[];
  title: string;
  description: string;
}

const BAND_STORY: Record<ExposureBand, string> = {
  coastal:
    'This close to the ocean, salt air is what ages an exterior: it gets into the laps and corrodes fasteners and flashing long before it marks the face of the siding.',
  'near-coastal':
    'Towns a few miles in from the coast get the worst of both: salt carried on an onshore wind and a full freeze-thaw winter, which keeps opening the seams the salt is working on.',
  inland:
    'Inland, the damage comes from freeze-thaw. Water gets into a seam, freezes, expands and opens the joint a little further, night after night through the winter.',
  upland:
    'On the higher ground around and west of Worcester the winter is longer and snowier. Snow sits against the bottom of the wall and meltwater refreezes at night, so the lowest courses take most of the wear.',
};

export function getCityContent(city: City): CityContent {
  const g = cityGeo(city.slug) as CityGeo;
  const shopRank = BY_SHOP.indexOf(city.slug) + 1;
  const isHome = city.slug === 'charlton';
  const neighbours = g.neighbours.map((s) => ({ slug: s, name: cityName(s), miles: milesBetween(city.slug, s) ?? 0 }));
  const jobs = nearestJobs(city.slug, undefined, 3);

  return {
    heroSubtitle: isHome
      ? `Siding, trim, windows and doors for ${city.name} homes, from our shop on Stoneybrook Road.`
      : `Siding, trim, windows and doors for ${city.name} homes, ${g.milesFromHQ} miles ${g.direction} of our Charlton shop.`,
    placement: isHome
      ? `${city.name} is home: the shop is at 13 Stoneybrook Road (${city.zip}), in ${g.county} County, ${g.milesFromCoast} miles from the coast.`
      : `${city.name} (${city.zip}) is in ${g.county} County, ${g.drive}. It is the ${ordinal(shopRank)} closest of the 109 towns we serve, and ${g.milesFromCoast} miles from the coast. The towns next to it are ${neighbours
          .map((n) => `${n.name} (${n.miles} mi)`)
          .join(', ')}. ${tripLine(city.name, city.slug)}`,
    climate: `${BAND_STORY[g.exposure]} ${elevationLine(city.name, city.slug)} ${
      g.exposure === 'inland' || g.exposure === 'upland'
        ? `${city.name}, ${g.milesFromCoast} miles from salt water, is in that group.`
        : `${city.name}, ${g.milesFromCoast} miles from the water, is in that group.`
    }`,
    housing: homesParagraph(city.name, city.slug),
    neighbours,
    neighbourRows: neighbourRows(city.slug),
    neighbourSummary: neighbourSummary(city.name, g, neighbourRows(city.slug)),
    jobs,
    jobLines: jobLines(jobs, city.name),
    neighbourhoods: NEIGHBOURHOODS[city.slug] ?? [],
    faqs: [
      {
        q: `How far is ${city.name} from your shop?`,
        a: isHome
          ? `The shop is in ${city.name}, at 13 Stoneybrook Road.`
          : `${g.milesFromHQ} miles ${g.direction} of 13 Stoneybrook Road, Charlton, in a straight line. Estimates are free and we come to you.`,
      },
      {
        q: `What is your nearest finished job to ${city.name}?`,
        a: `${jobs[0].project.title}, ${jobWhere(jobs[0], city.name)}. Next closest: ${jobs
          .slice(1)
          .map((j) => `${j.project.title} in ${j.project.location} (${j.miles} mi)`)
          .join(' and ')}.`,
      },
      {
        q: `Which towns near ${city.name} do you serve?`,
        a: `All of its neighbours: ${neighbours.map((n) => `${n.name} (${n.miles} mi)`).join(', ')}, plus the rest of our 109-town area.`,
      },
      {
        q: `Are you licensed to work in ${city.name}?`,
        a: `Yes. Maia Construction is a Massachusetts Home Improvement Contractor, HIC #${HIC_NUMBER}, insured, and we pull the ${city.name} permit ourselves.`,
      },
    ],
    title: `Siding Contractor in ${city.name}, MA | Maia Construction`,
    description: isHome
      ? `Siding, trim, windows and doors in ${city.name}, MA from our Stoneybrook Rd shop. HIC #${HIC_NUMBER}. Free estimate: ${PHONE}.`
      : `Siding, trim, windows and doors in ${city.name}, MA, ${g.milesFromHQ} mi from our Charlton shop. HIC #${HIC_NUMBER}. Free estimate: ${PHONE}.`,
  };
}

/** Exposed for sitemap/tests: every town resolves to real geography. */
export function allCitiesHaveGeo(): boolean {
  return cities.every((c) => cityGeo(c.slug) !== null && milesFromHQ(c.slug) === c.distance);
}
