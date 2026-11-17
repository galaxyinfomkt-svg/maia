/* ═══════════════════════════════════════════════════════════════════════
   TOWN LENS — for each service, only the facts about a town that change
   that particular job. Every number comes from TOWN_DATA / TOWN_EXTRA
   (public sources listed in those files); nothing here is estimated.
   A service page shows its own lens, so the nine pages of one town no
   longer repeat the same town block.
   ═══════════════════════════════════════════════════════════════════════ */
import type { City, Service } from '@/types';
import { TOWN_DATA } from './town-data';
import { TOWN_EXTRA, type TownExtra } from './town-extra';

const n = (x: number | null | undefined) => (x ?? 0).toLocaleString('en-US');
const pc = (a: number, b: number) => (b ? Math.round((100 * a) / b) : 0);
const usd = (x: number | null | undefined) => (x ? `$${Math.round(x / 1000).toLocaleString('en-US')}k` : '');
const fdate = (iso: string | null | undefined) => {
  if (!iso) return '';
  const [y, m, d] = iso.split('-').map(Number);
  return new Date(Date.UTC(y, m - 1, d)).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric', timeZone: 'UTC' });
};
const list = (xs: string[]) => (xs.length <= 1 ? xs.join('') : `${xs.slice(0, -1).join(', ')} and ${xs[xs.length - 1]}`);

const FUEL_LABEL: Record<string, string> = {
  gas: 'utility gas', bottled: 'propane', electric: 'electricity', oil: 'fuel oil or kerosene',
  coal: 'coal', wood: 'wood', solar: 'solar', other: 'another fuel', none: 'no fuel',
};
function fuelsRanked(e: TownExtra) {
  const f = e.census.fuel as unknown as Record<string, number>;
  return Object.entries(f)
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .map(([k, v]) => ({ key: k, label: FUEL_LABEL[k] ?? k, homes: v, pct: pc(v, e.census.heated) }));
}
/** Climate averages read better as whole numbers ("135 nights", not "134.9"). */
const rnd = (c: TownExtra['climate']) =>
  c ? { ...c, frostNights: Math.round(c.frostNights), iceDays: Math.round(c.iceDays), zeroNights: Math.round(c.zeroNights), precipIn: Math.round(c.precipIn) } : null;
const shortUtility = (s: string | null) => (s ? s.replace(/\s*\(.*?\)\s*/g, '').trim() : '');

export interface Lens {
  heading: string;
  points: string[];
  sources: string;
}

const pre1980Homes = (slug: string) => {
  const h = TOWN_DATA[slug]?.housing;
  return h ? Math.round((h.units * h.pre1980) / 100) : 0;
};
const pre1940Homes = (slug: string) => {
  const h = TOWN_DATA[slug]?.housing;
  return h ? Math.round((h.units * h.pre1940) / 100) : 0;
};

function lhdLine(e: TownExtra, town: string, what: string): string | null {
  const d = e.mhc?.lhd ?? [];
  if (!d.length) return null;
  const names = d.length > 3 ? `${list(d.slice(0, 3))} and ${d.length - 3} more` : list(d);
  return `${town} has ${d.length === 1 ? 'a local historic district' : `${d.length} local historic district areas`} on the state inventory (${names}). Inside ${d.length === 1 ? 'it' : 'them'}, changing ${what} that can be seen from a public way can need a certificate from the district commission under MGL c.40C before work starts.`;
}

function utilityLine(e: TownExtra, town: string, angle: 'windows' | 'doors'): string | null {
  if (!e.electric) return null;
  const el = shortUtility(e.electric);
  const gas = e.gas ? shortUtility(e.gas) : '';
  if (e.mlp) {
    return angle === 'windows'
      ? `${town}'s electricity comes from ${el}, a municipal light plant, not an investor-owned utility, so efficiency rebates on the electric side are set by that plant rather than by Mass Save${gas ? `; gas customers are served by ${gas}` : ''}.`
      : `Because ${el} — a town-owned light plant — supplies ${town}, any rebate tied to electric heating comes from its own program${gas ? `, while ${gas} serves gas customers` : ''}.`;
  }
  if (angle === 'windows') {
    return gas
      ? `${el} supplies ${town}'s electricity and ${gas} its natural gas; both are Mass Save sponsors, so window rebates run through Mass Save.`
      : `${el} supplies ${town}'s electricity and MassGIS lists no natural-gas utility in town; ${el} is a Mass Save sponsor.`;
  }
  return `For an entry door, the utility that matters for rebates is ${gas ? `${gas} on gas heat or ${el} on electric heat` : `${el} (MassGIS shows no gas utility in ${town})`}.`;
}

