import Link from 'next/link';
import { PHONE, PHONE_LINK } from '@/lib/constants';

// Quick Answer Box - Otimizado para Featured Snippets e AI Overview
export function QuickAnswer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-400 p-6 mb-8 rounded-r-lg">
      <p className="text-sm font-semibold text-amber-700 mb-2 uppercase tracking-wide">Quick Answer</p>
      <div className="text-lg text-slate-800 leading-relaxed">{children}</div>
    </div>
  );
}

// Key Takeaways - Formato de lista para IA extrair
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold text-slate-900 mb-4 flex items-center gap-2">
        <span className="text-2xl">📋</span> Key Takeaways
      </h2>
      <ul className="space-y-3">
        {items.map((item, index) => (
          <li key={index} className="flex items-start gap-3">
            <span className="flex-shrink-0 w-6 h-6 bg-amber-400 text-slate-900 rounded-full flex items-center justify-center text-sm font-bold">
              {index + 1}
            </span>
            <span className="text-slate-700">{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Comparison Table - Estruturada para Featured Snippets
interface ComparisonRow {
  feature: string;
  [key: string]: string;
}

export function ComparisonTable({
  headers,
  rows,
  caption
}: {
  headers: string[];
  rows: ComparisonRow[];
  caption?: string;
}) {
  return (
    <div className="overflow-x-auto mb-8">
      <table className="w-full border-collapse bg-white rounded-xl overflow-hidden shadow-sm">
        {caption && (
          <caption className="text-left text-sm text-slate-600 mb-2 font-medium">{caption}</caption>
        )}
        <thead>
          <tr className="bg-slate-900 text-white">
            {headers.map((header, index) => (
              <th key={index} className="px-4 py-3 text-left font-semibold">
                {header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex} className={rowIndex % 2 === 0 ? 'bg-slate-50' : 'bg-white'}>
              {headers.map((header, colIndex) => (
                <td key={colIndex} className="px-4 py-3 border-t border-slate-200">
                  {colIndex === 0 ? (
                    <strong className="text-slate-900">{row[header.toLowerCase()] || row.feature}</strong>
                  ) : (
                    <span className="text-slate-700">{row[header.toLowerCase()] || row[header] || '-'}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Pro Tip Box
export function ProTip({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-xl p-5 mb-6">
      <p className="font-semibold text-blue-800 mb-1 flex items-center gap-2">
        <span className="text-xl">💡</span> Pro Tip
      </p>
      <p className="text-blue-700">{children}</p>
    </div>
  );
}

// Warning Box
export function Warning({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-red-50 border border-red-200 rounded-xl p-5 mb-6">
      <p className="font-semibold text-red-800 mb-1 flex items-center gap-2">
        <span className="text-xl">⚠️</span> Important
      </p>
      <p className="text-red-700">{children}</p>
    </div>
  );
}

// Bottom Line / Conclusion
export function BottomLine({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white rounded-xl p-6 mb-8">
      <h2 className="text-xl font-bold mb-3 flex items-center gap-2">
        <span className="text-2xl">✅</span> The Bottom Line
      </h2>
      <div className="text-white/90 leading-relaxed">{children}</div>
    </div>
  );
}

// Inline CTA for blogs
export function InlineCTA({ service }: { service?: string }) {
  return (
    <div className="bg-gradient-to-r from-amber-400 to-yellow-300 rounded-xl p-6 my-8 text-center">
      <p className="text-slate-900 font-bold text-lg mb-2">
        Ready to get started{service ? ` with ${service}` : ''}?
      </p>
      <p className="text-slate-700 mb-4">
        Get a free, no-obligation quote from our licensed Massachusetts contractors.
      </p>
      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <a
          href={PHONE_LINK}
          className="inline-flex items-center justify-center px-6 py-3 bg-slate-900 text-white rounded-full font-bold hover:bg-slate-800 transition-colors"
        >
          <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
          </svg>
          Call {PHONE}
        </a>
        <Link
          href="/contact"
          className="inline-flex items-center justify-center px-6 py-3 bg-white text-slate-900 rounded-full font-bold hover:bg-slate-100 transition-colors"
        >
          Get Free Quote
        </Link>
      </div>
    </div>
  );
}

// Definition Box for technical terms
export function Definition({ term, children }: { term: string; children: React.ReactNode }) {
  return (
    <div className="bg-slate-100 rounded-lg p-4 mb-4 border-l-4 border-slate-400">
      <p className="font-bold text-slate-900">{term}</p>
      <p className="text-slate-700 text-sm mt-1">{children}</p>
    </div>
  );
}

// Cost Range Display
export function CostRange({
  low,
  high,
  unit = 'installed',
  note
}: {
  low: string;
  high: string;
  unit?: string;
  note?: string;
}) {
  return (
    <div className="inline-flex items-center gap-2 bg-green-50 border border-green-200 rounded-lg px-4 py-2 mb-4">
      <span className="text-green-700 font-bold">${low} - ${high}</span>
      <span className="text-green-600 text-sm">{unit}</span>
      {note && <span className="text-green-600 text-xs">({note})</span>}
    </div>
  );
}
