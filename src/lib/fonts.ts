/* Display face for the portfolio.
 *
 * The rest of the site is Inter, which is right for a phone number and a form
 * but says nothing about the work. The portfolio is the one place where this
 * company is selling craft, so it gets a high-contrast editorial serif — the
 * voice of an architecture monograph rather than a lead-gen template.
 *
 * Loaded through next/font so it is self-hosted and carries no layout shift,
 * and exposed as a CSS variable that only the pages that opt in will apply. */
import { Instrument_Serif } from 'next/font/google';

export const editorial = Instrument_Serif({
  subsets: ['latin'],
  weight: '400',
  style: ['normal', 'italic'],
  variable: '--font-instrument-serif',
  display: 'swap',
});
