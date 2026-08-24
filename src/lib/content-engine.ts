/**
 * Content Engine - Generates truly unique content for each city+service combination
 * Uses city characteristics, housing data, climate zones, and service-specific challenges
 * to create content that addresses real homeowner pain points.
 */

import { City } from '@/types';
import { SITE_NAME, PHONE, HIC_NUMBER } from './constants';

// ============================================================
// CITY DATA: Neighborhoods, housing types, founding era, climate
// ============================================================

interface CityProfile {
  neighborhoods: string[];
  housingTypes: string[];
  foundedEra: string;
  avgHomeAge: string;
  commonIssues: string[];
  localFlavor: string;
}

// Hash function to deterministically pick content variations
function cityHash(slug: string): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = ((hash << 5) - hash) + slug.charCodeAt(i);
    hash |= 0;
  }
  return Math.abs(hash);
}

// County-based profiles for cities without explicit profiles
const countyProfiles: Record<string, Partial<CityProfile>> = {
  Middlesex: {
    housingTypes: ['Colonial revivals', 'Cape Cod cottages', 'split-level ranches', 'Victorian-era homes', 'modern townhouses'],
    foundedEra: 'pre-Revolutionary to mid-20th century',
    avgHomeAge: '40-80 years',
    commonIssues: ['aging clapboard siding', 'single-pane windows from the 1960s', 'original wood trim rot', 'ice dam damage on older rooflines'],
    localFlavor: 'historic New England character with tree-lined streets',
  },
  Worcester: {
    housingTypes: ['Triple-decker homes', 'post-war ranches', 'raised ranches', 'colonials from the 1960s-1980s', 'farmhouse conversions'],
    foundedEra: 'industrial-era to late 20th century',
    avgHomeAge: '50-100 years',
    commonIssues: ['worn aluminum siding from the 1970s', 'drafty original windows', 'moisture damage from mill-town humidity', 'asbestos siding removal needs'],
    localFlavor: 'working-class roots with a mix of rural and suburban neighborhoods',
  },
  Norfolk: {
    housingTypes: ['Suburban colonials', 'Georgian-style estates', 'contemporary builds', 'antique farmhouses', 'condo developments'],
    foundedEra: 'colonial to modern',
    avgHomeAge: '30-70 years',
    commonIssues: ['faded vinyl siding needing replacement', 'energy-inefficient builder-grade windows', 'outdated entry doors reducing curb appeal', 'storm damage from nor\'easters'],
    localFlavor: 'affluent suburban communities with excellent school systems',
  },
  Essex: {
    housingTypes: ['Saltbox colonials', 'Federal-period homes', 'fishing-village cottages', 'seaside Victorians', 'newer suburban developments'],
    foundedEra: '17th century to present',
    avgHomeAge: '60-150+ years',
    commonIssues: ['salt air corrosion on exterior materials', 'coastal wind damage to siding', 'moisture infiltration from ocean storms', 'historic preservation requirements'],
    localFlavor: 'maritime heritage with coastal charm and strict historical commissions',
  },
  Suffolk: {
    housingTypes: ['Brownstone row houses', 'triple-decker apartments', 'brick townhouses', 'modern condos', 'converted warehouse lofts'],
    foundedEra: '18th-19th century urban core',
    avgHomeAge: '80-150+ years',
    commonIssues: ['crumbling brick pointing needing exterior updates', 'ancient single-pane windows losing heat', 'entry door security upgrades', 'noise reduction needs from city traffic'],
    localFlavor: 'dense urban neighborhoods with a mix of historic and modern architecture',
  },
  Plymouth: {
    housingTypes: ['Cranberry-country capes', 'waterfront cottages', 'suburban colonials', 'modular homes', 'new construction developments'],
    foundedEra: 'Pilgrim-era to modern development',
    avgHomeAge: '25-60 years',
    commonIssues: ['coastal humidity warping exterior materials', 'storm surge damage', 'builder-grade materials deteriorating early', 'crawl space moisture affecting walls'],
    localFlavor: 'historic coastal communities with expanding suburban development',
  },
  Bristol: {
    housingTypes: ['Mill worker cottages', 'Portuguese-style homes', 'modest colonials', 'multi-family dwellings', 'newer subdivisions'],
    foundedEra: 'industrial revolution to late 20th century',
    avgHomeAge: '50-120 years',
    commonIssues: ['deteriorating asbestos siding', 'original wood windows rotting', 'lead paint remediation needs', 'energy inefficiency in older housing stock'],
    localFlavor: 'industrial heritage communities with diverse cultural influences',
  },
  Hampden: {
    housingTypes: ['Springfield triple-deckers', 'Holyoke row houses', 'rural farmhouses', 'suburban ranches', 'bi-level homes'],
    foundedEra: '19th century industrial to post-war suburban',
    avgHomeAge: '60-120 years',
    commonIssues: ['severe winter weather damage', 'aging aluminum siding', 'tornado-zone reinforcement needs', 'basement moisture from Connecticut River Valley humidity'],
    localFlavor: 'Connecticut River Valley communities with four-season weather extremes',
  },
  Hampshire: {
    housingTypes: ['College-town Victorians', 'converted farms', 'eco-conscious new builds', 'antique colonials', 'faculty housing'],
    foundedEra: 'colonial to modern academic community',
    avgHomeAge: '40-200+ years',
    commonIssues: ['historic home renovation challenges', 'energy efficiency upgrades in old structures', 'Vermont-border climate severity', 'finding contractors who respect historic character'],
    localFlavor: 'academic and agricultural communities in the Pioneer Valley',
  },
  Barnstable: {
    housingTypes: ['Cape Cod style homes', 'shingle-style cottages', 'beach bungalows', 'summer colony houses', 'year-round colonials'],
    foundedEra: '17th century to modern resort development',
    avgHomeAge: '30-100+ years',
    commonIssues: ['extreme salt air damage', 'hurricane and nor\'easter vulnerability', 'sand erosion around foundations', 'seasonal home weatherization'],
    localFlavor: 'iconic Cape Cod communities with strict architectural guidelines',
  },
  Franklin: {
    housingTypes: ['Rural farmhouses', 'hilltop colonials', 'mobile homes', 'converted barns', 'modest ranches'],
    foundedEra: 'colonial rural to present',
    avgHomeAge: '50-200+ years',
    commonIssues: ['extreme cold exposure', 'long dirt-road approaches with wind exposure', 'limited contractor availability', 'wood rot from heavy snowpack'],
    localFlavor: 'rural hill towns with scenic beauty and self-reliant communities',
  },
  Berkshire: {
    housingTypes: ['Gilded Age mansions', 'ski-area chalets', 'mill-town duplexes', 'Berkshire cottages', 'converted school buildings'],
    foundedEra: 'colonial to Gilded Age resort era',
    avgHomeAge: '60-150+ years',
    commonIssues: ['mountain-altitude weather severity', 'heavy snow load stress on roofs and siding', 'old-growth wood rot', 'Taconic Range wind exposure'],
    localFlavor: 'cultural arts destination with mountain-influenced architecture',
  },
  Dukes: {
    housingTypes: ['Martha\'s Vineyard gingerbread cottages', 'cedar-shake colonials', 'beach houses', 'year-round farmhouses'],
    foundedEra: 'whaling era to present resort',
    avgHomeAge: '40-200+ years',
    commonIssues: ['extreme salt spray corrosion', 'limited material delivery logistics', 'historic district restrictions', 'hurricane preparedness'],
    localFlavor: 'island communities with unique architectural traditions and material challenges',
  },
  Nantucket: {
    housingTypes: ['Nantucket grey-shingle homes', 'whaling captain houses', 'historic district cottages', 'modern island builds'],
    foundedEra: '17th century whaling to modern',
    avgHomeAge: '50-300+ years',
    commonIssues: ['Historic District Commission requirements', 'extreme ocean exposure', 'limited contractor access', 'material shipping costs and delays'],
    localFlavor: 'America\'s most regulated historic district with strict material and color requirements',
  },
};

