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
// SERVICE-SPECIFIC CONTENT GENERATORS
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

function getSidingContent(city: City, profile: CityProfile): ServiceContent {
  return {
    intro: `${city.name} homeowners face unique siding challenges. With housing stock dating from ${profile.foundedEra}, many ${city.name} homes have ${profile.housingTypes[0].toLowerCase()} and ${profile.housingTypes[1].toLowerCase()} that need modern siding protection. The ${profile.localFlavor} means exterior aesthetics matter — and so does durability against Massachusetts winters.`,
    challenges: [
      `${profile.commonIssues[0]} — a common problem in ${city.name}'s ${profile.avgHomeAge}-year-old housing stock`,
      `Freeze-thaw cycles in ${city.county} County causing siding expansion cracks and moisture infiltration`,
      `Faded, warped, or storm-damaged siding reducing ${city.name} home values and curb appeal`,
      `Rising heating costs due to uninsulated exterior walls in ${city.name} homes built before 1980`,
      `Woodpecker, carpenter bee, and moisture damage on older wood siding throughout ${city.name} neighborhoods like ${profile.neighborhoods[0]} and ${profile.neighborhoods[1]}`,
    ],
    solutions: [
      `CertainTeed and Alside vinyl siding with lifetime color-lock technology, perfect for ${city.name}'s temperature swings`,
      `James Hardie fiber cement — the gold standard for ${profile.housingTypes[0].toLowerCase()} in ${city.county} County`,
      `Insulated siding systems that cut heating bills by up to 20% for ${city.name} homeowners`,
      `Custom color matching to complement ${city.name}'s ${profile.localFlavor}`,
      `Complete tear-off with moisture barrier and insulation board — not just a cover-up job`,
    ],
    processSteps: [
      { name: 'Free Home Assessment', description: `We visit your ${city.name} home to measure, inspect sheathing, and discuss your goals. You get a detailed written quote within 24 hours.` },
      { name: 'Material Selection', description: `Choose from 40+ colors and 6 siding profiles at our showroom. We bring samples to your ${city.name} home so you can see them in your lighting.` },
      { name: 'Prep & Protection', description: `We protect your ${city.name} landscaping, remove old siding down to sheathing, and repair any hidden damage.` },
      { name: 'Professional Installation', description: `Our crews install housewrap, insulation board, and your new siding with manufacturer-certified techniques.` },
      { name: 'Detail Work', description: `Custom trim, soffit, fascia, and accent pieces are fitted precisely to your ${city.name} home's architecture.` },
      { name: 'Final Walkthrough', description: `We walk the entire exterior with you, ensuring every detail meets ${city.name}'s high standards. Then we clean up completely.` },
    ],
    costRange: '$6-15 per square foot installed, depending on material choice',
    timeline: '5-10 business days for a typical single-family home',
    warranty: '25-50 year manufacturer warranty + 5-year workmanship guarantee',
  };
}

function getWindowsContent(city: City, profile: CityProfile): ServiceContent {
  return {
    intro: `${city.name} winters are brutal on windows. Homes in neighborhoods like ${profile.neighborhoods[0]} and ${profile.neighborhoods[1]} — many dating from ${profile.avgHomeAge} ago — often have original or early-replacement windows that leak air, create drafts, and drive up heating bills. Upgrading to ENERGY STAR certified windows is one of the smartest investments a ${city.name} homeowner can make.`,
    challenges: [
      `Single-pane and early double-pane windows in ${city.name} homes losing 25-30% of heating energy every winter`,
      `Condensation and frost buildup on interior glass surfaces during ${city.county} County's cold months`,
      `Visible daylight around window frames indicating seal failure and air infiltration`,
      `Difficulty opening, closing, or locking old windows — a safety concern for ${city.name} families`,
      `Road noise penetration in ${city.name} neighborhoods near busy routes, disturbing sleep and daily life`,
    ],
    solutions: [
      `ENERGY STAR certified double-pane windows with argon gas and Low-E coatings — designed for ${city.county} County's climate zone`,
      `Triple-pane options for maximum efficiency in ${city.name}'s coldest-facing exposures`,
      `Sound-reducing glass packages for ${city.name} homes near busy streets or highways`,
      `Multiple styles (double-hung, casement, bay, picture) to match ${profile.housingTypes[0].toLowerCase()} architecture`,
      `Proper flashing and insulation around every frame — the difference between a 10-year window and a 30-year window`,
    ],
    processSteps: [
      { name: 'Energy Assessment', description: `We evaluate every window in your ${city.name} home, checking for air leaks, seal failure, and frame condition. You'll see exactly where you're losing money.` },
      { name: 'Window Selection', description: `Choose from vinyl, fiberglass, or wood frames in styles that complement your ${city.name} home. We handle custom sizes for older homes with non-standard openings.` },
      { name: 'Custom Manufacturing', description: `Every window is custom-built to your ${city.name} home's exact measurements. No shimming oversized windows into undersized openings.` },
      { name: 'Professional Installation', description: `Our crews install with proper flashing, foam insulation, and interior trim — maintaining your ${city.name} home's interior finish.` },
      { name: 'Testing & Sealing', description: `We test every window for operation, locking mechanism, and air-tightness before calling it done.` },
      { name: 'Final Review', description: `Walk-through with you to ensure every window meets your expectations. We clean up all old materials and job-site debris.` },
    ],
    costRange: '$300-1,200 per window installed, depending on size and type',
    timeline: '1-3 days for most homes (10-15 windows)',
    warranty: 'Lifetime limited manufacturer warranty + 5-year workmanship guarantee',
  };
}

