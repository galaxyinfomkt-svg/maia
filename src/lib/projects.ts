/* Single source of truth for the portfolio.
 *
 * One entry per JOB, not per photograph. The Woburn house alone produced six
 * usable elevations and Reading five — listing each as its own "project" made
 * the gallery look like a dozen jobs when it was three, so every photo from one
 * address now lives in that project's gallery and detail page.
 *
 * Projects with `pairs` or a multi-photo `gallery` get their own page under
 * /projects/<slug>. The single-photo library shots at the bottom deliberately
 * do not — a page holding one stock-ish photo and two sentences is exactly the
 * thin content this site is already trying to dig itself out of.
 */

import { IMAGES } from '@/lib/constants';

export type ServiceName = 'Siding' | 'Windows' | 'Doors' | 'General Contractor';

export interface ProjectPair {
  before: string;
  after: string;
  /** Left-hand badge. Pairs that are mid-job rather than original condition
   *  say so — labelling those "BEFORE" would misrepresent them. */
  beforeLabel?: string;
  caption: string;
}

export interface ProjectPhoto {
  src: string;
  alt: string;
  caption: string;
}

export interface Project {
  id: string;
  /** Present only for jobs with enough material for their own page. */
  slug?: string;
  title: string;
  location: string;
  service: ServiceName;
  /** Card cover — always a finished photo, never a "before". */
  image: string;
  /** Card blurb. */
  description: string;
  /** Detail-page prose. */
  body?: string[];
  pairs?: ProjectPair[];
  gallery?: ProjectPhoto[];
  /** Shown in the five-item slider rail outside /projects. */
  featured?: boolean;
}

const BA = '/images/before-after';