// Specific city profiles for the most important cities
const cityProfiles: Record<string, CityProfile> = {
  marlborough: {
    neighborhoods: ['East Marlborough', 'West Marlborough', 'Downtown', 'Millham', 'Ghiloni Park area', 'Ward Park neighborhood'],
    housingTypes: ['1950s-1970s colonials', 'condo developments on Rt 20', 'raised ranches near Lake Williams', 'newer construction off Bolton Street', 'historic Main Street buildings'],
    foundedEra: '1660, incorporated as city in 1890',
    avgHomeAge: '45-70 years',
    commonIssues: ['aging vinyl siding from original 1960s builds', 'single-pane aluminum windows losing heat', 'faded builders-grade doors', 'ice dam issues on older rooflines'],
    localFlavor: 'shoe manufacturing heritage city now a tech corridor along I-495',
  },
  framingham: {
    neighborhoods: ['Nobscot Village', 'Saxonville', 'Downtown Framingham', 'Framingham Centre', 'Cochituate', 'South Framingham'],
    housingTypes: ['Vintage colonials from the 1930s-1950s', 'ranch homes near Farm Pond', 'condos along Route 9', 'multi-family in South Framingham', 'newer builds in Nobscot'],
    foundedEra: '1700, became a city in 2018',
    avgHomeAge: '50-85 years',
    commonIssues: ['outdated asbestos-era siding on Saxonville homes', 'condensation problems in Nobscot area homes', 'drafty bay windows on vintage colonials', 'Route 9 traffic noise requiring sound-blocking windows'],
    localFlavor: 'recently transitioned from town to city, diverse Brazilian-American community',
  },
  natick: {
    neighborhoods: ['Natick Center', 'South Natick', 'East Natick', 'West Natick', 'Walnut Hill', 'Lilja School area'],
    housingTypes: ['Charming 1920s-1940s bungalows', 'post-war split-levels', 'lake cottages near Lake Cochituate', 'upscale new construction', 'historic South Natick colonials'],
    foundedEra: '1651, one of the oldest in Massachusetts',
    avgHomeAge: '55-90 years',
    commonIssues: ['lake-proximity moisture damage to siding', 'original wood windows in South Natick historic homes', 'energy loss in 1950s split-levels', 'preserving character while upgrading efficiency'],
    localFlavor: 'home to the famous Natick Mall and Boston Marathon heartbreak mile',
  },
  worcester: {
    neighborhoods: ['Main South', 'Burncoat', 'Greendale', 'Tatnuck Square', 'Indian Lake', 'College Hill', 'Vernon Hill', 'Quinsigamond Village'],
    housingTypes: ['Triple-decker homes throughout the city', 'Victorian-era houses on College Hill', 'post-war ranches in Burncoat', 'three-family investment properties', 'historic brick row homes'],
    foundedEra: '1722, second-largest city in New England',
    avgHomeAge: '70-130 years',
    commonIssues: ['triple-decker vinyl siding deterioration', 'century-old window frames rotting', 'lead paint under old siding', 'multi-family building code compliance', 'ice dam damage on flat-top triple-deckers'],
    localFlavor: 'Heart of the Commonwealth with a revitalizing downtown and diverse immigrant communities',
  },
  hudson: {
    neighborhoods: ['Downtown Hudson', 'Hudson Center', 'Lake Boon area', 'Gates Pond', 'Fort Meadow area', 'Chapin Road corridor'],
    housingTypes: ['Charming downtown worker cottages', '1960s suburban ranches', 'lakeside homes near Lake Boon', 'new construction on old farmland', 'converted shoe factory lofts'],
    foundedEra: '1866, former shoe manufacturing center',
    avgHomeAge: '50-90 years',
    commonIssues: ['lakeside humidity accelerating siding wear', 'original wood trim rotting on downtown cottages', 'single-pane windows in 1960s ranches', 'moisture issues in converted mill buildings'],
    localFlavor: 'revitalized downtown with trendy restaurants, craft breweries, and Main Street charm',
  },
  boston: {
    neighborhoods: ['Back Bay', 'South Boston', 'East Boston', 'Charlestown', 'Allston-Brighton', 'Dorchester', 'Jamaica Plain', 'Roslindale', 'West Roxbury', 'Hyde Park'],
    housingTypes: ['Victorian brownstones', 'triple-decker multi-families', 'row houses', 'brick townhouses', 'modern condos', 'converted warehouses'],
    foundedEra: '1630, capital and largest city',
    avgHomeAge: '80-180 years',
    commonIssues: ['historic brownstone exterior restoration', 'bay window replacements in Victorian homes', 'triple-decker siding for rental properties', 'city permitting complexity', 'noise and energy efficiency in dense housing'],
    localFlavor: 'America\'s walking city with strict historical preservation in many neighborhoods',
  },
  newton: {
    neighborhoods: ['Newton Centre', 'Newton Corner', 'Chestnut Hill', 'Auburndale', 'Waban', 'West Newton', 'Newton Highlands', 'Nonantum'],
    housingTypes: ['Grand Victorian estates', 'Tudor revivals', 'mid-century moderns', 'colonials from every era', 'luxury new construction'],
    foundedEra: '1688, Garden City',
    avgHomeAge: '60-120 years',
    commonIssues: ['updating historic homes without losing character', 'energy efficiency in Victorian-era buildings', 'matching replacement windows to original architecture', 'premium finishes expected in high-value neighborhoods'],
    localFlavor: 'one of the wealthiest cities in MA, known as "The Garden City" with 13 distinct villages',
  },
  cambridge: {
    neighborhoods: ['Harvard Square', 'Porter Square', 'Central Square', 'Inman Square', 'Kendall Square', 'East Cambridge', 'Cambridgeport', 'Mid-Cambridge'],
    housingTypes: ['Victorian multi-families', 'triple-deckers', 'Harvard faculty homes', 'modern condo conversions', 'row houses', 'mixed-use buildings'],
    foundedEra: '1630, home to Harvard and MIT',
    avgHomeAge: '80-150 years',
    commonIssues: ['historic district compliance', 'university-area rental property upgrades', 'noise reduction near busy squares', 'Victorian window restoration vs. replacement decisions', 'tight lot access for construction equipment'],
    localFlavor: 'world-renowned academic city with Cambridge Historical Commission oversight on many projects',
  },
  lexington: {
    neighborhoods: ['Lexington Center', 'East Lexington', 'Follen Hill', 'Meriam Hill', 'Moon Hill', 'Five Fields'],
    housingTypes: ['Historic Revolutionary-era homes', 'mid-century modern masterpieces', 'classic colonials', 'architect-designed contemporary homes', 'Eichler-inspired ranches in Moon Hill'],
    foundedEra: '1713, birthplace of American Revolution',
    avgHomeAge: '50-250+ years',
    commonIssues: ['strict historic district regulations near Battle Green', 'matching period-appropriate windows and doors', 'mid-century modern homes needing updated insulation', 'preserving architectural character during upgrades'],
    localFlavor: 'historic Revolutionary War town with some of the best schools in Massachusetts',
  },
  wellesley: {
    neighborhoods: ['Wellesley Hills', 'Wellesley Farms', 'Wellesley Square', 'Babson Park', 'Cliff Estates', 'Dana Hall area'],
    housingTypes: ['Tudor and Georgian estates', 'classic New England colonials', 'luxury contemporary builds', 'Wellesley College area homes', 'Stone Manor neighborhood mansions'],
    foundedEra: '1881, premier residential community',
    avgHomeAge: '55-100+ years',
    commonIssues: ['high-end material expectations (no basic vinyl)', 'custom color matching for estate homes', 'oversized window replacements in grand homes', 'landscaping protection during installations', 'HOA and historical society approvals'],
    localFlavor: 'one of Boston\'s most prestigious suburbs with Wellesley College and high property values',
  },
  sudbury: {
    neighborhoods: ['Sudbury Center', 'South Sudbury', 'North Sudbury', 'Willis Hill', 'Wayside Inn area'],
    housingTypes: ['Classic New England colonials', 'horse-property estates', '1960s-1970s subdivisions', 'antique farmhouses', 'luxury new construction on 2+ acre lots'],
    foundedEra: '1639, one of the oldest inland towns',
    avgHomeAge: '45-100+ years',
    commonIssues: ['large homes requiring extensive siding coverage', 'well water staining on exterior surfaces', 'wooded lots causing moss and mildew on siding', 'historic Wayside Inn area preservation'],
    localFlavor: 'rural-feeling suburb with Longfellow\'s Wayside Inn, large lots, and horse country charm',
  },
  hopkinton: {
    neighborhoods: ['Hopkinton Center', 'Woodville', 'East Hopkinton', 'Conant Corner', 'Lake Maspenock area'],
    housingTypes: ['Upscale colonials from the 1990s-2000s', 'older center-of-town homes', 'lakeside properties', 'executive estates', 'new-construction developments'],
    foundedEra: '1715, start of the Boston Marathon',
    avgHomeAge: '25-60 years',
    commonIssues: ['builder-grade siding failing after 20-25 years', 'original windows in 1990s homes losing efficiency', 'lake-proximity moisture issues', 'upgrading from basic materials to premium options'],
    localFlavor: 'famous as the official starting point of the Boston Marathon, rapidly growing upscale community',
  },
};
// ============================================================
// DETERMINISTIC VARIATION
//
// Every text slot draws from its own pool using its own seed, so two
// cities that happen to collide on one slot still diverge on the rest.
// A page composes ~14 independently-seeded slots; the odds of two pages
// landing on the same combination are negligible.
// ============================================================