function getDoorsContent(city: City, profile: CityProfile): ServiceContent {
  return {
    intro: `Your front door is the first thing visitors notice at your ${city.name} home — and the last barrier against break-ins, weather, and energy loss. Many ${profile.housingTypes[0].toLowerCase()} in ${city.name} still have original builder-grade doors that are dented, drafty, or outdated. A premium door replacement delivers the highest ROI of any exterior upgrade.`,
    challenges: [
      `Drafty entry doors in ${city.name} homes letting cold air infiltrate during Massachusetts winters`,
      `Warped or swollen wood doors that won't close properly after ${city.county} County's humid summers`,
      `Outdated door styles reducing curb appeal and home value in ${city.name}'s competitive real estate market`,
      `Single-pane door glass providing zero insulation and minimal security`,
      `Worn weatherstripping and threshold gaps visible from inside — ${city.name} homeowners can literally feel the draft`,
    ],
    solutions: [
      `Therma-Tru fiberglass entry doors with foam core insulation (R-value up to 7.0) — won't crack, warp, or rot in ${city.name}'s climate`,
      `ProVia steel security doors with multi-point locking systems for ${city.name} family safety`,
      `Storm doors that add a second barrier, reducing energy loss by up to 50% during ${city.county} County winters`,
      `Sliding patio doors with Low-E glass — transforming ${city.name} backyards into three-season living spaces`,
      `Smart lock integration (Schlage, Yale, August) for keyless convenience at your ${city.name} home`,
    ],
    processSteps: [
      { name: 'Door Consultation', description: `We assess your current ${city.name} entry, measure precisely, and discuss your priorities — security, energy efficiency, style, or all three.` },
      { name: 'Design Selection', description: `Choose from hundreds of door styles, finishes, glass options, and hardware. We bring a tablet with visualization tools to your ${city.name} home.` },
      { name: 'Custom Ordering', description: `Your door is ordered to exact specifications. No off-the-shelf compromises for your ${city.name} home's unique opening.` },
      { name: 'Expert Installation', description: `Our installers remove the old door, check the frame for rot or damage, and install your new door with precision shimming and insulation.` },
      { name: 'Hardware & Finishing', description: `Locksets, deadbolts, smart locks, and trim are installed. Every detail is finished to match your ${city.name} home's style.` },
      { name: 'Final Check', description: `We test locking mechanisms, check weather sealing, and ensure smooth operation. Your ${city.name} home is more secure, efficient, and beautiful.` },
    ],
    costRange: '$1,500-6,000+ installed, depending on material and features',
    timeline: '1 day for most door installations',
    warranty: 'Lifetime limited on fiberglass, 20-year on steel + 5-year workmanship',
  };
}

