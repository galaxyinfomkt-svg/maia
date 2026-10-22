import { Service } from '@/types';
import { IMAGES } from './constants';

const BA = '/images/before-after';

/* The nine services, all of them exterior-envelope work we actually do.

   House rule for this file: shared facts stay shared. Price bands, warranty
   terms and process are written once per service and are the same on every
   city page BECAUSE THEY ARE THE SAME IN REAL LIFE. City pages earn their
   difference in the local layer (local-content.ts), never by rewording the
   warranty. No invented percentages either — "cuts heating bills 30%" type
   claims were removed because nothing here can back them. */

const SHARED_STEPS = {
  survey: {
    name: 'Walk the exterior with you',
    description:
      'We look at every elevation, note the details worth keeping, and tell you what we expect to find behind the old material before we quote.',
  },
  quote: {
    name: 'Written scope and fixed price',
    description:
      'One document with the full scope, the material spec and an agreed rate for hidden damage, so nothing is renegotiated mid-job.',
  },
  permit: {
    name: 'Permit and scheduling',
    description: 'We file with your building department and give you a start date set against the material lead time.',
  },
  cleanup: {
    name: 'Inspection, cleanup and walkthrough',
    description: 'Municipal inspection, a magnet sweep for fasteners, and a final walk around the house with you before we invoice.',
  },
};