function seedHash(seed: string): number {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return Math.abs(h | 0);
}

function pick<T>(pool: T[], seed: string): T {
  return pool[seedHash(seed) % pool.length];
}

/** Deterministic shuffle-and-take, so a page gets N *different* items. */
function pickN<T>(pool: T[], seed: string, n: number): T[] {
  const idx = pool.map((_, i) => i);
  let h = seedHash(seed) || 1;
  for (let i = idx.length - 1; i > 0; i--) {
    h = (Math.imul(h, 48271) + 11) >>> 0;
    const j = h % (i + 1);
    const t = idx[i];
    idx[i] = idx[j];
    idx[j] = t;
  }
  return idx.slice(0, Math.min(n, pool.length)).map((i) => pool[i]);
}

// ============================================================
// DERIVED GEOGRAPHY — real facts we already hold per city
// ============================================================

type Exposure = 'coastal' | 'valley' | 'hills' | 'metro' | 'inland';

const countyExposure: Record<string, Exposure> = {
  Essex: 'coastal',
  Barnstable: 'coastal',
  Plymouth: 'coastal',
  Dukes: 'coastal',
  Nantucket: 'coastal',
  Bristol: 'coastal',
  Hampden: 'valley',
  Hampshire: 'valley',
  Franklin: 'valley',
  Berkshire: 'hills',
  Suffolk: 'metro',
  Middlesex: 'inland',
  Worcester: 'inland',
  Norfolk: 'inland',
};

function exposureOf(city: City): Exposure {
  return countyExposure[city.county] || 'inland';
}

/** Honest drive-time band from the Charlton shop. */
function driveBand(distance: number): string {
  if (distance <= 8) return 'a short drive';
  if (distance <= 15) return 'about twenty minutes';
  if (distance <= 25) return 'roughly half an hour';
  if (distance <= 40) return 'under an hour';
  return 'a planned trip';
}

const exposureNotes: Record<Exposure, string[]> = {
  coastal: [
    'salt-laden air that strips coatings and pits fasteners years earlier than inland weather does',
    'wind-driven rain off the water, which finds any seam that was cut short',
    'nor\'easters that load a wall with water and wind from the same direction for hours',
    'the freeze-thaw cycle running on top of constant salt exposure, which is harder on trim than on the field of a wall',
  ],
  valley: [
    'Connecticut River Valley humidity that keeps sheathing damp long after the rain stops',
    'a wider annual temperature swing than the coast sees, which works fasteners loose over time',
    'heavy summer storm activity followed by hard winter cold',
    'valley fog that slows drying and rewards a properly vented wall assembly',
  ],
  hills: [
    'snow load and wind exposure that come with elevation',
    'longer winters and a shorter installation season than the eastern half of the state',
    'wind funnelled along ridgelines, which is hard on soffit and fascia',
    'deep snowpack sitting against the lower courses of a wall for months',
  ],
  metro: [
    'tight lot lines and staging constraints that shape how a crew can work',
    'street-facing walls that take exhaust and grit as well as weather',
    'older masonry and wood assemblies sitting side by side on the same block',
    'noise and traffic that make sealed, well-fitted openings worth more than they are elsewhere',
  ],
  inland: [
    'the full New England temperature range, from below zero in January to the low nineties in July',
    'ice dams forming at the eaves and pushing water back into the wall',
    'freeze-thaw cycling that opens any joint left unsealed',
    'wet spring seasons followed by dry, hot stretches that move wood trim',
  ],
};

// ============================================================
// SERVICE DEFINITIONS
// ============================================================

interface ServiceContent {
  intro: string;
  challenges: string[];
  solutions: string[];
  processSteps: { name: string; description: string }[];
  costRange: string;
  timeline: string;
  warranty: string;
}

interface ServiceDef {
  slug: string;
  /** Noun phrase used mid-sentence, e.g. "siding installation". */
  work: string;
  /** Short noun, e.g. "siding". */
  thing: string;
  /** Title-case service name for headings and titles. */
  label: string;
  costRange: string;
  timelines: string[];
  warranties: string[];
  materials: string[];
  brands: string[];
  challenges: string[];
  solutions: string[];
  steps: { name: string; descriptions: string[] }[];
  checklist: string[];
}

