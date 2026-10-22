export type ExposureBand = 'coastal' | 'near-coastal' | 'inland' | 'upland';

export interface Service {
  id: string;
  /** Title-case name for headings, e.g. "Fiber Cement Siding". */
  name: string;
  slug: string;
  /** Lower-case noun phrase for use mid-sentence, e.g. "fiber cement siding". */
  shortName: string;
  /** The work as a noun phrase, e.g. "a fiber cement installation". */
  job: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  icon: string;
  /** What is included — the checklist on service pages. */
  features: string[];
  /** Plain, verifiable reasons to choose it. No invented percentages. */
  benefits: string[];
  /** Identical on every page because it is identical in real life. */
  costRange: string;
  timeline: string;
  warranty: string;
  /** What we typically find when we open up this kind of job. */
  challenges: string[];
  /** How we handle it. */
  solutions: string[];
  steps: { name: string; description: string }[];
  /** How this specific material or job behaves in each climate band. */
  exposureNotes: Record<ExposureBand, string>;
  /** Questions homeowners ask about this service specifically. */
  faq: { q: string; a: string }[];
}