function codeLine(e: TownExtra, town: string): string | null {
  const c = e.energy;
  if (!c) return null;
  if (c.specialized) return `${town} adopted the Stretch energy code effective ${fdate(c.stretch)} and the Municipal Opt-in Specialized code effective ${fdate(c.specialized)} (DOER list of November 2026).`;
  if (c.stretch) return `${town} has been a Stretch energy code town since ${fdate(c.stretch)} and has not adopted the Specialized code (DOER list of November 2026).`;
  return `${town} is on the base Massachusetts energy code, not the Stretch code (DOER list of November 2026).`;
}

export function serviceLens(service: Service, city: City): Lens | null {
  const e = TOWN_EXTRA[city.slug];
  const t = TOWN_DATA[city.slug];
  if (!e || !t) return null;
  const T = city.name;
  const h = t.housing;
  const u = e.census.units;
  const cl = rnd(e.climate);
  const cmr = e.cmr;
  const m = e.mhc;
  const fuels = fuelsRanked(e);
  const pts: (string | null)[] = [];
  let src = '';

  switch (service.slug) {
    case 'windows': {
      const f0 = fuels[0], f1 = fuels[1];
      pts.push(f0 ? `Of ${T}'s ${n(e.census.heated)} occupied homes, ${n(f0.homes)} (${f0.pct}%) heat with ${f0.label}${f1 ? ` and ${n(f1.homes)} (${f1.pct}%) with ${f1.label}` : ''} — the fuel bill a window upgrade is measured against.` : null);
      pts.push(utilityLine(e, T, 'windows'));
      pts.push(codeLine(e, T));
      pts.push(`About ${n(pre1980Homes(city.slug))} of the town's homes were built before 1980; where the house predates 1978, removing old sashes falls under the EPA lead-safe (RRP) rule, which Massachusetts runs through 454 CMR 22.00.`);
      pts.push(lhdLine(e, T, 'windows'));
      src = 'Census ACS 2020–24 (B25040, B25034); MassGIS utility layers; DOER energy-code list; EPA RRP; MHC inventory.';
      return { heading: `What changes a window job in ${T}`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'doors': {
      pts.push(`${T}'s housing mix shapes the door order: ${n(u.detached)} detached houses, ${n(u.attached)} attached, ${n(u.two)} homes in two-unit buildings and ${n(u.threeFour)} in buildings of three or four units.`);
      pts.push(cl ? `At the town centre the 1991–2020 record averages ${cl.iceDays} days a year that never get above freezing and ${cl.zeroNights} nights at or below 0 °F — cold that shrinks weatherstrip and lifts thresholds.` : null);
      pts.push(utilityLine(e, T, 'doors'));
      pts.push(cmr ? `The state building code puts ${T}'s design wind speed at ${cmr.vult} mph, the figure a storm door on an exposed wall has to stand up to.` : null);
      pts.push(lhdLine(e, T, 'an entry door'));
      src = 'Census ACS 2020–24 (B25024); NOAA RCC-ACIS (PRISM); MassGIS utility layers; 780 CMR Table 301.2(2); MHC inventory.';
      return { heading: `${T} facts that decide the door`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'siding': {
      pts.push(cmr ? `Massachusetts code (780 CMR Table 301.2(2)) assigns ${T} an ultimate design wind speed of ${cmr.vult} mph and a ground snow load of ${cmr.pg} psf; a vinyl panel's published wind-load rating should clear that wind figure.` : null);
      pts.push(`Roughly ${n(pre1980Homes(city.slug))} of ${T}'s ${n(h.units)} homes went up before 1980, when an older layer under the siding can be asbestos-cement shingle; removing that is regulated by MassDEP (310 CMR 7.15).`);
      pts.push(cl ? `The town centre averages ${cl.frostNights} nights a year at or below 32 °F (from ${cl.frostNightsMin} to ${cl.frostNightsMax} across 1991–2020), and vinyl expands and contracts with every swing, so it is nailed to slide, not pinned tight.` : null);
      pts.push(`Detached single-family houses number ${n(u.detached)} here; ${n(u.two + u.threeFour)} more homes sit in two- to four-unit buildings, which usually means more corners and more trim to wrap.`);
      src = '780 CMR 10th ed.; Census ACS 2020–24 (B25034, B25024); MassDEP 310 CMR 7.15; NOAA RCC-ACIS (PRISM).';
      return { heading: `Vinyl siding in ${T}: the numbers we work to`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'fiber-cement-siding': {
      pts.push(cl ? `Fiber cement has to live through freeze-thaw: ${T}'s centre logged between ${cl.frostNightsMin} and ${cl.frostNightsMax} frost nights a year from 1991 to 2020, and ${cl.precipIn} inches of precipitation in an average year.` : null);
      pts.push(cmr ? `It is also heavy and tall walls take wind: the code figures for ${T} are ${cmr.vult} mph and ${cmr.pg} psf of ground snow.` : null);
      pts.push(e.census.medianValue ? `The median owner-occupied home in ${T} is valued at ${usd(e.census.medianValue)} (Census), the figure owners usually weigh a long-life cladding against.` : null);
      pts.push(`${h.pre1960}% of the houses here were built before 1960, the age where sheathing usually needs repair or furring before boards can hang flat.`);
      src = 'NOAA RCC-ACIS (PRISM); 780 CMR 10th ed.; Census ACS 2020–24 (B25077, B25034).';
      return { heading: `Fiber cement and ${T}'s weather`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'cedar-shingle-siding': {
      const st = (m?.styles ?? []).slice(0, 4).map(([s, c]) => `${s} (${c})`);
      pts.push(m && m.inventoried ? `The Massachusetts Historical Commission has surveyed ${n(m.inventoried)} buildings and places in ${T}${st.length ? `; the styles recorded most often are ${list(st)}` : ''}.` : null);
      pts.push(m && m.oldest ? `The oldest dated building in that inventory goes back to ${m.oldest}, and ${n(m.before1800)} surveyed entries predate 1800 — the houses where an original shingle wall is worth matching course for course.` : null);
      pts.push(cl ? `Cedar weathers by moisture: ${T} averages ${cl.precipIn} inches of precipitation a year at the town centre (1991–2020).` : null);
      pts.push(lhdLine(e, T, 'wall cladding'));
      src = 'MHC inventory (MACRIS) via MassGIS; NOAA RCC-ACIS (PRISM); MGL c.40C.';
      return { heading: `Cedar shingles on ${T}'s older houses`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'clapboard-siding': {
      const st = (m?.styles ?? []).filter(([s]) => /Greek|Federal|Colonial|Georgian|Italianate|Queen|Victorian|Gothic|Second Empire/i.test(s)).slice(0, 4);
      pts.push(m && m.c19 ? `${n(m.c19)} of the dated entries in ${T}'s state inventory were built in the 1800s${m.before1800 ? `, and ${n(m.before1800)} before that` : ''} — clapboard country.` : null);
      pts.push(st.length ? `By style the inventory counts ${list(st.map(([s, c]) => `${c} ${s}`))} buildings, each with its own reveal and corner-board detail to reproduce.` : null);
      pts.push(m && m.nr.length ? `National Register districts here include ${list(m.nr.slice(0, 3))}${m.nr.length > 3 ? ` and ${m.nr.length - 3} more` : ''}.` : null);
      pts.push(lhdLine(e, T, 'clapboards and trim'));
      pts.push(`${pre1940Homes(city.slug) ? `About ${n(pre1940Homes(city.slug))} homes in ${T} date from before 1940 (Census).` : ''}`.trim() || null);
      src = 'MHC inventory (MACRIS) via MassGIS; Census ACS 2020–24 (B25034); MGL c.40C.';
      return { heading: `Clapboard work in ${T}: what the record shows`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'siding-replacement': {
      const dec = t.decades;
      pts.push(`Census decades for ${T}: ${dec[0]}% of homes before 1940, ${dec[1] + dec[2]}% from the 1940s–50s, ${dec[3] + dec[4]}% from the 1960s–70s and ${dec[5] + dec[6]}% from the 1980s–90s — the older the wall, the more layers a tear-off finds.`);
      pts.push(`On the ${n(pre1980Homes(city.slug))} homes built before 1980, old layers can include lead paint (EPA RRP for pre-1978 work) and asbestos-cement shingles (MassDEP notification before removal).`);
      pts.push(e.census.medianValue ? `With a median home value of ${usd(e.census.medianValue)} in ${T}, a full replacement is usually priced against resale as much as against repair.` : null);
      pts.push(cmr ? `The new cladding has to meet ${T}'s code design wind speed of ${cmr.vult} mph.` : null);
      src = 'Census ACS 2020–24 (B25034, B25077); EPA RRP; MassDEP 310 CMR 7.15; 780 CMR 10th ed.';
      return { heading: `Replacing siding in ${T}: what comes off first`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'siding-repair': {
      pts.push(cl ? `Freeze-thaw is hard on siding: ${T}'s centre swings between ${cl.frostNightsMin} and ${cl.frostNightsMax} frost nights a year and averages ${cl.iceDays} days that stay below freezing, cold that makes old vinyl brittle and opens joints.` : null);
      pts.push(cmr ? `Wind is the other cause: the code design speed for ${T} is ${cmr.vult} mph, and loose or unlocked courses are where storms start.` : null);
      pts.push(`With ${h.pre1980}% of homes built before 1980, many repairs mean matching a profile or color that is no longer made.`);
      pts.push(m && m.styles.length ? `On the ${n(m.inventoried)} surveyed historic buildings, a repair should match the original detail; the style recorded most often in ${T} is ${m.styles[0][0]}.` : null);
      src = 'NOAA RCC-ACIS (PRISM); 780 CMR 10th ed.; Census ACS 2020–24; MHC inventory.';
      return { heading: `Why siding fails in ${T}`, points: pts.filter(Boolean) as string[], sources: src };
    }
    case 'exterior-trim': {
      pts.push(cl ? `Trim rots where water sits: ${T} averages ${cl.precipIn} inches of rain and melted snow a year and ${cl.frostNights} frost nights at the town centre (1991–2020).` : null);
      pts.push(`About ${n(pre1940Homes(city.slug))} homes here were built before 1940, when trim was solid wood and often has layers of lead paint over it.`);
      pts.push(m && m.styles.length ? `Trim profiles follow the house: the state inventory for ${T} lists ${list(m.styles.slice(0, 3).map(([s, c]) => `${c} ${s}`))} buildings.` : null);
      pts.push(lhdLine(e, T, 'cornices, casings or corner boards'));
      src = 'NOAA RCC-ACIS (PRISM); Census ACS 2020–24 (B25034); MHC inventory; MGL c.40C.';
      return { heading: `Exterior trim in ${T}: water, age and style`, points: pts.filter(Boolean) as string[], sources: src };
    }
    default:
      return null;
  }
}

/* ── City dossier: the town's own record, as label / value rows ── */
type Row = [string, string];
export interface Dossier {
  homes: Row[];
  heritage: Row[];
  weather: Row[];
  energy: Row[];
}

export function townDossier(city: City): Dossier | null {
  const e = TOWN_EXTRA[city.slug];
  const t = TOWN_DATA[city.slug];
  if (!e || !t) return null;
  const u = e.census.units;
  const fuels = fuelsRanked(e).slice(0, 4);
  const m = e.mhc;
  const cl = rnd(e.climate);
  const more = (xs: string[], k: number) => (xs.length > k ? `${xs.slice(0, k).join('; ')}; +${xs.length - k}` : xs.join('; '));
  const homes: Row[] = [
    ['Homes (Census)', n(u.total)],
    ['Detached / attached', `${n(u.detached)} / ${n(u.attached)}`],
    ['2-unit / 3–4 unit / 5+ unit', `${n(u.two)} / ${n(u.threeFour)} / ${n(u.fivePlus)}`],
    ['Typical year built', String(t.housing.medianYear)],
    ['Owner-occupied', `${t.housing.owner}%`],
    ...(e.census.medianValue ? ([['Median value (owner-occupied)', usd(e.census.medianValue)]] as Row[]) : []),
    ...(fuels.length ? ([['Main heating fuels', fuels.map((f) => `${f.label} ${f.pct}%`).join(' · ')]] as Row[]) : []),
  ];
  const heritage: Row[] = m
    ? ([
        ['Inventoried (MHC)', n(m.inventoried)],
        m.oldest ? ['Oldest dated entry', String(m.oldest)] : null,
        ['Dated pre-1800 / 1800s / 1900–49', `${n(m.before1800)} / ${n(m.c19)} / ${n(m.early20)}`],
        m.styles.length ? ['Most-recorded styles', m.styles.slice(0, 4).map(([s2, c]) => `${s2} ${c}`).join(' · ')] : null,
        ['Local historic districts (c.40C)', m.lhd.length ? more(m.lhd, 4) : 'none listed'],
        m.nr.length ? ['National Register districts', more(m.nr, 4)] : null,
        m.individualNR ? ['Individually NR-listed', String(m.individualNR)] : null,
      ].filter(Boolean) as Row[])
    : [];
  const weather: Row[] = [
    ...(cl
      ? ([
          ['Nights ≤ 32 °F a year', `${cl.frostNights} (${cl.frostNightsMin}–${cl.frostNightsMax})`],
          ['Days below freezing', String(cl.iceDays)],
          ['Nights ≤ 0 °F', String(cl.zeroNights)],
          ['Precipitation', `${cl.precipIn} in`],
        ] as Row[])
      : []),
    ...(e.cmr
      ? ([
          ['Ground / flat-roof snow load', `${e.cmr.pg} / ${e.cmr.pf} psf`],
          ['Design wind speed (Vult)', `${e.cmr.vult} mph`],
        ] as Row[])
      : []),
  ];
  const c = e.energy;
  const energy: Row[] = [
    ...(e.electric ? ([['Electric utility', `${shortUtility(e.electric)}${e.mlp ? ' (municipal)' : ''}`]] as Row[]) : []),
    ['Natural gas', e.gas ? shortUtility(e.gas) : 'none listed'],
    ...(c
      ? ([['Energy code', c.specialized ? `Specialized since ${fdate(c.specialized)}` : c.stretch ? `Stretch since ${fdate(c.stretch)}` : 'Base code']] as Row[])
      : []),
  ];
  return { homes, heritage, weather, energy };
}
