'use client';

import Image from 'next/image';
import { useCallback, useEffect, useState } from 'react';

/* The project photo set, with a lightbox.
 *
 * A contractor's portfolio lives or dies on being able to look closely at the
 * work, and a 33vw thumbnail of a trim detail shows nothing. Clicking opens the
 * photograph large; arrow keys and Escape work, and the overlay is a dialog so
 * assistive tech announces it rather than leaving the reader on the grid. */

export interface GalleryItem {
  src: string;
  alt: string;
  caption: string;
  /** Optional eyebrow, used by the loose job photography on /projects. */
  tag?: string;
}

interface PhotoGalleryProps {
  photos: GalleryItem[];
  /** Tall first cell, then a 3-up rhythm. Off for the even grid on /projects. */
  feature?: boolean;
  columns?: 3 | 4 | 5;
}

export default function PhotoGallery({ photos, feature = false, columns = 3 }: PhotoGalleryProps) {
  const [open, setOpen] = useState<number | null>(null);

  const close = useCallback(() => setOpen(null), []);
  const step = useCallback(
    (delta: number) =>
      setOpen((i) => (i === null ? null : (i + delta + photos.length) % photos.length)),
    [photos.length]
  );

  useEffect(() => {
    if (open === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') step(1);
      if (e.key === 'ArrowLeft') step(-1);
    };
    document.addEventListener('keydown', onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = overflow;
    };
  }, [open, close, step]);

  const active = open === null ? null : photos[open];
  const gridCols =
    columns === 5
      ? 'grid-cols-2 sm:grid-cols-3 lg:grid-cols-5'
      : columns === 4
        ? 'grid-cols-2 lg:grid-cols-4'
        : 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3';

  return (
    <>
      <div className={`grid gap-px bg-ink/10 ${gridCols}`}>
        {photos.map((photo, i) => (
          <button
            key={photo.src + i}
            type="button"
            onClick={() => setOpen(i)}
            className={`group relative block w-full overflow-hidden bg-bone-deep text-left ${
              feature && i === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
            }`}
          >
            <div className={`relative ${feature && i === 0 ? 'aspect-[4/3] sm:aspect-square' : 'aspect-[4/3]'}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={
                  columns === 5
                    ? '(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 20vw'
                    : '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
                }
                className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.04]"
              />
              <span className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              {photo.tag && (
                <span className="absolute left-3 top-3 bg-bone/90 px-2 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-ink">
                  {photo.tag}
                </span>
              )}
              <span className="absolute inset-x-0 bottom-0 translate-y-2 p-4 text-[13px] leading-snug text-bone opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100">
                {photo.caption}
              </span>
              <span className="absolute right-3 top-3 flex h-8 w-8 items-center justify-center rounded-full bg-bone/95 text-ink opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.7" aria-hidden="true">
                  <path d="M1 5V1h4M13 9v4H9M9 1h4v4M5 13H1V9" strokeLinecap="round" />
                </svg>
              </span>
            </div>
          </button>
        ))}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={active.alt}
          className="fixed inset-0 z-[90] flex flex-col bg-ink/97 backdrop-blur-sm"
        >
          <div className="flex items-center justify-between border-b border-ink-line px-5 py-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-bone/55">
              {String((open ?? 0) + 1).padStart(2, '0')} / {String(photos.length).padStart(2, '0')}
            </p>
            <button
              type="button"
              onClick={close}
              autoFocus
              className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-bone/70 transition-colors hover:text-amber-400"
            >
              Close
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
                <path d="M1 1l12 12M13 1L1 13" strokeLinecap="round" />
              </svg>
            </button>
          </div>

          <div className="relative flex-1">
            <Image
              key={active.src}
              src={active.src}
              alt={active.alt}
              fill
              sizes="100vw"
              className="object-contain work-rise"
            />
            <button
              type="button"
              onClick={() => step(-1)}
              aria-label="Previous photo"
              className="absolute left-0 top-0 h-full w-1/5 cursor-w-resize focus-visible:bg-bone/5"
            />
            <button
              type="button"
              onClick={() => step(1)}
              aria-label="Next photo"
              className="absolute right-0 top-0 h-full w-1/5 cursor-e-resize focus-visible:bg-bone/5"
            />
          </div>

          <p className="mx-auto max-w-3xl px-6 py-6 text-center text-[15px] leading-relaxed text-bone/75">
            {active.caption}
          </p>
        </div>
      )}
    </>
  );
}