function getGeneralContractorContent(city: City, profile: CityProfile): ServiceContent {
  return {
    intro: `Planning a renovation in ${city.name}? Whether you're updating a ${profile.housingTypes[0].toLowerCase()} or transforming a ${profile.housingTypes[1].toLowerCase()}, you need a licensed general contractor who knows ${city.county} County building codes, pulls proper permits, and delivers quality work on schedule. ${SITE_NAME} has completed 500+ projects across Massachusetts — and we treat every ${city.name} home like our own.`,
    challenges: [
      `Finding a licensed, insured contractor who actually shows up in ${city.name} — not just collects deposits`,
      `Navigating ${city.name}'s building permits and inspection requirements without delays`,
      `Coordinating multiple trades (siding, windows, doors, trim) without gaps or scheduling conflicts`,
      `Protecting your ${city.name} home's interior and landscaping during exterior renovation work`,
      `Getting accurate, fixed-price quotes instead of vague estimates that balloon after work begins`,
    ],
    solutions: [
      `MA Licensed HIC #${HIC_NUMBER} — fully compliant for all residential work in ${city.name} and ${city.county} County`,
      `Single-point project management: one crew, one schedule, one contact person for your entire ${city.name} renovation`,
      `Fixed-price contracts with detailed scope — the price you agree to is the price you pay`,
      `We handle all ${city.name} building department permits, inspections, and code compliance`,
      `Full-service exterior renovation: siding + windows + doors + trim completed as one coordinated project`,
    ],
    processSteps: [
      { name: 'Project Consultation', description: `We visit your ${city.name} home to understand your vision, inspect existing conditions, and discuss budget. You get a comprehensive proposal within 48 hours.` },
      { name: 'Design & Planning', description: `We finalize materials, colors, and scope. For ${city.name} homes in historic areas, we navigate any required approvals.` },
      { name: 'Permitting', description: `We submit permit applications to ${city.name}'s building department and schedule required inspections. You don't have to deal with city hall.` },
      { name: 'Demolition & Prep', description: `Old materials are removed carefully, and underlying structure is inspected and repaired as needed. Your ${city.name} property is protected throughout.` },
      { name: 'Construction', description: `Professional installation of all components — siding, windows, doors, trim — by our own crews. No random subcontractors at your ${city.name} home.` },
      { name: 'Final Inspection', description: `City inspection, our quality walkthrough with you, and a thorough cleanup. You get warranty documentation for everything installed at your ${city.name} home.` },
    ],
    costRange: 'Varies by scope — free detailed estimates provided',
    timeline: '1-6 weeks depending on project scope',
    warranty: '5-year workmanship warranty + all manufacturer warranties on materials',
  };
}

// ============================================================
// MAIN EXPORT: Get unique content for any city+service combo
// ============================================================