const SERVICES: Record<string, ServiceDef> = {
  siding: {
    slug: 'siding',
    work: 'siding installation',
    thing: 'siding',
    label: 'Siding Contractor',
    costRange: '$12,000–$28,000 for a typical single-family exterior',
    timelines: [
      '5 to 9 working days once materials are on site',
      'a little over a week for an average two-storey home',
      'roughly one to two weeks depending on trim detail',
      'about a week, longer where the trim work is intricate',
      'seven to ten days on site, weather permitting',
    ],
    warranties: [
      'a 25 to 50 year manufacturer warranty on the material and 5 years on our labour',
      'manufacturer coverage of 25–50 years, backed by our own 5-year workmanship warranty',
      'material warranties up to 50 years and a 5-year guarantee on the installation itself',
    ],
    materials: ['insulated vinyl', 'James Hardie fiber cement', 'engineered wood', 'cedar shingle', 'premium double-4 vinyl'],
    brands: ['James Hardie', 'CertainTeed', 'Alside'],
    challenges: [
      'original siding that has gone brittle and no longer holds a fastener',
      'wall sheathing that has taken on water behind a failed housewrap',
      'trim and fascia rot that only becomes visible once the old siding comes off',
      'previous work installed too tight, leaving the material no room to move',
      'asbestos-cement siding that has to be handled and disposed of correctly',
      'mismatched patch repairs from earlier partial jobs',
      'nail heads driven through the nailing hem, which locks a course in place until it buckles',
      'a wall that was furred out unevenly, so the new courses telegraph every dip',
    ],
    solutions: [
      'full tear-off down to the sheathing so nothing rotten stays hidden behind new material',
      'a drainable housewrap and taped seams, so any water that gets past the cladding has a way out',
      'rot repair priced honestly once the wall is open, not guessed at beforehand',
      'correct fastener spacing and expansion gaps, which is what keeps a wall flat in year ten',
      'insulated backing where the wall assembly can take it, for a real gain in comfort',
      'kick-out flashing where the roofline meets a wall, which is where most hidden rot starts',
      'furring to a straight plane first, so the finished wall reads flat in low sun',
      'colour and profile chosen against the roof and trim rather than off a chart',
    ],
    steps: [
      {
        name: 'Walk the exterior with you',
        descriptions: [
          'We look at every elevation, note the trim details worth keeping, and tell you what we expect to find behind the old material.',
          'We measure, photograph each elevation, and check the condition of trim, soffit and fascia before quoting anything.',
          'We start at the worst corner. What the failure looks like there usually tells us what the rest of the wall is doing.',
        ],
      },
      {
        name: 'Written scope and fixed price',
        descriptions: [
          'Materials, colours, trim profiles and the rot-repair rate are all in writing before anything is ordered.',
          'One document with the full scope, the material spec and an agreed rate for hidden damage. No verbal extras.',
          'You get a fixed price for the known work and a stated rate for anything we uncover, so nothing is renegotiated mid-job.',
        ],
      },
      {
        name: 'Permit and scheduling',
        descriptions: [
          'We file with your building department and give you a start date we can actually hold.',
          'Permits filed by us, and a start date set against the material lead time rather than ahead of it.',
          'We handle the filing and book the inspection slots before the crew is scheduled.',
        ],
      },
      {
        name: 'Protection and tear-off',
        descriptions: [
          'Landscaping covered, windows protected, then the old material comes off.',
          'Old siding comes off, the sheathing gets inspected, and you see anything we find before we cover it back up.',
          'Beds and walkways covered, a container on site rather than a pile on the lawn, then the tear-off starts.',
        ],
      },
      {
        name: 'Weather barrier and flashing',
        descriptions: [
          'Housewrap, taped seams, and flashing at every opening and transition.',
          'Any rot or water damage is repaired and documented with photos, then the drainage plane goes on.',
          'Sheathing repairs first, then drainable wrap, then flashing lapped in the order water actually travels.',
        ],
      },
      {
        name: 'Installation, inspection and cleanup',
        descriptions: [
          'Field courses, corners and trim with the expansion gaps the manufacturer specifies, then a magnet sweep and a walk with you.',
          'Installation to manufacturer spec, municipal inspection, then a full site cleanup before we invoice.',
          'Courses run to spec, the inspector signs off, and we sweep for fasteners before the final walkthrough.',
        ],
      },
    ],
    checklist: [
      'Insulated vinyl siding (CertainTeed, Alside)',
      'James Hardie fiber cement installation',
      'Engineered wood and cedar shingle',
      'Complete tear-off and disposal',
      'Sheathing and rot repair',
      'Trim, soffit and fascia',
      'Drainable housewrap and flashing',
      'Colour matching for partial elevations',
    ],
  },

  windows: {
    slug: 'windows',
    work: 'window replacement',
    thing: 'windows',
    label: 'Window Replacement',
    costRange: '$650–$1,400 per opening installed, depending on size and frame',
    timelines: [
      'one to three days for a typical whole-house replacement',
      'a single day for a handful of openings, two to three for a full house',
      'two days on average, with larger or custom units taking longer',
      'usually finished inside a week, most of it in the first two days',
      'one day per eight to ten openings once the units are on site',
    ],
    warranties: [
      'a limited lifetime manufacturer warranty on the units and 5 years on our labour',
      'lifetime glass and frame coverage from the manufacturer, plus our 5-year workmanship warranty',
      'manufacturer coverage on glass seals and hardware, backed by our own 5-year guarantee',
    ],
    materials: ['vinyl double-hung', 'fiberglass casement', 'wood-clad', 'triple-pane vinyl', 'composite frame'],
    brands: ['Andersen', 'Harvey', 'Pella'],
    challenges: [
      'original single-pane sashes with failed glazing putty and no weatherstripping left',
      'rotted sills under windows that were flashed poorly the first time',
      'out-of-square openings in older homes, where a stock unit will never seal properly',
      'double-pane units from the nineties with blown seals and permanent fogging',
      'lead paint on original trim, which changes how the opening has to be handled',
      'storm windows hiding how far gone the primary sash actually is',
      'bedroom openings that no longer meet egress once a smaller insert is fitted',
      'sash cords and weight pockets that were foamed solid by a previous installer',
    ],
    solutions: [
      'full-frame replacement where the sill or jamb is compromised, rather than hiding it behind an insert',
      'custom-sized units for out-of-square openings, so the seal is even all the way round',
      'Low-E coatings and argon fill matched to which way the wall faces',
      'proper sill pan flashing, which is the detail that decides whether the opening leaks in ten years',
      'insert replacement where the existing frame is sound, to keep the interior trim intact',
      'egress-compliant sizing on bedroom openings, checked against the current code rather than assumed',
      'low-expansion foam only, so the jambs are not bowed inward before the first winter',
      'weight pockets insulated properly once the cords are gone, which is where a lot of the draft was',
    ],
    steps: [
      {
        name: 'Measure every opening',
        descriptions: [
          'Each one individually — in an older home no two are quite the same.',
          'We open and close every window in the house and tell you which ones actually need replacing.',
          'Every opening measured at three points. Older frames are rarely square, and averaging the difference is how units end up out of seal.',
        ],
      },
      {
        name: 'Choose glass and frame',
        descriptions: [
          'We match the coating and fill to the orientation of each wall rather than specifying one unit for the whole house.',
          'Frame material, glass coating and gas fill chosen per elevation, since a south wall and a north wall want different things.',
          'Samples on site, and a straight answer about where triple-pane earns its cost and where it does not.',
        ],
      },
      {
        name: 'Written quote and permit',
        descriptions: [
          'Priced individually, so you can phase the work if you would rather do it in stages.',
          'Filed with your building department, including egress compliance for bedrooms.',
          'A price per opening and the permit filed by us, with egress checked before anything is ordered.',
        ],
      },
      {
        name: 'Protected removal',
        descriptions: [
          'Interior floors and furniture covered; one opening is closed up before the next is opened.',
          'Old units out, sills and jambs checked for rot before anything new goes in.',
          'We work opening by opening so the house is never left open, and the interior stays covered throughout.',
        ],
      },
      {
        name: 'Set, flash and air-seal',
        descriptions: [
          'Sill pan, low-expansion foam, and flashing tape lapped in the right order.',
          'Units set level and square, then air-sealed and flashed to manufacturer spec.',
          'Shimmed at the load points, foamed with low-expansion only, and flashed so water sheds outward.',
        ],
      },
      {
        name: 'Trim, inspection and handover',
        descriptions: [
          'Interior and exterior trim restored, hardware adjusted, and every unit operated with you.',
          'Municipal inspection, then we show you how each unit operates and cleans.',
          'Trim finished, every sash operated and adjusted, and the inspector signed off before we invoice.',
        ],
      },
    ],
    checklist: [
      'ENERGY STAR double and triple-pane units',
      'Full-frame and insert replacement',
      'Custom sizing for out-of-square openings',
      'Bedroom egress compliance',
      'Bay, bow and picture windows',
      'Casement, awning and double-hung',
      'Sill pan flashing and air sealing',
      'Interior and exterior trim restoration',
    ],
  },

  doors: {
    slug: 'doors',
    work: 'door installation',
    thing: 'doors',
    label: 'Door Installation',
    costRange: '$1,800–$5,500 installed, depending on the unit and the opening',
    timelines: [
      'a single day for most entry doors',
      'one day per opening, occasionally two where the framing needs work',
      'a day for a straightforward swap, longer if the opening has to be rebuilt',
      'usually one day, including trim and hardware',
      'one working day, and we never leave an opening unsecured overnight',
    ],
    warranties: [
      'a limited lifetime manufacturer warranty on the slab and 5 years on our labour',
      'manufacturer coverage on the unit and finish, plus our 5-year workmanship warranty',
      'lifetime coverage on fiberglass slabs, backed by our own 5-year guarantee',
    ],
    materials: ['fiberglass entry', 'insulated steel', 'sliding patio', 'French swing', 'solid wood'],
    brands: ['Therma-Tru', 'ProVia', 'Andersen'],
    challenges: [
      'a rotted sill and threshold under a door that was never flashed properly',
      'settled framing that leaves the opening out of square, so the door never latches cleanly',
      'original wood units that swell shut in July and let daylight through in January',
      'sliding patio doors running on worn tracks that no adjustment will fix',
      'storm doors fitted over units that should have been replaced years earlier',
      'weatherstripping compressed flat, which is usually where the draft is coming from',
      'a slab that was planed to fit a racked opening, so it can never be rehung square',
      'hinge screws pulled out of soft jamb material, taking the door out of alignment',
    ],
    solutions: [
      'rebuilding the opening square before the new unit goes in, rather than shimming around the problem',
      'a properly flashed sill pan under the threshold, which is what stops the rot coming back',
      'multi-point locking hardware on taller units, so the slab stays sealed along its full height',
      'fiberglass slabs where the opening takes weather, since they hold their shape through the season',
      'adjustable thresholds set to your actual floor height for a clean sweep seal',
      'long screws into the framing at the hinge points, not just into the jamb',
      'an overhang or storm unit where the entry has no protection at all',
      'a sill pitched to drain outward, which sounds obvious and is skipped constantly',
    ],
    steps: [
      {
        name: 'Assess the opening',
        descriptions: [
          'We check the framing, sill and threshold for rot and square before quoting anything.',
          'We open and close the existing door, check the daylight around the seal, and measure the opening.',
          'We look at where the draft actually is. Often the slab is fine and the opening is not.',
        ],
      },
      {
        name: 'Select the unit',
        descriptions: [
          'Slab material, glass, finish and hardware, chosen for how exposed the entry actually is.',
          'Sidelights, transoms, decorative glass and lock type, with samples on site.',
          'We steer material by exposure: a covered entry and a west-facing one are not the same problem.',
        ],
      },
      {
        name: 'Order to the real opening',
        descriptions: [
          'Units are ordered to the real opening, not the nominal one.',
          'Ordered to measured dimensions, with the swing and hinge side confirmed in writing.',
          'We order to what we measured. Nominal sizing is how doors end up shimmed into place.',
        ],
      },
      {
        name: 'Remove and repair',
        descriptions: [
          'Old unit out, framing and sill repaired where needed and shown to you.',
          'Interior protected, old unit removed, and the opening inspected in daylight.',
          'Anything rotten in the sill or jamb is cut out and replaced before the new unit is offered up.',
        ],
      },
      {
        name: 'Set, flash and seal',
        descriptions: [
          'Sill pan, shims at the hinge points, and flashing lapped over the housewrap.',
          'Unit set plumb and square, foamed, flashed and weatherstripped.',
          'Pan flashing first, then the unit set plumb and fixed through to framing rather than jamb alone.',
        ],
      },
      {
        name: 'Hardware, adjustment and handover',
        descriptions: [
          'Locks fitted, sweep adjusted, trim finished, and the door operated with you.',
          'Latch, sweep and hinges adjusted, keys handed over, debris removed.',
          'We set the sweep against your actual floor, cycle the lock, and leave you the keys and the warranty document.',
        ],
      },
    ],
    checklist: [
      'Fiberglass entry doors (Therma-Tru, ProVia)',
      'Insulated steel security doors',
      'Sliding and French patio doors',
      'Storm doors with retractable screens',
      'Sidelight and transom configurations',
      'Sill pan flashing and threshold repair',
      'Multi-point and smart lock hardware',
      'Framing repair for out-of-square openings',
    ],
  },

  'general-contractor': {
    slug: 'general-contractor',
    work: 'exterior contracting',
    thing: 'exterior work',
    label: 'General Contractor',
    costRange: '$18,000–$60,000 for a combined exterior package',
    timelines: [
      'two to four weeks for a combined siding, window and door package',
      'three weeks on average when several trades are sequenced together',
      'two to five weeks depending on how much of the exterior is in scope',
      'a few weeks, planned around the weather window',
      'three to four weeks end to end, including inspection slots',
    ],
    warranties: [
      'manufacturer warranties on every material plus a single 5-year workmanship warranty covering the whole package',
      'material coverage from each manufacturer and one 5-year guarantee across the entire project',
      'a 5-year workmanship warranty on all of it, with manufacturer coverage on top',
    ],
    materials: [
      'siding, window and door packages',
      'full-exterior envelope work',
      'trim, soffit and fascia systems',
      'porch and entry rebuilds',
    ],
    brands: ['James Hardie', 'Andersen', 'Therma-Tru'],
    challenges: [
      'work that was quoted by three separate trades who each assumed someone else was handling the flashing',
      'a rebuild that stalls because nobody sequenced the permit against the material lead time',
      'water damage that spans siding, trim and window openings and cannot sensibly be split up',
      'earlier partial repairs that now have to be tied back into a whole elevation',
      'exterior scope that grows once the walls are open, with no agreed rate for the extra',
      'a schedule where the siding crew arrives before the windows do',
      'two warranties that each point at the other when something leaks',
    ],
    solutions: [
      'one contract and one crew across the whole exterior, so no detail falls between trades',
      'permits filed and inspections scheduled by us, in the right order against the material lead times',
      'an agreed rate for hidden damage written into the contract before we start',
      'siding, windows and doors sequenced so each is flashed into the next correctly',
      'a single point of contact from the first walkthrough to the final inspection',
      'one warranty document covering the whole package, so there is nobody to point at',
      'staging planned around your access, not around whichever crew arrives first',
      'materials ordered against the schedule rather than after the crew is booked',
    ],
    steps: [
      {
        name: 'Full exterior walkthrough',
        descriptions: [
          'Every elevation assessed together, so the scope is set as one job rather than three.',
          'We take the whole exterior in one pass and tell you what has to be done together and what can wait.',
          'One walkthrough covering siding, openings and trim, because splitting them is where flashing details get lost.',
        ],
      },
      {
        name: 'One written contract',
        descriptions: [
          'All trades, materials and the hidden-damage rate in a single document.',
          'A single scope, a single price, and an agreed rate for whatever the walls are hiding.',
          'One contract covering everything, so there is no gap between quotes for something to fall through.',
        ],
      },
      {
        name: 'Permits and sequencing',
        descriptions: [
          'We file everything and order materials against the schedule, not after it.',
          'Permits filed and inspection slots booked before the crew is scheduled.',
          'The order of work is set against material lead times, which is what stops a job stalling half-open.',
        ],
      },
      {
        name: 'Staged execution',
        descriptions: [
          'Openings, then envelope, then trim — each flashed into the next in the correct order.',
          'Windows and doors first, then the wall, then the trim, so every lap sheds water outward.',
          'Each stage closes properly before the next starts. The house is never left open between phases.',
        ],
      },
      {
        name: 'Inspections',
        descriptions: [
          'We meet the inspector at each stage; you do not need to be there.',
          'Inspections booked and attended by us, with the paperwork handed to you at the end.',
          'We are on site for every inspection, so a failed detail is corrected the same day.',
        ],
      },
      {
        name: 'Handover and warranty',
        descriptions: [
          'One handover, one warranty document covering the whole package.',
          'A single walkthrough at the end and one warranty covering every part of the work.',
          'You get one document, one number to call, and no argument about which trade owns a problem.',
        ],
      },
    ],
    checklist: [
      'Combined siding, window and door packages',
      'Full exterior envelope renovation',
      'Trim, soffit and fascia systems',
      'Porch, entry and portico rebuilds',
      'Structural repair of exterior walls',
      'Permit management and inspections',
      'Single-contract project coordination',
      'Insurance claim documentation',
    ],
  },
};