export const projects: Project[] = [
  // ---------------------------------------------------------------- Atkinson, NH
  {
    id: 'atkinson-nh-siding',
    slug: 'whole-house-siding-replacement-atkinson-nh',
    title: 'Whole-House Siding Replacement',
    location: 'Atkinson, NH',
    service: 'Siding',
    image: `${BA}/siding-after-atkinson-nh.webp`,
    description:
      'Failing cedar shakes and mismatched vinyl stripped off, then re-clad end to end in blue-grey vinyl siding with all-new trim and corner boards.',
    featured: true,
    body: [
      'This Cape in Atkinson, New Hampshire had been patched more than once. The upper gables still wore the original cedar shakes, weathered orange and cupping away from the wall, while the additions below had been re-clad at different times in two shades of grey vinyl that never matched. The result read as three houses stitched together.',
      'We stripped every wall rather than siding over what was there. That is the difference between a job that lasts and one that hides a problem for five years — you cannot flash an opening you cannot see, and you do not know what you are covering until you look at it.',
      'Every window and door was re-wrapped and new corner boards and frieze went on. The house now reads as one building instead of three.',
    ],
    pairs: [
      { before: `${BA}/siding-before-atkinson-nh.webp`, after: `${BA}/siding-after-atkinson-nh.webp`,
        caption: 'Rear elevation — the orange cedar gable and two mismatched greys replaced with one vinyl exterior.' },
      { before: `${BA}/siding-before-atkinson-nh-2.webp`, after: `${BA}/siding-after-atkinson-nh-2.webp`,
        caption: 'Side elevation — new siding, trim and corner boards carried right around.' },
      { before: `${BA}/siding-before-atkinson-nh-3.webp`, after: `${BA}/siding-after-atkinson-nh-3.webp`,
        caption: 'Entry side — dated shutters gone, every opening wrapped in new trim.' },
    ],
    gallery: [
      { src: `${BA}/siding-atkinson-nh-front.webp`,
        alt: 'Finished front elevation of a Cape in Atkinson, NH with blue-grey vinyl siding and white trim',
        caption: 'Finished front elevation, with a clean roofline and all-new white trim.' },
      { src: `${BA}/siding-atkinson-nh-sheathing.webp`,
        alt: 'Original plank sheathing exposed at a corner after the old siding was stripped, Atkinson NH',
        caption: 'Stripped back before the new siding went on — nothing covered up.' },
    ],
  },

// ---------------------------------------------------------------- Manchester, NH
  {
    id: 'manchester-nh-siding',
    slug: 'vinyl-siding-replacement-manchester-nh',
    title: 'Vinyl Siding Replacement',
    location: 'Manchester, NH',
    service: 'Siding',
    image: `${BA}/siding-after-manchester-nh.webp`,
    description:
      'Two-family in Manchester, NH stripped of its old cement-shingle siding and re-clad in grey vinyl, with new white trim and a shingle-profile gable.',
    featured: true,
    body: [
      'The old siding on this Manchester two-family had been patched so many times it read as a colour chart — replacement courses in three different shades, and green weather staining running the full height of the walls where the wind drove the rain.',
      'It came off and went back on as grey vinyl, corner to corner, with white trim around every window and a contrasting shingle profile in the gables and dormers.',
      'The porch columns and brick piers stayed as they were. On a house with this much character, the job is knowing what to leave alone.',
    ],
    pairs: [
      { before: `${BA}/siding-before-manchester-nh.webp`, after: `${BA}/siding-after-manchester-nh.webp`,
        caption: 'Front elevation — the same house, corner to corner.' },
      { before: `${BA}/siding-before-manchester-nh-2.webp`, after: `${BA}/siding-after-manchester-nh-2.webp`,
        caption: 'Front corner — new white trim on every opening and a shingled gable above.' },
      { before: `${BA}/siding-before-manchester-nh-3.webp`, after: `${BA}/siding-after-manchester-nh-3.webp`,
        caption: 'Rear — siding cut in around the staircase, the balconies and the chimney.' },
      { before: `${BA}/siding-before-manchester-nh-4.webp`, after: `${BA}/siding-after-manchester-nh-4.webp`,
        caption: 'Side elevation — the streaked wall that started it, and the same wall finished.' },
    ],
    gallery: [
      { src: `${BA}/siding-manchester-nh-front.webp`,
        alt: 'Finished front of a Manchester, NH two-family with new grey vinyl siding and white porch columns',
        caption: 'Front with the porch — brick piers left exactly as they were.' },
      { src: `${BA}/siding-manchester-nh-front-2.webp`,
        alt: 'Front elevation in Manchester, NH after residing, with new white window trim',
        caption: 'Every window picked out in new white trim.' },
      { src: `${BA}/siding-manchester-nh-street.webp`,
        alt: 'Completed siding job in Manchester, NH seen from the pavement',
        caption: 'From the pavement, sign still on the lawn.' },
      { src: `${BA}/siding-manchester-nh-side.webp`,
        alt: 'Gable end of a Manchester, NH two-family after residing, with a shingled dormer',
        caption: 'Gable end and shingled dormer.' },
      { src: `${BA}/siding-manchester-nh-stairs.webp`,
        alt: 'Staircase side of a Manchester, NH two-family finished in grey vinyl siding',
        caption: 'The staircase side — the fiddly one.' },
      { src: `${BA}/siding-manchester-nh-old-detail.webp`,
        alt: 'Old cement-shingle siding in Manchester, NH with mismatched patches and weather staining',
        caption: 'What came off: three shades of patch and a wall of staining.' },
    ],
  },

  // ---------------------------------------------------------------- Woburn, MA
  {
    id: 'woburn-ma-siding-windows',
    slug: 'siding-windows-custom-pvc-trim-woburn-ma',
    title: 'Siding, Windows & Custom PVC Trim',
    location: 'Woburn, MA',
    service: 'Siding',
    image: `${BA}/siding-woburn-ma-front.webp`,
    description:
      'Full exterior on a Woburn ranch — new vinyl siding, replacement windows, a bay window, and curved PVC trim cut on site to fit a Palladian arch.',
    body: [
      'One house, four elevations and a window that no catalogue trim would fit. The Woburn ranch got new clapboard-profile vinyl siding throughout, plus replacement windows.',
      'The rear addition carries a Palladian arch window. Curved PVC trim for an opening like that is not something you order — the radius has to match the window that is actually installed. We templated it on site, cut and assembled the arch in the driveway, and fitted it before the siding went on.',
      'Trim first, then the siding cut into it — the order that stops water finding its way behind the opening.',
    ],
    pairs: [
      { before: `${BA}/siding-before-woburn-ma.webp`, after: `${BA}/siding-after-woburn-ma.webp`,
        beforeLabel: 'MID-JOB',
        caption: 'The gable mid-job with the arch window set, next to the finished wall.' },
      { before: `${BA}/trim-before-woburn-ma.webp`, after: `${BA}/trim-after-woburn-ma.webp`,
        beforeLabel: 'FABRICATION',
        caption: 'The arch trim being cut and assembled on site, and the same addition finished.' },
    ],
    gallery: [
      { src: `${BA}/siding-woburn-ma-front.webp`,
        alt: 'Front elevation of a Woburn, MA ranch with new vinyl siding, replacement windows and a bay window',
        caption: 'Front elevation — new siding, replacement windows and a bay window in fresh white trim.' },
      { src: `${BA}/siding-woburn-ma-front-2.webp`,
        alt: 'Street view of a completed siding and window project in Woburn, MA',
        caption: 'From the street, with the walkway and lamp post.' },
      { src: `${BA}/siding-woburn-ma-side.webp`,
        alt: 'Side elevation in Woburn, MA with a new bay window and wrapped trim',
        caption: 'Side elevation — new bay window and wrapped trim.' },
      { src: `${BA}/siding-woburn-ma-rear.webp`,
        alt: 'Rear elevation in Woburn, MA where new siding meets the original brick chimney',
        caption: 'Rear — new siding cut in around the original brick chimney, mini-split line set tidied.' },
      { src: `${BA}/siding-woburn-ma-street.webp`,
        alt: 'Completed Woburn, MA ranch from the street with new taupe vinyl siding and a bay window',
        caption: 'From the street, sign still on the lawn.' },
      { src: `${BA}/siding-woburn-ma-side-3.webp`,
        alt: 'Three-quarter view of a completed siding and window project in Woburn, MA',
        caption: 'Three-quarter view across the gable end to the entry.' },
      { src: `${BA}/siding-woburn-ma-side-2.webp`,
        alt: 'Gable end of a Woburn, MA ranch after residing, with new downspout and white rake trim',
        caption: 'Gable end, with the new downspout and rake trim.' },
      { src: `${BA}/siding-woburn-ma-chimney.webp`,
        alt: 'New siding cut in around the original brick chimney on a Woburn, MA home',
        caption: 'Cutting siding in around a chimney is where the patience goes.' },
      { src: `${BA}/trim-woburn-ma-detail.webp`,
        alt: 'Close detail of custom PVC arch trim on a Palladian window in Woburn, MA',
        caption: 'The arch trim up close, before the siding goes in around it.' },
      { src: `${BA}/windows-woburn-ma-interior.webp`,
        alt: 'Interior view of a new double-hung replacement window with white casing in Woburn, MA',
        caption: 'Inside: new double-hung, cased and silled.' },
    ],
  },

  // ---------------------------------------------------------------- Reading, MA
  {
    id: 'reading-ma-cedar',
    slug: 'cedar-shingle-siding-reading-ma',
    title: 'Cedar Shingle Siding',
    location: 'Reading, MA',
    service: 'Siding',
    image: `${BA}/cedar-siding-reading-ma-2.webp`,
    description:
      'Hand-coursed western red cedar shingles on a gambrel-roofed addition, with new white trim and corner boards.',
    body: [
      'A gambrel-roofed addition in Reading, clad in western red cedar shingles. Cedar is laid by hand, one course at a time, and every course has to stay level and land correctly at the corner boards and around each window — there is nowhere to hide a drifting line.',
      'New white trim, corner boards and a shingled entry portico finish it.',
      'The cedar is left to weather naturally. It will move from this honey tone toward silver-grey over the next few seasons.',
    ],
    gallery: [
      { src: `${BA}/cedar-siding-reading-ma-2.webp`,
        alt: 'Western red cedar shingle siding on a gambrel-roofed addition in Reading, MA',
        caption: 'The gambrel addition, coursed straight to the white corner boards.' },
      { src: `${BA}/cedar-siding-reading-ma-3.webp`,
        alt: 'New cedar shingle siding meeting the original grey clapboard on a Reading, MA home',
        caption: 'Where the new cedar meets the original grey clapboard on the main house.' },
      { src: `${BA}/cedar-siding-reading-ma-4.webp`,
        alt: 'Front elevation of a Reading, MA addition clad in western red cedar with an entry portico',
        caption: 'Front elevation, with the shingled entry portico and new double-hung windows.' },
      { src: `${BA}/siding-after-reading-ma.webp`,
        alt: 'Cedar shingle siding and white trim on a Reading, MA addition',
        caption: 'The full facade once the staging came down.' },
      { src: `${BA}/cedar-siding-reading-ma-5.webp`,
        alt: 'New cedar shingles on a Reading, MA addition running up to the original grey clapboard',
        caption: 'Where the new cedar stops and the original clapboard starts.' },
      { src: `${BA}/cedar-siding-reading-ma-6.webp`,
        alt: 'Cedar-shingled addition in Reading, MA above its fieldstone foundation, beside the grey main house',
        caption: 'The addition from the side, above the fieldstone base.' },
      { src: `${BA}/cedar-siding-reading-ma-detail.webp`,
        alt: 'Close detail of hand-coursed western red cedar shingles and white window trim in Reading, MA',
        caption: 'Coursing detail at a dormer — the part that only shows up close.' },
    ],
  },

  // ---------------------------------------------------------------- Norfolk, MA
  {
    id: 'norfolk-ma-doors',
    slug: 'entry-and-patio-door-installation-norfolk-ma',
    title: 'Entry & Patio Door Installation',
    location: 'Norfolk, MA',
    service: 'Doors',
    image: `${BA}/door-after-norfolk-ma.webp`,
    description:
      'Sliding patio door replaced in a single day and a fiberglass entry door with sidelights — each one set, insulated and finished with full casing.',
    featured: true,
    body: [
      'Door replacement is judged on the finish. Getting the unit level, shimmed and foamed is the part that makes it work; the casing is the part the homeowner looks at every day. We do both, so nobody is left with a new door and a wall to patch.',
      'The kitchen patio slider came out and went back in the same day — old unit out, new door set and insulated, interior casing on before we left.',
      'The entry door is fiberglass with matching sidelights, black on the street side against the yellow clapboard and finished in white inside.',
    ],
    pairs: [
      { before: `${BA}/door-before-norfolk-ma.webp`, after: `${BA}/door-after-norfolk-ma.webp`,
        beforeLabel: 'DURING INSTALL',
        caption: 'The kitchen slider set, shimmed and foamed, then the same opening with full casing on.' },
      { before: `${BA}/door-before-norfolk-ma-2.webp`, after: `${BA}/door-after-norfolk-ma-2.webp`,
        beforeLabel: 'DURING INSTALL',
        caption: 'A second slider in the dining room — foam and shims, then full white casing.' },
      { before: `${BA}/door-before-norfolk-ma-3.webp`, after: `${BA}/door-after-norfolk-ma-3.webp`,
        beforeLabel: 'DURING INSTALL',
        caption: 'The garage-to-house door sealed on the garage side, then cased and painted inside.' },
    ],
    gallery: [
      { src: `${BA}/door-norfolk-ma-entry.webp`,
        alt: 'Black fiberglass entry door with sidelights installed in Norfolk, MA against yellow clapboard',
        caption: 'Fiberglass entry door with matching sidelights, in crisp white trim.' },
      { src: `${BA}/door-norfolk-ma-foyer.webp`,
        alt: 'Interior view of a new entry door with frosted sidelights and full casing in Norfolk, MA',
        caption: 'The same opening from inside — frosted sidelights and full casing.' },
    ],
  },

  // ---------------------------------------------------------------- legacy pairs
  // Two of these file names are historical and do NOT match the town they show:
  // exterior-after-worcester-ma is the AFTER of the Framingham house, and
  // siding-after-framingham-ma is the BEFORE of the Worcester one.
  {
    id: 'framingham-ma-siding',
    slug: 'full-vinyl-siding-replacement-framingham-ma',
    title: 'Full Vinyl Siding Replacement',
    location: 'Framingham, MA',
    service: 'Siding',
    image: `${BA}/exterior-after-worcester-ma.webp`,
    description:
      'Complete vinyl siding replacement on a Cape-style home — a striking navy-blue exterior that lifted both curb appeal and energy efficiency.',
    featured: true,
    body: [
      'A Cape in Framingham taken from a tired brown exterior to navy-blue vinyl, with white trim picking out the dormers, the porch and every window.',
      'The porch was rebuilt as part of the same job, so the new siding and the new structure were detailed together rather than one being worked around the other.',
    ],
    pairs: [
      { before: `${BA}/siding-before-framingham-ma.webp`, after: `${BA}/exterior-after-worcester-ma.webp`,
        caption: 'The same house before and after — brown Cape to navy-blue vinyl.' },
    ],
  },
  {
    id: 'worcester-ma-siding',
    slug: 'cedar-to-vinyl-siding-transformation-worcester-ma',
    title: 'Cedar-to-Vinyl Siding Transformation',
    location: 'Worcester, MA',
    service: 'Siding',
    image: `${BA}/exterior-before-worcester-ma.webp`,
    description:
      'Worn cedar shingles replaced with blue-grey vinyl siding and a rebuilt front porch on a Dutch Colonial.',
    featured: true,
    body: [
      'A Dutch Colonial in Worcester whose cedar shingles had reached the end of their life. They came off and blue-grey vinyl went on, with white trim on the gambrel, the porch columns and the window surrounds.',
      'The front porch and its railings were rebuilt at the same time, which is what pulls the whole elevation together.',
    ],
    pairs: [
      { before: `${BA}/siding-after-framingham-ma.webp`, after: `${BA}/exterior-before-worcester-ma.webp`,
        caption: 'Teal Dutch Colonial before, blue-grey vinyl and a rebuilt porch after.' },
    ],
  },
  {
    id: 'marlborough-ma-siding',
    slug: 'carriage-house-fiber-cement-siding-marlborough-ma',
    title: 'Carriage House Fiber-Cement Siding',
    location: 'Marlborough, MA',
    service: 'Siding',
    image: `${BA}/siding-after-marlborough-ma.webp`,
    description:
      'HardiePlank fiber-cement siding on a new carriage house — durable, low-maintenance protection built for New England weather.',
    body: [
      'A new carriage house in Marlborough clad in HardiePlank fiber-cement. Fiber-cement holds paint far longer than wood and does not move with the seasons the way vinyl can, which suits a building that has to match the main house for years.',
    ],
    pairs: [
      { before: `${BA}/siding-before-marlborough-ma.webp`, after: `${BA}/siding-after-marlborough-ma.webp`,
        caption: 'The carriage house before and after its fiber-cement cladding.' },
    ],
  },
  {
    id: 'natick-ma-siding',
    slug: 'split-level-siding-replacement-natick-ma',
    title: 'Split-Level Siding Replacement',
    location: 'Natick, MA',
    service: 'Siding',
    image: `${BA}/siding-after-natick-ma.webp`,
    description:
      'Full siding tear-off and replacement in grey vinyl over the original brick base, with black shutters and white trim.',
    featured: true,
    body: [
      'A split-level in Natick stripped and re-clad in grey vinyl, kept deliberately above the original brick base so the two materials read as a deliberate band rather than an accident.',
      'Black shutters and white window trim give the elevation the contrast it was missing.',
    ],
    pairs: [
      { before: `${BA}/siding-before-natick-ma.webp`, after: `${BA}/siding-after-natick-ma.webp`,
        caption: 'Tear-off and replacement — grey vinyl over the brick base.' },
    ],
  },
  {
    id: 'hudson-ma-siding',
    slug: 'complete-exterior-siding-hudson-ma',
    title: 'Complete Exterior Siding',
    location: 'Hudson, MA',
    service: 'Siding',
    image: `${BA}/siding-after-hudson-ma.webp`,
    description:
      'Full exterior siding installation in olive-green vinyl on a gambrel-roof home — weather-tight, energy-efficient and cleanly finished.',
    body: [
      'A gambrel-roof home in Hudson re-clad in olive-green vinyl, with white trim on the windows, the door hood and the rakes.',
    ],
    pairs: [
      { before: `${BA}/siding-before-hudson-ma.webp`, after: `${BA}/siding-after-hudson-ma.webp`,
        caption: 'The gambrel before and after its new olive-green exterior.' },
    ],
  },
];

