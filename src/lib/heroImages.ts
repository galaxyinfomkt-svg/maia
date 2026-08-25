// Generated from public/images/hero by scripts. Widths are the real
// intrinsic sizes, so the browser can pick the smallest file that still
// covers the viewport at full density — no upscaling, no quality loss.
export interface HeroVariant { w: number; h: number; variants: number[] }

export const heroImages: Record<string, HeroVariant> = {
  "/images/hero/hero-6834e26266829d658f8eab6c.webp": {
    "w": 1280,
    "h": 720,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68a38d825313006ec55c2a52.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb9169b20028c4b5dc9030.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb918e47f24da26ecb147e.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb918ec535bec22d71d549.webp": {
    "w": 1350,
    "h": 1688,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb92a11ff6ea5ace0517d7.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb92a147f24d34a4cb2441.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb92a147f24d8291cb2442.webp": {
    "w": 1080,
    "h": 1350,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb94791ff6ea156705431b.webp": {
    "w": 1500,
    "h": 1000,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb947947f24d6531cb52a6.webp": {
    "w": 1500,
    "h": 1000,
    "variants": [
      640,
      900
    ]
  },
  "/images/hero/hero-68bb9479b200283b40dccf5b.webp": {
    "w": 1500,
    "h": 1000,
    "variants": [
      640,
      900
    ]
  }
};

/** srcset for a hero path, or undefined when the image has no variants. */
export function heroSrcSet(src: string): string | undefined {
  const meta = heroImages[src];
  if (!meta || meta.variants.length === 0) return undefined;
  const stem = src.replace(/\.webp$/, '');
  const parts = meta.variants.map((w) => `${stem}-${w}w.webp ${w}w`);
  parts.push(`${src} ${meta.w}w`);
  return parts.join(', ');
}