function serviceDef(slug: string): ServiceDef {
  return SERVICES[slug] || SERVICES.siding;
}

// ============================================================
// PUBLIC API
// ============================================================

export function getCityProfile(city: City): CityProfile {
  if (cityProfiles[city.slug]) {
    return cityProfiles[city.slug];
  }

  const countyProfile = countyProfiles[city.county] || countyProfiles['Middlesex'];

  // Without a hand-written profile we do not invent neighbourhood names.
  // Compass sectors are honest: they describe the city without asserting
  // places that may not exist.
  const genericNeighborhoods = [
    `${city.name} Center`,
    `North ${city.name}`,
    `South ${city.name}`,
    `East ${city.name}`,
    `West ${city.name}`,
  ];

  return {
    neighborhoods: genericNeighborhoods,
    housingTypes: countyProfile.housingTypes || ['colonials', 'ranches', 'capes', 'split-levels', 'contemporary homes'],
    foundedEra: countyProfile.foundedEra || 'colonial to modern',
    avgHomeAge: countyProfile.avgHomeAge || '40-80 years',
    commonIssues: countyProfile.commonIssues || ['aging exterior materials', 'energy inefficiency', 'storm damage', 'curb appeal concerns'],
    localFlavor: countyProfile.localFlavor || 'classic New England community',
  };
}

