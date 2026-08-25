/**
 * The real Google Business Profile reviews — 19 of them, all 5 stars, which is
 * where the 5.0/19 aggregate on the organization entity comes from.
 *
 * These replace the five invented ones ("Michael R.", "Sarah K.", …) that used
 * to sit in the JSON-LD of every page while appearing nowhere on any of them.
 * Everything here is a real person's words, and it is rendered as visible text
 * on /reviews/ — which is the condition Google's structured data policy puts on
 * marking reviews up at all.
 *
 * `excerpt: true` means Google's listing truncated the text with "View full
 * review" and we only hold the opening. Those are shown as excerpts and are
 * deliberately kept out of the Review markup, because reviewBody should carry
 * what the customer actually wrote, not the first half of it.
 *
 * Dates marked `approxDate` were derived from Google's relative display
 * ("5 weeks ago") as of 2026-08-24 and are accurate to about a week.
 */

export interface Review {
  author: string;
  rating: 5;
  /** ISO date. Approximate where `approxDate` is true. */
  date: string;
  approxDate?: boolean;
  /** Empty for the rating-only review. */
  text: string;
  /** True when Google truncated the text and we only hold the opening. */
  excerpt?: boolean;
  /** Named where the review says what the job was. */
  work?: string;
}

export const GOOGLE_PROFILE_URL = 'https://www.google.com/search?q=Maia+Construction+Charlton+MA';

export const reviews: Review[] = [
  {
    author: 'Rick Kizik',
    rating: 5,
    date: '2026-07-20',
    approxDate: true,
    text: 'Marcos did an amazing job. He spent a lot of time going over the plans and making sure everything was right. He kept me',
    excerpt: true,
  },
  {
    author: 'Dave, Village Dental Health',
    rating: 5,
    date: '2026-07-13',
    approxDate: true,
    work: 'ProVia storm door installation',
    text: 'Excellent service. Very thorough ProVia storm door installation. Marcos from Maia Construction was professional, courteous, kept me informed at all times. You should give him a try.',
  },
  {
    author: 'M & B’s Home',
    rating: 5,
    date: '2026-06-01',
    approxDate: true,
    text: 'Excellent and professional work by Marcos and crew.',
  },
  {
    author: 'Nathaniel Lee',
    rating: 5,
    date: '2026-05-11',
    approxDate: true,
    work: 'Siding and trim replacement',
    text: 'We had Maia Construction replace siding and trim and were very pleased with all of their work. They were extremely professional and timely and we had a very good experience.',
  },
  {
    author: 'Jonathan Edson',
    rating: 5,
    date: '2026-04-27',
    approxDate: true,
    text: 'We were very happy with the communication, punctuality, and overall work performed. The scope of work ended up being',
    excerpt: true,
  },
  {
    author: 'Brian DeFeo',
    rating: 5,
    date: '2026-04-20',
    approxDate: true,
    text: 'The guys did excellent work; they showed up every day on time. I was impressed with their hard work and craftmanship.',
    excerpt: true,
  },
  {
    author: 'Brent Hardenbergh',
    rating: 5,
    date: '2026-04-20',
    approxDate: true,
    work: 'Siding',
    text: 'Marcos and his crew do top quality work! Will use them for any and all future siding projects. They are on time, great',
    excerpt: true,
  },
  {
    author: 'Tom Renau',
    rating: 5,
    date: '2026-03-09',
    approxDate: true,
    work: 'Re-siding and trim',
    text: 'Marcos and his team did an awesome job on residing our house and doing all the trim. Would highly recommend.',
  },
  {
    author: 'Tatiana Schettini',
    rating: 5,
    date: '2025-09-29',
    approxDate: true,
    text: 'Enjoyed working with Marcos on my house. He was communicative throughout the project, punctual, honest and just a',
    excerpt: true,
  },
  {
    author: 'Mona Bottoni Derosby',
    rating: 5,
    date: '2025-09-08',
    approxDate: true,
    work: 'Siding on a new build in Burlington',
    text: 'I’ve completed many renovations over the years, but building a house in Burlington was a whole new experience—and I',
    excerpt: true,
  },
  {
    author: 'Kevin Shea',
    rating: 5,
    date: '2025-08-25',
    approxDate: true,
    work: 'New siding',
    text: 'Marcos installed new siding on my house. Their work is excellent. They work long hard hours. They were very respectful of my time and property. I highly recommend them.',
  },
  {
    author: 'Dirceu Filho',
    rating: 5,
    date: '2025-05-29',
    text: '',
  },
  {
    author: 'Ty Monroe',
    rating: 5,
    date: '2024-09-10',
    text: 'Marcos and his team do excellent work. They are very professional and courteous. We highly recommend them!',
  },
  {
    author: 'Kathie Balukas',
    rating: 5,
    date: '2024-01-23',
    work: 'Vinyl siding and new construction windows',
    text: 'Marcos and his crew did an amazing job on our home. We had vinyl siding put on along with new construction windows installed. We could not be happier and have already recommended them to others.',
  },
  {
    author: 'Suzanne Couture',
    rating: 5,
    date: '2023-08-24',
    text: 'Marcos and his crew were amazing! This was the best crew we’ve ever had at our house. The quality of the work is second',
    excerpt: true,
  },
  {
    author: 'Brian Fallica',
    rating: 5,
    date: '2023-08-17',
    work: '38 replacement windows',
    text: 'Marcos and his team replaced all 38 windows on my house in 2023. Marcos was communicative, transparent and very easy',
    excerpt: true,
  },
  {
    author: 'Naradas1974',
    rating: 5,
    date: '2023-07-26',
    text: 'Amazing work, great to deal with!',
    excerpt: true,
  },
  {
    author: 'Christina Cicolini',
    rating: 5,
    date: '2023-04-03',
    work: 'Fascia board and siding storm repair',
    text: 'After calling numerous handymen and professionals to fix our fascia board and siding after a winter storm, we found Maia',
    excerpt: true,
  },
  {
    author: 'Jacqueline Kelleher',
    rating: 5,
    date: '2022-08-11',
    text: 'I would not hesitate to and in fact, wholeheartedly recommend, Marcos and MAIA as a contractor at your home. Marcos and',
    excerpt: true,
  },
];

export const REVIEW_COUNT = reviews.length;
export const AVERAGE_RATING = '5.0';

/** Reviews we hold in full — the only ones eligible for Review markup. */
export const completeReviews = reviews.filter((r) => !r.excerpt && r.text.length > 0);

/**
 * A rotating trio for city and service pages, so each page shows real customer
 * words rather than the four invented testimonials that used to sit there — and
 * so neighbouring pages do not show the same three.
 */
export function reviewsFor(seed: string, count = 3): Review[] {
  const pool = reviews.filter((r) => r.text.length > 0);
  const idx = pool.map((_, i) => i);
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  h = Math.abs(h | 0) || 1;
  for (let i = idx.length - 1; i > 0; i--) {
    h = (Math.imul(h, 48271) + 11) >>> 0;
    const j = h % (i + 1);
    const t = idx[i];
    idx[i] = idx[j];
    idx[j] = t;
  }
  return idx.slice(0, count).map((i) => pool[i]);
}