export const services: Service[] = [
  /* ─────────────────────────────────────────────────────────── VINYL ── */
  {
    id: 'siding',
    name: 'Vinyl Siding',
    slug: 'siding',
    shortName: 'vinyl siding',
    job: 'a vinyl siding installation',
    icon: '',
    image: `${BA}/siding-after-framingham-ma.webp`,
    shortDescription: 'Insulated and standard vinyl siding, installed over a proper drainage plane.',
    fullDescription:
      'Vinyl is the most common siding on Massachusetts homes for good reason: it does not need paint, it handles the swing from January to July, and it comes in profiles that suit a colonial as well as a ranch. What decides how long it lasts is the installation, not the brand. Vinyl moves with temperature, so it has to be hung, not nailed tight, and the wall behind it needs a drainage plane that lets water out.\n\nWe install CertainTeed and Alside vinyl, insulated or standard, over drainable housewrap with flashing at every opening. Every job includes the trim, soffit and fascia that tie the wall together.',
    features: [
      'Insulated and standard vinyl (CertainTeed, Alside)',
      'Complete tear-off and disposal',
      'Sheathing and rot repair where needed',
      'Drainable housewrap and taped seams',
      'Flashing at every window, door and roofline',
      'Trim, soffit and fascia',
      'Colour matching for partial elevations',
    ],
    benefits: [
      'No painting, ever',
      'Handles freeze-thaw when it is hung with room to move',
      'Insulated panels make a wall noticeably warmer to the touch',
      '25 to 50 year manufacturer warranties',
    ],
    costRange: '$12,000–$28,000 for a typical single-family exterior',
    timeline: 'about one to two weeks on site for an average two-storey home',
    warranty: 'a 25–50 year manufacturer warranty on the material and 5 years on our installation',
    challenges: [
      'original siding that has gone brittle and no longer holds a fastener',
      'panels nailed tight by a previous installer, which buckle in the first hot week',
      'wall sheathing that has taken on water behind a failed housewrap',
      'trim and fascia rot that only becomes visible once the old siding comes off',
    ],
    solutions: [
      'hanging each course with the expansion gap the manufacturer specifies, so the wall stays flat in year ten',
      'a drainable housewrap with taped seams behind the panels',
      'kick-out flashing where a roofline meets a wall, which is where most hidden rot starts',
      'rot repair priced at an agreed rate once the wall is open, not guessed at beforehand',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      SHARED_STEPS.permit,
      { name: 'Protection and tear-off', description: 'Beds and walkways covered, a container on site, then the old material comes off and you see what is underneath.' },
      { name: 'Drainage plane and flashing', description: 'Sheathing repairs first, then drainable wrap, then flashing lapped in the order water actually travels.' },
      { name: 'Hang the courses', description: 'Starter strip level, courses hung with the specified gap, corners and J-channel finished clean.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'On a coastal wall the vinyl itself is rarely the problem. The fasteners are. Salt air corrodes ordinary nails long before the panel weathers, so we hang coastal vinyl on corrosion-resistant fasteners and keep the laps tight.',
      'near-coastal':
        'This close to the water a vinyl wall gets salt on an onshore wind and a full freeze in winter. We use corrosion-resistant fasteners and leave the expansion gap exact, because the panel has to move in the cold without opening the laps the salt is looking for.',
      inland:
        'Inland, vinyl lives or dies on expansion. A panel can change length by a quarter inch between a January night and a July afternoon, so a wall nailed tight will ripple. We hang every course with the gap the manufacturer specifies.',
      upland:
        'In the colder interior the first two feet of a vinyl wall take the punishment: snow banks against it and meltwater refreezes at night. We pay most attention to the starter course and the flashing at the base of the wall.',
    },
    faq: [
      {
        q: 'Insulated vinyl or standard vinyl?',
        a: 'Insulated vinyl has a foam backer that makes the panel stiffer and the wall warmer to the touch. It costs more per square. On an older house with little wall insulation it is usually worth it; on a newer, well-insulated wall the gain is smaller. We tell you which case your house is.',
      },
    ],
  },

  /* ────────────────────────────────────────────────────── FIBER CEMENT ── */
  {
    id: 'fiber-cement-siding',
    name: 'Fiber Cement Siding',
    slug: 'fiber-cement-siding',
    shortName: 'fiber cement siding',
    job: 'a fiber cement installation',
    icon: '',
    image: `${BA}/siding-after-marlborough-ma.webp`,
    shortDescription: 'James Hardie fiber cement lap, panel and shingle, installed to the manufacturer’s spec.',
    fullDescription:
      'Fiber cement looks like painted wood, does not rot, and does not burn. It is heavier and more demanding to install than vinyl: it has to be cut with dust control, kept off the ground, gapped at the butt joints and flashed behind every joint. Get those details wrong and the manufacturer warranty does not apply.\n\nWe install James Hardie lap siding, panels and shingle, factory-finished or primed for paint, with the clearances and joint flashing Hardie requires.',
    features: [
      'James Hardie lap, panel and shingle',
      'Factory-finished (ColorPlus) or primed for paint',
      'Joint flashing behind every butt joint',
      'Required clearances to roofs, decks and grade',
      'Silica-dust-controlled cutting',
      'Trim, soffit and fascia',
    ],
    benefits: [
      'Does not rot and is not food for insects',
      'Non-combustible',
      'Holds paint far longer than wood',
      'Manufacturer warranty when installed to spec',
    ],
    costRange: 'quoted per house after a site visit; typically above vinyl for the same wall',
    timeline: 'usually two to three weeks on site for a full house, longer than vinyl because of the cutting and joint work',
    warranty: 'the James Hardie product warranty, which depends on installing to their spec, plus 5 years on our installation',
    challenges: [
      'boards installed touching a roof or deck, wicking water into the cut edge',
      'butt joints with no flashing behind them, the most common reason fiber cement fails early',
      'boards face-nailed in the wrong place, cracking at the corners',
      'paint failing on site-cut edges that were never sealed',
    ],
    solutions: [
      'the clearances Hardie requires at roofs, decks and grade, measured, not eyeballed',
      'flashing behind every butt joint',
      'blind-nailing where the profile allows it, and the correct fastener pattern where it does not',
      'every cut edge sealed before the board goes up',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      SHARED_STEPS.permit,
      { name: 'Tear-off and wall prep', description: 'Old material off, sheathing repaired, the wall checked for plane, because fiber cement shows every dip in low sun.' },
      { name: 'Wrap, flashing and clearances', description: 'Drainable wrap, opening flashing, and the clearance lines marked at roofs, decks and grade.' },
      { name: 'Install to spec', description: 'Boards cut with dust control, joints flashed, cut edges sealed, fasteners placed where the manufacturer requires.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'Fiber cement is a strong choice by the water because salt does nothing to the board. The weak points are the fasteners and the cut edges, so coastal installs get corrosion-resistant nails and every edge sealed.',
      'near-coastal':
        'Near the coast fiber cement handles both the salt and the freeze, provided the cut edges are sealed. An unsealed edge takes on water, freezes, and that is where the paint starts to go.',
      inland:
        'Inland, the enemy is water held at the joints through freeze-thaw. Flashing behind each butt joint and keeping the boards off roofs and decks is what keeps a fiber cement wall dry through a Worcester County winter.',
      upland:
        'On higher ground with snow banked against the wall, the bottom course is where fiber cement fails. We keep the required clearance to grade and seal the bottom edge, because a board sitting in meltwater will wick it.',
    },
    faq: [
      {
        q: 'Is fiber cement worth it over vinyl?',
        a: 'It costs more and takes longer to install. What you get is a wall that looks like painted wood, does not rot, and does not burn. On a house where the look matters, or near trees and decks where fire and insects are a concern, it usually earns its cost.',
      },
    ],
  },

  /* ────────────────────────────────────────────────────── CEDAR SHINGLE ── */
  {
    id: 'cedar-shingle-siding',
    name: 'Cedar Shingle Siding',
    slug: 'cedar-shingle-siding',
    shortName: 'cedar shingle siding',
    job: 'a cedar shingle job',
    icon: '',
    image: `${BA}/cedar-siding-reading-ma-2.webp`,
    shortDescription: 'Natural and pre-finished cedar shingles, coursed and nailed by hand.',
    fullDescription:
      'Cedar shingle is the traditional New England wall. Done well it lasts decades and weathers into the look people buy old houses for. It is slow, hand work: every course is laid out so the joints never line up with the course below, every shingle gets two nails, and the wall underneath has to breathe so the backs of the shingles can dry.\n\nWe install natural red and white cedar and pre-finished shingles, and we repair and match existing cedar walls.',
    features: [
      'Red and white cedar, natural or pre-finished',
      'Hand-coursed with offset joints',
      'Two stainless or hot-dipped nails per shingle',
      'Rainscreen or breathable underlayment',
      'Partial-wall repairs and matching',
      'Corner boards, trim and water table',
    ],
    benefits: [
      'The traditional look for colonials, capes and shingle-style houses',
      'Individual shingles can be replaced without disturbing the wall',
      'Weathers naturally or holds a stain or paint',
    ],
    costRange: 'quoted per house after a site visit; cedar is labour-intensive and prices above vinyl and fiber cement',
    timeline: 'longer than other siding; we give you a day count in the written quote',
    warranty: '5 years on our installation; pre-finished shingles also carry the manufacturer’s finish warranty',
    challenges: [
      'shingles nailed with plain steel nails that have rusted and stained the wall',
      'joints lined up course over course, letting water straight through',
      'cedar installed tight against plastic wrap, so the backs never dry and cup',
      'mismatched patches from earlier repairs',
    ],
    solutions: [
      'stainless or hot-dipped fasteners only',
      'course layout with joints offset at least an inch and a half',
      'a rainscreen or breathable underlayment so the back of each shingle can dry',
      'weaving new shingles into an existing wall so a repair does not show as a patch',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      SHARED_STEPS.permit,
      { name: 'Tear-off and underlayment', description: 'Old material off, sheathing repaired, then a breathable layer so the cedar can dry from behind.' },
      { name: 'Layout', description: 'Course exposure laid out from the water table to the eaves so the courses meet the windows evenly.' },
      { name: 'Hand coursing', description: 'Shingles laid with offset joints and two fasteners each, corners woven or finished on boards.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'Cedar has been the coastal wall in Massachusetts for three hundred years because it handles salt well. What does not handle salt is a plain steel nail, so on the coast we use stainless only.',
      'near-coastal':
        'Near the coast cedar weathers faster on the side that takes the onshore wind. Stainless fasteners and a wall that can dry from behind are what make the difference between a silver-grey wall and a cupped, stained one.',
      inland:
        'Inland, cedar fails when it cannot dry. A shingle wet on the back through a freeze-thaw winter cups and splits, which is why we put a breathable layer behind it rather than plastic.',
      upland:
        'In the snowier interior the lowest courses stay wet the longest. We keep the first course well clear of grade and pay attention to the water table board, because that is where a cedar wall up here starts to rot.',
    },
    faq: [
      {
        q: 'Can you repair part of a cedar wall without redoing the whole side?',
        a: 'Usually, yes. Individual shingles can be removed and woven in. New cedar will be lighter than weathered cedar for a season or two; we can pre-stain to bring them closer.',
      },
    ],
  },

  /* ────────────────────────────────────────────────────────── CLAPBOARD ── */
  {
    id: 'clapboard-siding',
    name: 'Clapboard Siding',
    slug: 'clapboard-siding',
    shortName: 'clapboard siding',
    job: 'a clapboard job',
    icon: '',
    image: `${BA}/siding-after-hudson-ma.webp`,
    shortDescription: 'Traditional lap clapboard in wood, fiber cement or vinyl, with period trim kept intact.',
    fullDescription:
      'Clapboard is the narrow horizontal lap you see on most New England colonials and capes. We install it in three materials: primed wood for houses where the original look matters most, fiber cement for the same look without the rot, and vinyl clapboard profiles where low maintenance comes first.\n\nOn older houses the job is as much about the trim as the boards. Corner boards, window casings and the water table are what make a clapboard wall read as original, and we keep or rebuild them rather than wrapping them in aluminium.',
    features: [
      'Primed wood clapboard (pine and cedar)',
      'Fiber cement lap in clapboard exposures',
      'Vinyl clapboard profiles',
      'Original exposure matched on partial walls',
      'Corner boards, casings and water table rebuilt',
      'Back-primed boards on wood installs',
    ],
    benefits: [
      'Keeps the original character of a colonial or cape',
      'Three materials, so you can trade cost against upkeep',
      'Partial walls can be matched to the existing exposure',
    ],
    costRange: 'quoted per house after a site visit; wood and fiber cement price above vinyl clapboard',
    timeline: 'about one to three weeks on site depending on the material and trim detail',
    warranty: 'the material manufacturer’s warranty where one applies, plus 5 years on our installation',
    challenges: [
      'original wood clapboard with failing paint and split boards',
      'trim wrapped in aluminium decades ago, hiding rot underneath',
      'mismatched board exposure from earlier patch repairs',
      'boards installed without back-priming, cupping as they dry',
    ],
    solutions: [
      'matching the original exposure so repairs disappear into the wall',
      'removing old aluminium wrap and rebuilding the trim underneath',
      'back-priming every wood board before it goes up',
      'a drainable wrap behind the boards so the wall can dry',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      SHARED_STEPS.permit,
      { name: 'Strip and inspect', description: 'Old boards and any trim wrap removed, so we can see the sheathing and the trim that is worth saving.' },
      { name: 'Trim first', description: 'Corner boards, casings and water table repaired or rebuilt before a single board goes on.' },
      { name: 'Lay the courses', description: 'Exposure laid out to meet the window heads evenly, boards fastened and joints staggered.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'On the coast, wood clapboard needs paint more often, so many coastal owners choose fiber cement in a clapboard exposure: the same look, without the repainting cycle salt air forces on wood.',
      'near-coastal':
        'Near the coast a clapboard wall gets salt and hard freezes. Back-primed wood or fiber cement with sealed cut edges is what keeps the paint on.',
      inland:
        'Inland, clapboard fails where water sits on the top edge of each board and freezes. Correct lap, a drainable wrap and sound trim at the windows are what keep it dry.',
      upland:
        'In the colder interior, snow against the lower courses and the water table board is where clapboard rots first. We rebuild the water table properly and keep the bottom board well above grade.',
    },
    faq: [
      {
        q: 'Wood, fiber cement or vinyl clapboard?',
        a: 'Wood looks the most original and needs painting. Fiber cement looks almost the same and holds paint much longer. Vinyl costs least and needs no paint but reads differently up close. On a historic house we usually recommend wood or fiber cement.',
      },
    ],
  },

  /* ──────────────────────────────────────────────── FULL REPLACEMENT ── */
  {
    id: 'siding-replacement',
    name: 'Siding Replacement',
    slug: 'siding-replacement',
    shortName: 'siding replacement',
    job: 'a full siding replacement',
    icon: '',
    image: `${BA}/exterior-after-worcester-ma.webp`,
    shortDescription: 'Whole-house tear-off down to the sheathing, repairs, and a new exterior in the material you choose.',
    fullDescription:
      'A full replacement is the one chance in thirty years to see the wall behind the siding. We take every elevation down to the sheathing, show you what we find, repair it at an agreed rate, and then put the house back together with a proper drainage plane, new flashing and the siding you choose.\n\nMost of our replacements are on houses whose first siding has reached the end of its life: brittle vinyl, aluminium, asbestos-cement or painted wood that will no longer hold paint.',
    features: [
      'Complete tear-off of any existing siding',
      'Asbestos-cement siding handled and disposed of correctly',
      'Sheathing and framing repair',
      'New drainable housewrap and flashing',
      'Vinyl, fiber cement, cedar or clapboard',
      'New trim, soffit and fascia',
    ],
    benefits: [
      'Every problem behind the old siding found and fixed',
      'A new drainage plane, not just a new surface',
      'One fixed price with an agreed rate for hidden damage',
    ],
    costRange: '$12,000–$28,000 for a typical single-family exterior in vinyl; other materials quoted per house',
    timeline: 'about one to two weeks for vinyl on an average two-storey home, longer for fiber cement or cedar',
    warranty: 'the manufacturer’s material warranty plus 5 years on our installation',
    challenges: [
      'old siding fastened over earlier siding, sometimes two layers deep',
      'asbestos-cement shingles that have to be removed and disposed of correctly',
      'sheathing that has taken on water behind a failed or missing housewrap',
      'rotted sills and band joists at the base of the wall',
    ],
    solutions: [
      'stripping every layer to the sheathing rather than covering over',
      'correct handling and disposal of asbestos-cement material',
      'sheathing and sill repairs photographed and priced at the agreed rate',
      'a new drainage plane and flashing at every opening',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      SHARED_STEPS.permit,
      { name: 'Full tear-off', description: 'Every layer comes off, down to the sheathing, with the site protected and a container on site.' },
      { name: 'Repair what we find', description: 'Rot and water damage repaired, photographed and shown to you before it is covered.' },
      { name: 'New wall, start to finish', description: 'Wrap, flashing, siding and trim, installed as one system.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'On a coastal house a replacement is the moment to switch to corrosion-resistant fasteners and flashing throughout, because whatever was used the first time is usually what failed.',
      'near-coastal':
        'Near the coast, the old wall usually shows salt damage at the fasteners and freeze damage at the seams. A replacement fixes both at once: new fixings and a drainage plane that lets the wall dry.',
      inland:
        'On inland houses the damage we find behind old siding is almost always water that got in at a seam or an opening and froze there for years. That is why every replacement gets new flashing, not just new panels.',
      upland:
        'On the higher ground the rot is concentrated at the base of the wall, where snow sat against it. We open the bottom of the wall first and expect to repair sills and band joists.',
    },
    faq: [
      {
        q: 'Can you put new siding over the old?',
        a: 'Sometimes it is physically possible, but we rarely recommend it. Covering over hides whatever is happening to the sheathing, and it is usually the reason the old siding failed in the first place.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────── REPAIR ── */
  {
    id: 'siding-repair',
    name: 'Siding Repair',
    slug: 'siding-repair',
    shortName: 'siding repair',
    job: 'a siding repair',
    icon: '',
    image: `${BA}/siding-atkinson-nh-sheathing.webp`,
    shortDescription: 'Storm damage, cracked panels, rot and leaks fixed and matched to the existing wall.',
    fullDescription:
      'Not every wall needs replacing. Storm damage, a cracked panel, a leak around a window or a patch of rot can usually be repaired, and done properly the repair does not show. The work is finding the actual cause: a water stain inside is often coming from a flashing failure a few feet away from where it shows.\n\nWe repair vinyl, fiber cement, cedar and wood siding, match profiles and colours as closely as the existing material allows, and document storm damage for insurance claims.',
    features: [
      'Storm and wind damage',
      'Cracked or missing panels',
      'Rot and water damage behind the siding',
      'Leaks around windows, doors and rooflines',
      'Profile and colour matching',
      'Photo documentation for insurance claims',
    ],
    benefits: [
      'Fixes the cause, not just the visible damage',
      'Costs a fraction of a replacement when the rest of the wall is sound',
      'Honest advice when repair is no longer the right answer',
    ],
    costRange: 'priced per repair after we have seen the damage',
    timeline: 'most repairs take one to three days once the material is on hand',
    warranty: '5 years on our workmanship for the repaired section',
    challenges: [
      'a leak that shows inside far from where the water actually gets in',
      'faded existing siding that no new panel will match exactly',
      'discontinued profiles on older vinyl',
      'rot that has spread further behind the siding than the visible damage suggests',
    ],
    solutions: [
      'tracing the water path back to the real entry point before replacing anything',
      'borrowing matching panels from a hidden elevation when a colour has faded',
      'telling you plainly when the rot has gone far enough that replacement is the better spend',
      'photos of every stage for your records or your insurer',
    ],
    steps: [
      { name: 'Find the cause', description: 'We look at the damage and trace where the water or the failure actually starts.' },
      { name: 'Written price', description: 'A price for the repair and a plain answer on whether repair or replacement makes more sense.' },
      { name: 'Open and repair', description: 'Damaged material out, sheathing and framing repaired, flashing corrected.' },
      { name: 'Match and close up', description: 'New material matched to the existing wall as closely as it allows, then a walk-round with you.' },
    ],
    exposureNotes: {
      coastal:
        'On the coast the repairs we do most are fastener and flashing failures: salt has eaten the original nails or the flashing around an opening, and the panels have started to come loose.',
      'near-coastal':
        'Near the coast we see both salt-corroded fasteners and freeze-damaged seams, often on the same wall. The repair has to deal with whichever one actually let the water in.',
      inland:
        'Inland, most repairs start with a seam that freeze-thaw has slowly opened, or a window head that was never flashed. Fixing the panel without fixing that just moves the leak.',
      upland:
        'On the higher ground the damage is usually at the bottom of the wall, from snow and meltwater. We check the sill and the starter course whenever we repair a lower panel.',
    },
    faq: [
      {
        q: 'Will a repair match my existing siding?',
        a: 'As closely as the existing material allows. Faded siding never matches new stock perfectly, so where colour matters we take panels from a hidden wall for the visible repair and put the new ones out of sight.',
      },
    ],
  },

  /* ────────────────────────────────────────────────────── EXTERIOR TRIM ── */
  {
    id: 'exterior-trim',
    name: 'Exterior Trim',
    slug: 'exterior-trim',
    shortName: 'exterior trim',
    job: 'an exterior trim job',
    icon: '',
    image: `${BA}/trim-after-woburn-ma.webp`,
    shortDescription: 'Soffit, fascia, corner boards and window trim in PVC or wood, built to shed water.',
    fullDescription:
      'Trim is where most exterior rot starts. Fascia behind a gutter, the bottom of a corner board, a window sill that holds water: these are the places water sits. We replace and rebuild soffit, fascia, rake boards, corner boards and window and door casings, in cellular PVC that does not rot or in wood where the house calls for it.\n\nTrim can be done on its own or alongside new siding, and custom profiles can be matched to what is already on the house.',
    features: [
      'Fascia and rake boards',
      'Vented and solid soffit',
      'Corner boards and water table',
      'Window and door casings and sills',
      'Cellular PVC (AZEK and similar) or wood',
      'Custom profiles matched to the existing house',
    ],
    benefits: [
      'PVC trim does not rot and does not need paint to survive',
      'Proper soffit venting helps the roof deck dry',
      'Fixes the details that make the rest of the exterior last',
    ],
    costRange: 'quoted per job after a site visit',
    timeline: 'usually two to five days depending on how much trim is involved',
    warranty: 'the manufacturer’s warranty on PVC trim plus 5 years on our installation',
    challenges: [
      'fascia rotted behind the gutter where no one can see it',
      'old trim wrapped in aluminium that trapped water against the wood',
      'soffits with no venting, keeping the roof deck damp',
      'window sills pitched toward the house instead of away from it',
    ],
    solutions: [
      'cellular PVC at the places water sits, wood where the house calls for it',
      'soffit venting matched to the attic',
      'sills and casings rebuilt to pitch water away from the wall',
      'custom profiles milled to match original trim',
    ],
    steps: [
      SHARED_STEPS.survey,
      SHARED_STEPS.quote,
      { name: 'Remove and inspect', description: 'Old trim and any wrap come off, and we check the framing behind it.' },
      { name: 'Repair and rebuild', description: 'Rotted framing repaired, then new trim installed with joints sealed and fasteners set.' },
      SHARED_STEPS.cleanup,
    ],
    exposureNotes: {
      coastal:
        'On the coast, PVC trim with stainless fasteners is the default: it shrugs off salt, and painted wood trim by the water needs attention far more often.',
      'near-coastal':
        'Near the coast, trim takes salt on the wind and freezes in winter. PVC with properly sealed joints handles both without the yearly paint touch-ups wood would need.',
      inland:
        'Inland, trim rots where water sits and freezes: the bottom of corner boards, flat window sills, fascia behind gutters. We rebuild those points to shed water, not hold it.',
      upland:
        'In the snowier interior, ice dams push water up behind fascia and into soffits. We check the roof edge and use materials there that will not rot if it happens again.',
    },
    faq: [
      {
        q: 'PVC or wood trim?',
        a: 'PVC does not rot and holds paint well, so it is our default at the places water sits. On a historic house, or where a profile has to match original wood exactly, we use wood and detail it to shed water.',
      },
    ],
  },

  /* ──────────────────────────────────────────────────────────── WINDOWS ── */
  {
    id: 'windows',
    name: 'Windows',
    slug: 'windows',
    shortName: 'window replacement',
    job: 'a window replacement',
    icon: '',
    image: IMAGES.windows,
    shortDescription: 'ENERGY STAR replacement windows, measured and flashed opening by opening.',
    fullDescription:
      'A window is only as good as the opening it sits in. We measure every opening individually, choose glass for the direction each wall faces, and flash every unit with a sill pan so water sheds outward. Where the frame is sound we can fit an insert and keep the interior trim; where the sill or jamb is compromised we do a full-frame replacement rather than hide it.\n\nWe install double and triple-pane units in vinyl, fiberglass and wood-clad frames, in double-hung, casement, awning, bay, bow and picture styles.',
    features: [
      'ENERGY STAR double and triple-pane units',
      'Full-frame and insert replacement',
      'Custom sizing for out-of-square openings',
      'Bedroom egress compliance',
      'Bay, bow and picture windows',
      'Sill pan flashing and air sealing',
      'Interior and exterior trim restoration',
    ],
    benefits: [
      'Fewer drafts and less condensation',
      'Glass chosen per elevation, not one spec for the house',
      'Limited lifetime manufacturer warranties',
    ],
    costRange: '$650–$1,400 per opening installed, depending on size and frame',
    timeline: 'one to three days for a typical whole-house replacement',
    warranty: 'a limited lifetime manufacturer warranty on the units and 5 years on our installation',
    challenges: [
      'rotted sills under windows that were poorly flashed the first time',
      'out-of-square openings in older homes, where a stock unit will never seal',
      'double-pane units from the nineties with blown seals and permanent fogging',
      'sash weight pockets left empty and uninsulated',
    ],
    solutions: [
      'full-frame replacement where the sill or jamb is compromised',
      'custom-sized units so the seal is even all the way round',
      'sill pan flashing and low-expansion foam at every opening',
      'weight pockets insulated once the old cords are gone',
    ],
    steps: [
      { name: 'Measure every opening', description: 'Each one measured at three points. Older frames are rarely square.' },
      { name: 'Choose glass and frame', description: 'Coating and gas fill matched to the direction each wall faces.' },
      { name: 'Written quote and permit', description: 'Priced per opening, permit filed by us, egress checked on bedrooms.' },
      { name: 'Protected removal', description: 'One opening closed before the next is opened; interiors covered throughout.' },
      { name: 'Set, flash and air-seal', description: 'Sill pan, shims at the load points, low-expansion foam, flashing lapped outward.' },
      { name: 'Trim and handover', description: 'Trim finished, every sash operated with you, inspection signed off.' },
    ],
    exposureNotes: {
      coastal:
        'Coastal windows take wind-driven rain that finds any gap in the flashing. Sill pans and properly lapped flashing tape matter more by the water than the glass package does.',
      'near-coastal':
        'Near the coast, windows face wind-driven rain and a full heating season. We flash for the rain and pick the glass coating for the cold.',
      inland:
        'Inland, the heating season is long, so glass coating and gas fill earn their cost, and air-sealing the gap around the unit matters as much as the unit itself.',
      upland:
        'In the colder interior, triple-pane glass and careful air-sealing earn their cost faster than anywhere else in our area, especially on north and west walls.',
    },
    faq: [
      {
        q: 'Insert or full-frame replacement?',
        a: 'If the existing frame and sill are sound, an insert keeps your interior trim and costs less. If the sill is soft or the frame is out of square, a full-frame replacement is the only way to get a proper seal.',
      },
    ],
  },

  /* ────────────────────────────────────────────────────────────── DOORS ── */
  {
    id: 'doors',
    name: 'Doors',
    slug: 'doors',
    shortName: 'door installation',
    job: 'a door installation',
    icon: '',
    image: IMAGES.doors,
    shortDescription: 'Entry, patio and storm doors, set in a square, properly flashed opening.',
    fullDescription:
      'Most door problems are opening problems: a sill that was never flashed, framing that has settled out of square, a threshold set to the wrong height. We check and repair the opening before the new unit goes in, set it on a sill pan, and fix it through to the framing rather than the jamb alone.\n\nWe install fiberglass and steel entry doors from Therma-Tru and ProVia, sliding and French patio doors, and storm doors.',
    features: [
      'Fiberglass entry doors (Therma-Tru, ProVia)',
      'Insulated steel entry doors',
      'Sliding and French patio doors',
      'Storm doors',
      'Sidelights and transoms',
      'Sill pan flashing and threshold repair',
      'Multi-point and smart lock hardware',
    ],
    benefits: [
      'A door that latches cleanly and seals',
      'Opening repaired, not shimmed around',
      'Limited lifetime coverage on fiberglass slabs',
    ],
    costRange: '$1,800–$5,500 installed, depending on the unit and the opening',
    timeline: 'one day for most entry doors; we never leave an opening unsecured overnight',
    warranty: 'the manufacturer’s warranty on the unit and 5 years on our installation',
    challenges: [
      'a rotted sill and threshold under a door that was never flashed',
      'settled framing that leaves the opening out of square',
      'sliding doors running on worn tracks no adjustment will fix',
      'hinge screws pulled out of soft jamb material',
    ],
    solutions: [
      'rebuilding the opening square before the new unit goes in',
      'a flashed sill pan under every threshold',
      'long screws through to framing at the hinge points',
      'fiberglass slabs on entries that take the weather',
    ],
    steps: [
      { name: 'Assess the opening', description: 'Framing, sill and threshold checked for rot and square before we quote.' },
      { name: 'Select the unit', description: 'Slab, glass, finish and hardware chosen for how exposed the entry is.' },
      { name: 'Order to the real opening', description: 'Ordered to measured dimensions, swing and hinge side confirmed in writing.' },
      { name: 'Remove and repair', description: 'Old unit out, rot cut out and replaced before the new unit goes in.' },
      { name: 'Set, flash and seal', description: 'Sill pan first, unit set plumb and fixed to framing, then weatherstripped.' },
      { name: 'Hardware and handover', description: 'Lock, sweep and hinges adjusted, keys and warranty handed over.' },
    ],
    exposureNotes: {
      coastal:
        'A coastal entry takes wind-driven rain and salt. Fiberglass slabs, stainless hardware and a properly pitched sill are what keep it working.',
      'near-coastal':
        'Near the coast, an exposed entry gets salt on the hardware and freeze-thaw at the threshold. We flash the sill and choose hardware that will not corrode.',
      inland:
        'Inland, the threshold is the weak point: water that gets under it freezes and lifts it. A flashed sill pan is what stops that.',
      upland:
        'In the snowier interior, snow piles against the door and meltwater sits at the threshold. We set the sill pan and pitch carefully, and recommend a storm door or overhang on exposed entries.',
    },
    faq: [
      {
        q: 'Fiberglass or steel?',
        a: 'Fiberglass holds its shape through the seasons and does not dent or rust, so it is our default for exposed entries. Insulated steel costs less and is very secure; it suits a covered entry well.',
      },
    ],
  },
];

export function getServiceBySlug(slug: string): Service | undefined {
  return services.find((service) => service.slug === slug);
}

export function getAllServiceSlugs(): string[] {
  return services.map((service) => service.slug);
}

/** The seven siding-family services, for grouping in navigation. */
export const SIDING_SERVICES = services.filter((s) => s.slug !== 'windows' && s.slug !== 'doors');