export function getServiceContent(serviceSlug: string, city: City): ServiceContent {
  const profile = getCityProfile(city);
  const def = serviceDef(serviceSlug);
  const key = `${city.slug}|${serviceSlug}`;
  const exposure = exposureOf(city);

  const challenges = pickN(def.challenges, `${key}|chal`, 3);
  const localIssue = pick(profile.commonIssues, `${key}|issue`);

  return {
    intro: buildIntro(city, def, profile, exposure),
    challenges: [...challenges, localIssue],
    solutions: pickN(def.solutions, `${key}|sol`, 3),
    // Each stage picks its own wording, so the process section varies
    // stage-by-stage rather than as one of two fixed blocks.
    processSteps: def.steps.map((step, i) => ({
      name: step.name,
      description: pick(step.descriptions, `${key}|step${i}`),
    })),
    costRange: def.costRange,
    timeline: pick(def.timelines, `${key}|time`),
    warranty: pick(def.warranties, `${key}|warr`),
  };
}

function buildIntro(city: City, def: ServiceDef, profile: CityProfile, exposure: Exposure): string {
  const key = `${city.slug}|${def.slug}`;
  const openings = [
    `Most ${def.thing} work we do in ${city.name} starts the same way: a homeowner has noticed something they cannot quite diagnose.`,
    `${city.name} sits ${city.distance} miles from our shop in Charlton, which is close enough that we see the same patterns in its housing stock again and again.`,
    `If you are weighing ${def.work} on a ${city.name} home, the housing stock here narrows the sensible options considerably.`,
    `We have worked on enough ${city.name} exteriors to know what tends to be waiting behind the old material.`,
    `The right approach to ${def.work} in ${city.name} depends less on brand choice than on what the wall behind it is doing.`,
  ];
  const context = [
    `Housing here runs to ${profile.housingTypes[0].toLowerCase()} and ${profile.housingTypes[1].toLowerCase()}, much of it ${profile.avgHomeAge} old.`,
    `The stock dates from ${profile.foundedEra}, so ${profile.avgHomeAge}-old assemblies are the norm rather than the exception.`,
    `${city.name} is ${profile.localFlavor}, and its ${profile.housingTypes[0].toLowerCase()} share a fairly predictable set of exterior problems.`,
    `Between ${profile.housingTypes[0].toLowerCase()} and ${profile.housingTypes[1].toLowerCase()}, most of what we open up here is ${profile.avgHomeAge} old.`,
  ];
  const climate = [
    `On top of that, ${city.county} County deals with ${pick(exposureNotes[exposure], `${key}|exp1`)}.`,
    `Add ${pick(exposureNotes[exposure], `${key}|exp2`)}, and the details that matter become obvious.`,
    `What makes it harder here is ${pick(exposureNotes[exposure], `${key}|exp3`)}.`,
  ];

  return [
    pick(openings, `${key}|open`),
    pick(context, `${key}|ctx`),
    pick(climate, `${key}|clim`),
  ].join(' ');
}

// ------------------------------------------------------------
// FAQs — the question set itself varies, not just the city name
// ------------------------------------------------------------

