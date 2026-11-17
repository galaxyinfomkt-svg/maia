/* Renders the small Markdown subset our articles use: ## / ### headings, paragraphs,
   "- " and "1. " lists, "> " callouts, **bold** and [links](url). No raw HTML is ever
   injected: every node is a React element, so the text cannot carry markup. */
import Link from 'next/link';
import type { ReactNode } from 'react';

function inline(text: string, key: string): ReactNode[] {
  const out: ReactNode[] = [];
  const re = /\*\*([^*]+)\*\*|\[([^\]]+)\]\(([^)\s]+)\)/g;
  let last = 0, m: RegExpExecArray | null, i = 0;
  while ((m = re.exec(text))) {
    if (m.index > last) out.push(text.slice(last, m.index));
    if (m[1]) out.push(<strong key={`${key}-b${i++}`}>{m[1]}</strong>);
    else {
      const href = m[3];
      out.push(
        href.startsWith('/') ? (
          <Link key={`${key}-l${i++}`} href={href}>{m[2]}</Link>
        ) : (
          <a key={`${key}-l${i++}`} href={href} target="_blank" rel="noopener">{m[2]}</a>
        ),
      );
    }
    last = re.lastIndex;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export function Markdown({ src }: { src: string }) {
  const blocks = src.replace(/\r\n/g, '\n').split(/\n{2,}/);
  const nodes: ReactNode[] = [];
  blocks.forEach((blk, bi) => {
    const lines = blk.split('\n').filter((l) => l.trim());
    if (!lines.length) return;
    const k = `b${bi}`;
    const first = lines[0];
    if (first.startsWith('### ')) nodes.push(<h3 key={k}>{inline(first.slice(4), k)}</h3>);
    else if (first.startsWith('## ')) nodes.push(<h2 key={k}>{inline(first.slice(3), k)}</h2>);
    if (/^#{2,3} /.test(first)) {
      const rest = lines.slice(1);
      if (!rest.length) return;
      lines.splice(0, lines.length, ...rest);
    }
    if (lines.every((l) => /^\s*[-*] /.test(l))) {
      nodes.push(<ul key={`${k}u`}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*[-*] /, ''), `${k}-${i}`)}</li>)}</ul>);
    } else if (lines.every((l) => /^\s*\d+\. /.test(l))) {
      nodes.push(<ol key={`${k}o`}>{lines.map((l, i) => <li key={i}>{inline(l.replace(/^\s*\d+\. /, ''), `${k}-${i}`)}</li>)}</ol>);
    } else if (lines.every((l) => l.startsWith('>'))) {
      nodes.push(<blockquote key={`${k}q`}>{inline(lines.map((l) => l.replace(/^>\s?/, '')).join(' '), k)}</blockquote>);
    } else {
      nodes.push(<p key={`${k}p`}>{inline(lines.join(' '), k)}</p>);
    }
  });
  return <>{nodes}</>;
}