/* Loose job photography that is not tied to a documented address.
 *
 * These were previously ten separate "projects" in ten different towns, which
 * produced five near-identical door cards and four window cards saying the same
 * thing, and asserted a town for each that nothing backs up. They are real Maia
 * photos, so they stay — as a gallery, captioned by what they show rather than
 * dressed up as distinct jobs. */
export interface GalleryPhoto {
  src: string;
  alt: string;
  caption: string;
  service: ServiceName;
}

export const galleryPhotos: GalleryPhoto[] = [
  { src: IMAGES.windows, service: 'Windows',
    alt: 'Full-house Marvin window replacement on a blue-grey clapboard home with a board-and-batten gable and an arched window, by Maia Construction',
    caption: 'Whole-house Marvin replacement, stickers still on.' },
  { src: IMAGES.windows2, service: 'Windows',
    alt: 'New white double-hung windows on a navy clapboard porch with a cedar tongue-and-groove ceiling, by Maia Construction',
    caption: 'Double-hungs on a navy porch, cedar ceiling above.' },
  { src: IMAGES.windows3, service: 'Windows',
    alt: 'Bow window and French patio doors on the grey clapboard rear elevation of a Massachusetts home, by Maia Construction',
    caption: 'Bow window and French doors on a rear elevation.' },
  { src: IMAGES.windows4, service: 'Windows',
    alt: 'Pella sliding door and windows being fitted into a new porch enclosure by Maia Construction',
    caption: 'Pella slider and windows going into a new porch enclosure.' },
  { src: IMAGES.doors, service: 'Doors',
    alt: 'White entry door with divided-lite glass under a new gabled portico on grey vinyl siding, by Maia Construction',
    caption: 'Entry door under a new gabled portico.' },
  { src: IMAGES.doors2, service: 'Doors',
    alt: 'Green panelled entry door with a metal-hooded portico against cedar shingle siding, by Maia Construction',
    caption: 'Panelled entry door under a metal-hooded portico.' },
  { src: IMAGES.doors3, service: 'Doors',
    alt: 'White entry door under a curved wood-soffit portico on a cedar-shingled gable, by Maia Construction',
    caption: 'Entry door under a curved wood-soffit portico.' },
  { src: IMAGES.doors4, service: 'Doors',
    alt: 'Navy entry door with divided-lite glass and white trim on a navy clapboard porch, by Maia Construction',
    caption: 'Navy entry door with divided-lite glass.' },
  { src: IMAGES.generalContractor, service: 'General Contractor',
    alt: 'Sage-green clapboard rear elevation with a paver patio at dusk, by Maia Construction',
    caption: 'Rear elevation and patio after a full exterior.' },
  { src: IMAGES.generalContractor2, service: 'General Contractor',
    alt: 'White board-and-batten new build with standing-seam metal roof accents, under construction by Maia Construction',
    caption: 'Board-and-batten new build with standing-seam accents.' },
];