export function getUniqueFAQs(serviceSlug: string, city: City): { question: string; answer: string }[] {
  const profile = getCityProfile(city);
  const def = serviceDef(serviceSlug);
  const content = getServiceContent(serviceSlug, city);
  const key = `${city.slug}|${serviceSlug}`;
  const exposure = exposureOf(city);
  const nbhd = pickN(profile.neighborhoods, `${key}|nb`, 3).join(', ');

  const bank: { question: string; answer: string }[] = [
    {
      question: `What does ${def.work} cost in ${city.name}?`,
      answer: `Our ${city.name} projects generally land at ${def.costRange}. The spread comes down to size, material and what we find once the old work comes off — which is why our written quote includes an agreed rate for hidden damage rather than a guess. Estimates are free and we do not price on the doorstep.`,
    },
    {
      question: `How long will ${def.work} take on my ${city.name} home?`,
      answer: `Plan on ${content.timeline}. ${city.county} County weather does move schedules — ${pick(exposureNotes[exposure], `${key}|faqw`)} is the usual reason — so we build a weather margin into the date we give you rather than promising one we cannot hold.`,
    },
    {
      question: `Do you pull the permits, or do I?`,
      answer: pick([
        `We do. We file with the ${city.name} building department, schedule the inspections and meet the inspector on site. As a Massachusetts Home Improvement Contractor (HIC #${HIC_NUMBER}) that is our responsibility, not yours.`,
        `We handle it. Filing with ${city.name}, booking the inspection slots and being there when the inspector arrives are all ours under HIC #${HIC_NUMBER}. You should not be chasing paperwork for work you are paying for.`,
        `That is on us. We pull the permit from ${city.name}, sequence the inspections around the work, and attend them. A contractor who asks you to pull your own permit is telling you something.`,
      ], `${key}|faq-permit`),
    },
    {
      question: `What usually goes wrong with ${def.thing} on homes in ${city.name}?`,
      answer: `The three we see most often here: ${content.challenges[0]}; ${content.challenges[1]}; and ${content.challenges[2]}. Locally, ${profile.commonIssues[0]} comes up repeatedly on ${profile.housingTypes[0].toLowerCase()}.`,
    },
    {
      question: `Are you actually local to ${city.name}?`,
      answer: `We work out of Charlton, ${city.distance} miles away — ${driveBand(city.distance)}. That matters mostly for the unglamorous parts: getting back out for a warranty call, or being on site when the inspector is.`,
    },
    {
      question: `Which ${def.thing} do you install?`,
      answer: `We work mainly in ${pickN(def.materials, `${key}|mat`, 3).join(', ')}, and we are certified installers for ${def.brands.join(', ')}. Which of those makes sense for your ${city.name} home depends on exposure and budget, and we will tell you when the cheaper option is the right one.`,
    },
    {
      question: `What warranty comes with the work?`,
      answer: `You get ${content.warranty}. Both are in writing at handover. The workmanship warranty is ours, not a third party's, and it is the one that actually gets used.`,
    },
    {
      question: `Do you use subcontractors?`,
      answer: pick([
        `No. The crew on your ${city.name} home is our own. It is the main reason we can hold a schedule and the main reason the same people who started your job are the ones who finish it.`,
        `We do not. Every crew is on our payroll, which is why the standard does not drop between the first elevation and the last, and why you are not meeting new faces halfway through.`,
        `No — our own people, start to finish. Subcontracting is how a schedule slips and how nobody ends up owning a defect.`,
      ], `${key}|faq-subs`),
    },
    {
      question: `Can you match existing work on part of the house?`,
      answer: `Sometimes. On a ${profile.housingTypes[0].toLowerCase()} we can often match a single elevation closely enough that it reads as original. Where the existing material has faded past matching, we will say so rather than sell you a repair you will be unhappy with.`,
    },
    {
      question: `What parts of ${city.name} do you cover?`,
      answer: `All of it, including ${nbhd} and the rest of ZIP ${city.zip}. We also work throughout ${city.county} County.`,
    },
    {
      question: `What happens if you find rot once you have started?`,
      answer: pick([
        `We stop, photograph it and show you before covering anything back up. The repair rate is agreed in the contract before we start, so there is no renegotiation with your wall open.`,
        `You see it before we cover it. The rate for hidden damage is written into the contract up front, precisely so nobody is negotiating while the house is open.`,
        `It gets photographed and shown to you the same day. Because the repair rate is already agreed, finding rot changes the invoice by a known amount rather than an argued one.`,
      ], `${key}|faq-rot`),
    },
    {
      question: `How do you handle the site during the job?`,
      answer: pick([
        `Landscaping gets covered, debris goes in a container rather than on your lawn, and we sweep for fasteners with a magnet at the end of each day. On a ${city.name} lot that is usually the difference between a tolerable two weeks and a miserable one.`,
        `Beds and walkways are covered before anything comes off the wall, there is a container on site from day one, and we magnet-sweep every evening. It matters more than people expect on a tight ${city.name} lot.`,
        `We protect the planting, keep the debris contained, and sweep for nails daily. You will still know there is a crew here, but you will be able to park and walk the garden.`,
      ], `${key}|faq-site`),
    },
  ];

  // Six questions per page, drawn in a city-specific order.
  return pickN(bank, `${key}|faqset`, 6);
}

// ------------------------------------------------------------
// Metadata
// ------------------------------------------------------------

export function getUniqueMetaDescription(serviceSlug: string, city: City): string {
  const profile = getCityProfile(city);
  const def = serviceDef(serviceSlug);
  const key = `${city.slug}|${serviceSlug}`;

  const variants = [
    `${def.label} in ${city.name}, MA. Licensed HIC #${HIC_NUMBER}, own crews, ${def.costRange.split(' for ')[0]} typical. Free written estimate — ${PHONE}.`,
    `${def.work.charAt(0).toUpperCase() + def.work.slice(1)} for ${city.name} homes, ${city.distance} miles from our Charlton shop. ${profile.commonIssues[0].charAt(0).toUpperCase() + profile.commonIssues[0].slice(1)}? That is what we do. Call ${PHONE}.`,
    `${city.name} ${def.thing} specialists. Certified for ${def.brands[0]} and ${def.brands[1]}, licensed HIC #${HIC_NUMBER}, 5-year workmanship warranty. Free estimate — ${PHONE}.`,
    `${def.label} serving ${city.name} and ${city.county} County. Own crews, permits handled, written pricing before we start. Call ${PHONE} for a free assessment.`,
    `Exterior ${def.thing} work on ${profile.housingTypes[0].toLowerCase()} across ${city.name}, MA ${city.zip}. Licensed and insured, HIC #${HIC_NUMBER}. Free estimate — ${PHONE}.`,
  ];

  return pick(variants, `${key}|desc`);
}

export function getUniqueTitle(serviceSlug: string, city: City): string {
  const def = serviceDef(serviceSlug);
  const key = `${city.slug}|${serviceSlug}`;

  // No brand suffix here — the layout template appends it once.
  const variants = [
    `${def.label} in ${city.name}, MA`,
    `${city.name} ${def.label} | Licensed & Insured`,
    `${def.label} — ${city.name}, ${city.county} County MA`,
    `${def.label} ${city.name} MA | Free Estimate`,
  ];

  return pick(variants, `${key}|title`);
}

// ------------------------------------------------------------
// Long-form body copy
// ------------------------------------------------------------

export function getRichParagraphs(
  serviceSlug: string,
  city: City
): { expertIntro: string; trustedContractor: string; comprehensiveServices: string; whyLocal: string } {
  const profile = getCityProfile(city);
  const def = serviceDef(serviceSlug);
  const content = getServiceContent(serviceSlug, city);
  const key = `${city.slug}|${serviceSlug}`;
  const exposure = exposureOf(city);

  const expertIntro = content.intro;

  const trustedOpen = [
    `The reason we push people toward a local contractor for ${def.work} is not loyalty to the idea — it is that the failures we get called out to fix are almost always detail failures, and details are what a crew working forty miles from home stops caring about at four in the afternoon.`,
    `Choosing who does ${def.work} on a ${city.name} home matters more than choosing the material. Most of what fails early fails at a joint, a flashing lap or a fastener line, and none of those show up in a brochure.`,
    `We have been working across ${city.county} County since 2015, and the pattern is consistent: the jobs that come back are the ones where somebody rushed the parts nobody sees.`,
  ];
  const trustedMiddle = [
    `On ${city.name} homes specifically, ${profile.commonIssues[0]} and ${profile.commonIssues[1]} are what we plan around before a crew is booked.`,
    `Here, the two things we expect to deal with are ${profile.commonIssues[0]} and ${profile.commonIssues[1]}.`,
    `${profile.commonIssues[0].charAt(0).toUpperCase() + profile.commonIssues[0].slice(1)} is common enough in ${city.name} that we price for it rather than acting surprised.`,
  ];
  const trustedClose = [
    `Our crews are our own employees. We do not sell the job and hand it to whoever is available, and the person who quoted your project is on site while it runs.`,
    `We do not subcontract. That is the whole reason we can hold a start date and the reason the standard does not drop between the first elevation and the last.`,
    `One crew, start to finish, and one person you call. It is a small company and that is deliberate.`,
  ];

  const trustedContractor = [
    pick(trustedOpen, `${key}|t1`),
    pick(trustedMiddle, `${key}|t2`),
    pick(trustedClose, `${key}|t3`),
  ].join(' ');

  const solutionsList = content.solutions.join('; ');
  const compOpen = [
    `What we actually do differently on ${def.work} comes down to a handful of things: ${solutionsList}.`,
    `The specification we work to in ${city.name} is not complicated — ${solutionsList}.`,
    `Concretely, on a ${city.name} project that means ${solutionsList}.`,
  ];
  const compClose = [
    `None of that is exotic. It is manufacturer specification, followed properly, which is a lower bar than the industry's reputation suggests and still the thing that decides how the wall looks in year twelve.`,
    `It is all standard practice. The difference is that it gets done on every elevation, including the one facing the neighbour's fence that nobody inspects.`,
    `Every one of those is in the manufacturer's own installation guide. Following it is most of the job.`,
  ];

  const comprehensiveServices = [
    pick(compOpen, `${key}|c1`),
    `Materials are rated for the New England climate zone, and we account for ${pick(exposureNotes[exposure], `${key}|c2`)}.`,
    pick(compClose, `${key}|c3`),
  ].join(' ');

  const nearby = pickN(profile.neighborhoods, `${key}|wl`, 3).join(', ');
  const whyLocalOpen = [
    `We are ${city.distance} miles from ${city.name} — ${driveBand(city.distance)} — and we have worked across ${nearby}.`,
    `From the Charlton shop, ${city.name} is ${driveBand(city.distance)}. We have jobs behind us in ${nearby}.`,
    `${city.name} is ${city.distance} miles out for us, which is inside the radius where we can get back quickly. We have worked in ${nearby}.`,
  ];
  const whyLocalClose = [
    `Licensed under MA HIC #${HIC_NUMBER}, fully insured, and rated 5.0 on Google across 19 reviews. Estimates are free, written, and there is no second visit from a closer.`,
    `MA HIC #${HIC_NUMBER}, fully insured, 5.0 stars from 19 Google reviews. If you want to see the work, several of the jobs in our portfolio are within a short drive of ${city.name}.`,
    `We carry MA HIC #${HIC_NUMBER} and full insurance, and our Google rating is 5.0 across 19 reviews. Ask for the addresses of recent work near ${city.name} — we will give you them.`,
  ];

  const whyLocal = [
    pick(whyLocalOpen, `${key}|w1`),
    `That distance is mostly about the boring things: being there for the inspection, and coming back out under warranty without it being an expedition.`,
    pick(whyLocalClose, `${key}|w2`),
  ].join(' ');

  return { expertIntro, trustedContractor, comprehensiveServices, whyLocal };
}