export function getCityProfile(city: City): CityProfile {
  // Check for specific city profile first
  if (cityProfiles[city.slug]) {
    return cityProfiles[city.slug];
  }

  // Fall back to county-based profile with generated neighborhoods
  const countyProfile = countyProfiles[city.county] || countyProfiles['Middlesex'];
  const hash = cityHash(city.slug);

  // Generate plausible neighborhoods from city name
  const genericNeighborhoods = [
    `${city.name} Center`,
    `North ${city.name}`,
    `South ${city.name}`,
    `East ${city.name}`,
    `West ${city.name}`,
    `Downtown ${city.name}`,
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

  switch (serviceSlug) {
    case 'siding': return getSidingContent(city, profile);
    case 'windows': return getWindowsContent(city, profile);
    case 'doors': return getDoorsContent(city, profile);
    case 'general-contractor': return getGeneralContractorContent(city, profile);
    default: return getSidingContent(city, profile);
  }
}

// Generate unique FAQ items per city+service
export function getUniqueFAQs(serviceSlug: string, city: City): { question: string; answer: string }[] {
  const profile = getCityProfile(city);
  const content = getServiceContent(serviceSlug, city);

  const serviceName = serviceSlug === 'general-contractor' ? 'general contracting' :
    serviceSlug === 'windows' ? 'window replacement' :
    serviceSlug === 'doors' ? 'door installation' : 'siding installation';

  return [
    {
      question: `How much does ${serviceName} cost in ${city.name}, MA?`,
      answer: `${serviceName.charAt(0).toUpperCase() + serviceName.slice(1)} in ${city.name} typically costs ${content.costRange}. For ${profile.housingTypes[0].toLowerCase()} common in ${city.name}, expect to invest based on home size and material choice. We provide free, detailed written estimates with no hidden fees — what we quote is what you pay.`,
    },
    {
      question: `What ${serviceName} challenges are specific to ${city.name} homes?`,
      answer: `${city.name} has unique challenges: ${content.challenges[0]}. Additionally, ${content.challenges[1].toLowerCase()}. Our team has extensive experience with ${profile.housingTypes[0].toLowerCase()} and ${profile.housingTypes[1].toLowerCase()} common throughout ${city.name}'s neighborhoods.`,
    },
    {
      question: `How long does ${serviceName} take in ${city.name}?`,
      answer: `Most ${serviceName} projects in ${city.name} take ${content.timeline}. Weather can affect scheduling in ${city.county} County — we plan around forecasts and protect your home during the process. We'll give you an exact timeline during your free consultation.`,
    },
    {
      question: `Do you handle permits for ${serviceName} in ${city.name}?`,
      answer: `Yes! We manage all permit applications and inspections with ${city.name}'s building department. As a licensed MA contractor (HIC #${HIC_NUMBER}), we ensure all work meets ${city.county} County and state building codes. You don't have to deal with paperwork.`,
    },
    {
      question: `Why choose ${SITE_NAME} for ${serviceName} in ${city.name}?`,
      answer: `We're just ${city.distance} miles from ${city.name}, rated 5.0 stars on Google with 19 reviews, and have completed 500+ projects across ${city.county} County. Our crews are our own employees — not random subcontractors. Licensed HIC #${HIC_NUMBER}, certified installers, ${content.warranty}.`,
    },
    {
      question: `What neighborhoods in ${city.name} do you serve?`,
      answer: `We serve all of ${city.name}, including ${profile.neighborhoods.slice(0, 4).join(', ')}, and every neighborhood in ZIP code ${city.zip}. Being just ${city.distance} miles away means we can respond quickly to your ${city.name} home's needs.`,
    },
  ];
}

// Generate unique meta description per city+service
export function getUniqueMetaDescription(serviceSlug: string, city: City): string {
  const profile = getCityProfile(city);
  const serviceName = serviceSlug === 'general-contractor' ? 'General Contractor' :
    serviceSlug === 'windows' ? 'Window Replacement' :
    serviceSlug === 'doors' ? 'Door Installation' : 'Siding Installation';

  const hash = cityHash(city.slug + serviceSlug) % 4;
  const variants = [
    `#1 ${serviceName.toLowerCase()} contractor in ${city.name}, MA ★5.0. Specialists in ${profile.housingTypes[0].toLowerCase()}. ${city.distance}mi away. Licensed HIC #${HIC_NUMBER}. Call ${PHONE} — FREE estimate!`,
    `Expert ${serviceName.toLowerCase()} for ${city.name} homes. ${profile.commonIssues[0]}? We fix that. 500+ projects, 5-star rated. Licensed & insured. FREE estimates — call ${PHONE}`,
    `${city.name}'s trusted ${serviceName.toLowerCase()} contractor ★5.0. Serving ${profile.neighborhoods[0]}, ${profile.neighborhoods[1]} & all ${city.zip}. HIC #${HIC_NUMBER}. Call ${PHONE} today!`,
    `Professional ${serviceName.toLowerCase()} in ${city.name}, ${city.county} County. Experts with ${profile.housingTypes[0].toLowerCase()}. 19 5-star reviews. FREE estimates — ${PHONE}`,
  ];

  return variants[hash];
}

// Generate unique title tag per city+service
export function getUniqueTitle(serviceSlug: string, city: City): string {
  const serviceName = serviceSlug === 'general-contractor' ? 'General Contractor' :
    serviceSlug === 'windows' ? 'Window Replacement' :
    serviceSlug === 'doors' ? 'Door Installation' : 'Siding Contractor';

  const hash = cityHash(city.slug + serviceSlug) % 3;
  const variants = [
    `${serviceName} ${city.name} MA | Expert ${serviceName} | Call Now | ${SITE_NAME}`,
    `#1 ${serviceName} in ${city.name}, MA (2026) | 5.0★ Rated | ${SITE_NAME}`,
    `${serviceName} ${city.name} MA | ${city.county} County | FREE Estimate | ${SITE_NAME}`,
  ];

  return variants[hash];
}

// ============================================================
// RICH PARAGRAPHS — Long-form text like RS Development Group
// ============================================================

export function getRichParagraphs(serviceSlug: string, city: City): { expertIntro: string; trustedContractor: string; comprehensiveServices: string; whyLocal: string } {
  const profile = getCityProfile(city);
  const sn = serviceSlug === 'general-contractor' ? 'general contracting' :
    serviceSlug === 'windows' ? 'window replacement' :
    serviceSlug === 'doors' ? 'door installation' : 'siding installation';

  const expertIntro = `${city.name} homeowners trust ${SITE_NAME} for professional ${sn} services. Whether you're updating the exterior of a ${profile.housingTypes[0].toLowerCase()} or renovating a ${profile.housingTypes[1].toLowerCase()}, quality ${sn} is essential for protecting your home, improving energy efficiency, and maintaining property value. Many homes in ${city.name} feature ${profile.avgHomeAge}-old construction that benefits significantly from modern materials and installation techniques. With housing stock dating from ${profile.foundedEra}, ${city.name}'s ${profile.localFlavor} creates unique demands that require a contractor who understands the area intimately.`;

  const trustedContractor = `When it comes to ${sn} in ${city.name}, Massachusetts, choosing a local contractor makes all the difference. ${SITE_NAME} has been serving ${city.name} residents and the greater ${city.county} County area since 2015, building a reputation for exceptional craftsmanship, honest pricing, and reliable service. We understand the specific challenges that ${city.name} homeowners face — from ${profile.commonIssues[0]} to ${profile.commonIssues[1]}. Our team of skilled professionals brings over a decade of combined experience to every ${sn} project in ${city.name}. We don't cut corners, we don't use subcontractors, and we don't disappear after the job is done. Every project is managed by our team from start to finish, ensuring consistent quality and communication throughout.`;

  const comprehensiveServices = `Our ${sn} services in ${city.name} are designed to address the specific needs of ${city.county} County homes. Massachusetts weather is demanding — temperatures swing from below zero in January to 95 degrees in July, with ice storms, nor'easters, and humidity in between. That's why we use only premium materials rated for the New England climate zone. Every installation includes proper moisture barriers, insulation integration, and weatherproofing details that protect your ${city.name} home for decades. We source materials from trusted manufacturers and back every project with comprehensive warranties. For ${city.name} homeowners, this means peace of mind knowing your investment is protected against whatever Massachusetts weather throws at it.`;

  const whyLocal = `Being based in Charlton, just ${city.distance} miles from ${city.name}, means we can respond quickly to consultations, start projects promptly, and be available for any follow-up needs. We've completed projects throughout ${city.name}'s neighborhoods including ${profile.neighborhoods.slice(0, 3).join(', ')}, and we understand the architectural styles, building codes, and homeowner expectations in ${city.county} County. Our 5.0-star Google rating from 19 verified reviews reflects our commitment to every ${city.name} homeowner we serve. Licensed under MA HIC #${HIC_NUMBER}, fully insured, and certified by leading manufacturers — we're the contractor ${city.name} trusts.`;

  return { expertIntro, trustedContractor, comprehensiveServices, whyLocal };
}

export function getServiceChecklist(serviceSlug: string): string[] {
  switch (serviceSlug) {
    case 'siding':
      return ['Vinyl siding installation (CertainTeed, Alside)', 'James Hardie fiber cement siding', 'Insulated siding for energy savings', 'Wood and engineered wood options', 'Complete tear-off and replacement', 'Trim, soffit, and fascia work', 'Housewrap and moisture barrier', 'Custom color matching'];
    case 'windows':
      return ['Double-pane ENERGY STAR windows', 'Triple-pane for maximum insulation', 'Bay, bow, and picture windows', 'Casement and awning styles', 'Basement egress windows', 'Custom sizes for older homes', 'Low-E glass with argon fill', 'Full-frame and insert replacements'];
    case 'doors':
      return ['Fiberglass entry doors (Therma-Tru, ProVia)', 'Steel security entry doors', 'Sliding patio doors', 'French doors', 'Storm doors with screens', 'Smart lock installation', 'Sidelight and transom options', 'ADA-compliant threshold options'];
    case 'general-contractor':
      return ['Complete exterior renovations', 'Siding, window, and door packages', 'Structural repairs and modifications', 'Permit management and inspections', 'Project coordination and scheduling', 'Interior remodeling projects', 'Deck and porch construction', 'Insurance claim assistance'];
    default:
      return ['Professional installation', 'Premium materials', 'Full project management', 'Code compliance', 'Warranty coverage', 'Free estimates', 'Licensed and insured', 'Satisfaction guaranteed'];
  }
}
