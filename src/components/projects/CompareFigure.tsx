'use client';

import Image from 'next/image';
import { useId, useState } from 'react';

/* One before/after comparison.
 *
 * The site already has a before/after rail (components/sections/BeforeAfter),
 * which is a carousel of one pair per job for the marketing pages. This is the
 * portfolio version: a single pair, shown at full width, driven by a real
 * <input type="range"> so the thing is operable with a keyboard and announced
 * by a screen reader instead of being a div that listens for mousemove. */

interface CompareFigureProps {
  before: string;
  after: string;
  /** Pairs that are mid-job rather than original condition say so. */
  beforeLabel?: string;
  alt: string;
  caption?: string;
  priority?: boolean;
}

export default function CompareFigure({
  before,
  after,
  beforeLabel = 'Before',
  alt,
  caption,
  priority = false,
}: CompareFigureProps) {
  const [reveal, setReveal] = useState(55);
  const id = useId();

  return (
    <figure className="group">
      <div className="relative aspect-[16/11] w-full overflow-hidden bg-ink-soft select-none">
        {/* Finished state sits underneath — the reveal wipes the old one away. */}
        <Image
          src={after}
          alt={`${alt} — finished`}
          fill
          sizes="(max-width: 1024px) 100vw, 1100px"
          priority={priority}
          className="object-cover"
        />

        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - reveal}% 0 0)` }}
        >
          <Image
            src={before}
            alt={`${alt} — ${beforeLabel.toLowerCase()}`}
            fill
            sizes="(max-width: 1024px) 100vw, 1100px"
            priority={priority}
            className="object-cover"
          />
        </div>

        {/* Seam */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 w-px bg-bone/90 shadow-[0_0_30px_rgba(0,0,0,0.55)]"
          style={{ left: `${reveal}%` }}
        />

        {/* Labels. They fade down when the seam gets close so they never sit on
            top of the wrong half of the photograph. */}
        <span
          className="pointer-events-none absolute left-5 top-5 bg-ink/80 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-bone backdrop-blur-sm transition-opacity duration-300"
          style={{ opacity: reveal < 22 ? 0 : 1 }}
        >
          {beforeLabel}
        </span>
        <span
          className="pointer-events-none absolute right-5 top-5 bg-amber-400 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.22em] text-ink transition-opacity duration-300"
          style={{ opacity: reveal > 78 ? 0 : 1 }}
        >
          After
        </span>

        <label htmlFor={id} className="sr-only">
          {`Reveal the ${beforeLabel.toLowerCase()} photograph: ${alt}`}
        </label>
        <input
          id={id}
          type="range"
          min={0}
          max={100}
          step={0.5}
          value={reveal}
          onChange={(e) => setReveal(Number(e.target.value))}
          aria-valuetext={`${Math.round(reveal)}% ${beforeLabel.toLowerCase()}`}
          className="compare-range absolute inset-x-0 top-1/2 z-10 h-14 w-full -translate-y-1/2 cursor-ew-resize"
        />

        {/* Handle glyph, parked under the native thumb. */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 z-0 -translate-x-1/2 -translate-y-1/2 text-ink"
          style={{ left: `${reveal}%` }}
        >
          <svg width="22" height="14" viewBox="0 0 22 14" fill="none" stroke="currentColor" strokeWidth="1.6">
            <path d="M8 1.5 2.5 7 8 12.5M14 1.5 19.5 7 14 12.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>

        <span className="pointer-events-none absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.3em] text-bone/70 transition-opacity duration-500 group-hover:opacity-0">
          Drag
        </span>
      </div>

      {caption && (
        <figcaption className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink/60">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