export function getServiceChecklist(serviceSlug: string): string[] {
  return serviceDef(serviceSlug).checklist;
}

// ------------------------------------------------------------
// City landing pages (/cities/[slug]) — these had five identical FAQs and
// three identical paragraphs on every one of 247 pages.
// ------------------------------------------------------------

export function getCityPageParagraphs(city: City): string[] {
  const profile = getCityProfile(city);
  const exposure = exposureOf(city);
  const key = `${city.slug}|citypage`;

  const first = [
    `We cover ${city.name} out of our shop in Charlton, ${city.distance} miles away — ${driveBand(city.distance)}. Close enough that a warranty call is a morning, not an expedition.`,
    `${city.name} is ${city.distance} miles from us. That distance is the whole reason we can be there when the inspector is, and back again if something needs looking at.`,
    `Our work in ${city.name} covers siding, windows and doors. Not kitchens, not additions — the outside of the building, which is the only thing we have ever done.`,
  ];

  const second = [
    `The housing here runs to ${profile.housingTypes[0].toLowerCase()} and ${profile.housingTypes[1].toLowerCase()}, much of it ${profile.avgHomeAge} old. On stock that age, ${profile.commonIssues[0]} is the thing we are called about most.`,
    `${city.name} is ${profile.localFlavor}. Its ${profile.housingTypes[0].toLowerCase()} share a predictable set of exterior problems, and ${profile.commonIssues[0]} heads the list.`,
    `Most of what we open up in ${city.name} is ${profile.avgHomeAge} old, dating from ${profile.foundedEra}. That age bracket brings ${profile.commonIssues[0]} and ${profile.commonIssues[1]} with it.`,
  ];

  const third = [
    `${city.county} County weather does the rest: ${pick(exposureNotes[exposure], `${key}|x1`)}. We specify materials and flashing details around that rather than around a brochure.`,
    `Then there is the climate. ${pick(exposureNotes[exposure], `${key}|x2`).replace(/^./, (c) => c.toUpperCase())} is what decides whether a wall assembly lasts, and it is why the unglamorous details get the attention here.`,
    `What shapes the specification in ${city.county} County is ${pick(exposureNotes[exposure], `${key}|x3`)}. Everything from the housewrap choice to the fastener spacing follows from it.`,
  ];

  // What we typically open up here — drawn from the city's own housing profile
  // rather than repeated boilerplate.
  const fourth = [
    `Practically, the jobs divide into three. Siding, where ${profile.commonIssues[0]} is usually the trigger. Windows, where the giveaway is condensation between panes rather than a draft you can feel. And entry doors, where the sill has almost always gone before the slab has.`,
    `The work splits fairly evenly between siding, windows and doors. On ${city.name} stock, siding tends to be a whole-elevation job rather than a patch, because ${profile.commonIssues[0]} rarely stops at one wall.`,
    `Most enquiries here start with one elevation and widen once we are on site — not to sell more, but because ${profile.commonIssues[1]} does not respect the boundary between siding, trim and the openings in between.`,
  ];

  const fifth = [
    `We have worked across ${pickN(profile.neighborhoods, `${key}|n1`, 3).join(', ')}. If you want addresses of recent jobs near you before committing to anything, ask and we will give you them.`,
    `Jobs behind us in ${city.name} include work in ${pickN(profile.neighborhoods, `${key}|n2`, 3).join(', ')}. Our project pages carry the photographs, with the town named on each one.`,
    `Across ${pickN(profile.neighborhoods, `${key}|n3`, 3).join(', ')} and the rest of ZIP ${city.zip}, the estimate is free and written, and there is no second visit from a salesperson.`,
  ];

  return [
    pick(first, `${key}|p1`),
    pick(second, `${key}|p2`),
    pick(third, `${key}|p3`),
    pick(fourth, `${key}|p4`),
    pick(fifth, `${key}|p5`),
  ];
}

export function getCityPageFAQs(city: City): { q: string; a: string }[] {
  const profile = getCityProfile(city);
  const key = `${city.slug}|cityfaq`;
  const nbhd = pickN(profile.neighborhoods, `${key}|nb`, 3).join(', ');

  const bank: { q: string; a: string }[] = [
    {
      q: `Do you cover all of ${city.name}?`,
      a: `Yes — every neighbourhood, including ${nbhd} and the rest of ZIP ${city.zip}. We work throughout ${city.county} County.`,
    },
    {
      q: `How far are you from ${city.name}?`,
      a: `${city.distance} miles, from our shop in Charlton — ${driveBand(city.distance)}. It is close enough that we can be on site for an inspection and back out under warranty without it being a production.`,
    },
    {
      q: `How soon can you look at my ${city.name} home?`,
      a: `Usually within a few days for the assessment. Start dates depend on the season — spring and autumn book up first in ${city.county} County — and we give you a date we can hold rather than the earliest one that sounds good.`,
    },
    {
      q: `Are you licensed to work in ${city.name}?`,
      a: `Yes. Massachusetts Home Improvement Contractor licence HIC #${HIC_NUMBER}, plus full liability and workers' compensation insurance. We file the permits with ${city.name} and attend the inspections.`,
    },
    {
      q: `What do ${city.name} homes usually need?`,
      a: `On the ${profile.housingTypes[0].toLowerCase()} common here, ${profile.commonIssues[0]}. Close behind it, ${profile.commonIssues[1]}. Both are age-related rather than anything unusual about the area.`,
    },
    {
      q: `What warranty do I get?`,
      a: `Manufacturer coverage on the materials — 25 to 50 years depending on what goes on — and a 5-year workmanship warranty from us. Both in writing at handover.`,
    },
    {
      q: `Do you do interior work?`,
      a: `No. Siding, windows, doors and the exterior envelope only. If you need a kitchen or a bathroom we are the wrong call, and we will say so rather than take the job.`,
    },
    {
      q: `Can I see work you have done near ${city.name}?`,
      a: `Yes — our project pages carry real photographs of finished jobs with the town named. Ask and we will point you at the ones closest to ${city.name}.`,
    },
  ];

  return pickN(bank, `${key}|set`, 5);
}
