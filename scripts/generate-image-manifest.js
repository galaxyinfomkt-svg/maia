const sharp = require('sharp');
const fs = require('fs');

const HEADER = [
  '// Generated from public/images. Widths are the real intrinsic sizes of files',
  '// that exist on disk, so the browser can pick the smallest one that still',
  '// covers its layout box at full pixel density. Nothing is cropped or',
  '// upscaled — the variants are the same photograph at smaller sizes, so what',
  '// renders is identical.',
  '//',
  '// This exists because the project runs with images.unoptimized, which makes',
  '// next/image emit a single full-size source and no srcset.',
  '',
  'export interface ResponsiveImage { w: number; h: number; variants: number[] }',
  '',
].join('\n');

// Written with single quotes so ${...} stays literal in the emitted TypeScript.
const FOOTER = [
  '',
  '/** srcset for an image path, or undefined when no variants were generated. */',
  'export function srcSetFor(src: string): string | undefined {',
  '  const meta = responsiveImages[src];',
  '  if (!meta || meta.variants.length === 0) return undefined;',
  "  const stem = src.replace(/\\.webp$/, '');",
  '  const parts = meta.variants.map((w) => `${stem}-${w}w.webp ${w}w`);',
  '  parts.push(`${src} ${meta.w}w`);',
  "  return parts.join(', ');",
  '}',
  '',
  '/** Alias kept for the hero call sites. Same function. */',
  'export const heroSrcSet = srcSetFor;',
  '',
].join('\n');

(async () => {
  const out = {};
  for (const dir of ['hero', 'before-after']) {
    const d = 'public/images/' + dir;
    if (!fs.existsSync(d)) continue;
    const base = fs
      .readdirSync(d)
      .filter((f) => f.endsWith('.webp') && !/-\d+w\.webp$/.test(f))
      .sort();
    for (const f of base) {
      const stem = f.replace('.webp', '');
      const m = await sharp(d + '/' + f).metadata();
      const variants = [];
      for (const w of [200, 600, 640, 900]) {
        if (fs.existsSync(d + '/' + stem + '-' + w + 'w.webp')) variants.push(w);
      }
      if (variants.length) {
        out['/images/' + dir + '/' + f] = { w: m.width, h: m.height, variants };
      }
    }
  }
  const body =
    HEADER +
    'export const responsiveImages: Record<string, ResponsiveImage> = ' +
    JSON.stringify(out, null, 2) +
    ';\n' +
    FOOTER;
  fs.writeFileSync('src/lib/heroImages.ts', body);
  console.log('manifest: ' + Object.keys(out).length + ' images with variants');
})();