/** Jobs with their own page — everything carrying real photography. */
export const detailedProjects = projects.filter((p) => p.slug);

export const getProject = (slug: string) => projects.find((p) => p.slug === slug);

/** Pairs shown in the slider rail outside /projects. */
export const featuredProjects = projects.filter((p) => p.featured && p.pairs?.length);

/* One pair per job for the slider rail, never all of them.
 *
 * Atkinson has five pairs and Norfolk three; flattening every pair put fifteen
 * rows in the rail and listed the same address five times over. The rail is a
 * teaser — the remaining pairs live on the job's own page, which is what the
 * "See the full project" link under the slider is for. */
export const allProjectPairs = projects
  .filter((p) => p.pairs?.length)
  .map((p) => ({ ...p.pairs![0], project: p, key: `${p.id}-0` }));

export const featuredProjectPairs = featuredProjects.map((p) => ({
  ...p.pairs![0],
  project: p,
  key: `${p.id}-0`,
}));

/** Every photo a project shows, cover first, de-duplicated. */
export function projectPhotos(p: Project): ProjectPhoto[] {
  const seen = new Set<string>();
  const out: ProjectPhoto[] = [];
  for (const g of p.gallery ?? []) {
    if (seen.has(g.src)) continue;
    seen.add(g.src);
    out.push(g);
  }
  for (const pair of p.pairs ?? []) {
    for (const src of [pair.after, pair.before]) {
      if (seen.has(src)) continue;
      seen.add(src);
      out.push({ src, alt: `${p.title} in ${p.location} — Maia Construction`, caption: pair.caption });
    }
  }
  return out;
}
