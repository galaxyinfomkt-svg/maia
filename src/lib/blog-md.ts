/* Articles written as Markdown files in src/content/blog-md/<slug>.md (frontmatter + a
   small Markdown subset rendered by components/blog/Markdown.tsx). Read at build time. */
import fs from 'fs';
import path from 'path';
import type { BlogPostMeta } from '@/types';

const DIR = path.join(process.cwd(), 'src/content/blog-md');

interface MdPost { meta: BlogPostMeta & { imageAlt?: string }; body: string }

function parse(file: string): MdPost | null {
  const raw = fs.readFileSync(file, 'utf8').replace(/\r\n/g, '\n');
  const m = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!m) return null;
  const fm: Record<string, string> = {};
  for (const line of m[1].split('\n')) {
    const i = line.indexOf(':');
    if (i > 0) fm[line.slice(0, i).trim()] = line.slice(i + 1).replace(/\s+\(.*\)\s*$/, '').trim();
  }
  const unq = (s = '') => s.replace(/^["']|["']$/g, '');
  const tags = unq(fm.tags).replace(/^\[|\]$/g, '').split(',').map((t) => unq(t.trim())).filter(Boolean);
  if (!fm.slug || !fm.title) return null;
  return {
    meta: {
      slug: unq(fm.slug), title: unq(fm.title), description: unq(fm.description), date: unq(fm.date).slice(0, 10),
      author: 'Maia Construction', image: unq(fm.image) || undefined, imageAlt: unq(fm.imageAlt) || undefined, tags,
    },
    body: m[2].trim(),
  };
}

const POSTS: MdPost[] = fs.existsSync(DIR)
  ? fs.readdirSync(DIR).filter((f) => f.endsWith('.md')).map((f) => parse(path.join(DIR, f))).filter((p): p is MdPost => p !== null)
  : [];

export const mdPosts: BlogPostMeta[] = POSTS.map((p) => p.meta);
export function getMdBody(slug: string): string | null {
  return POSTS.find((p) => p.meta.slug === slug)?.body ?? null;
}
