'use client';

import { useState } from 'react';
import { cn } from '@/lib/utils';
import { PHONE, HIC_NUMBER } from '@/lib/constants';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQItem[] = [
  {
    category: 'General',
    question: 'How long does a typical siding installation take?',
    answer: 'Most residential siding projects take 3-7 days depending on home size and complexity. A standard 2,000 sq ft home typically takes 4-5 days. We\'ll provide a specific timeline during your free estimate.',
  },
  {
    category: 'General',
    question: 'Are you licensed and insured?',
    answer: `Yes! Maia Construction is fully licensed (MA HIC #${HIC_NUMBER}), bonded, and insured. We carry comprehensive liability insurance and workers\' compensation coverage for your complete protection.`,
  },
  {
    category: 'General',
    question: 'What areas do you serve?',
    answer: 'We serve over 100 cities across Massachusetts, including Boston, Worcester, Framingham, Natick, Marlborough, and surrounding communities in Middlesex, Worcester, Norfolk, Essex, and Suffolk counties.',
  },
  {
    category: 'Pricing',
    question: 'How much does new siding cost?',
    answer: 'Siding costs vary based on material, home size, and complexity. Vinyl siding typically ranges $6-12 per sq ft installed, while James Hardie fiber cement runs $9-15 per sq ft. We provide free, detailed written estimates with no hidden fees.',
  },
  {
    category: 'Pricing',
    question: 'Do you offer financing options?',
    answer: 'Yes, we offer flexible financing options to help make your home improvement project affordable. Ask about our 0% interest financing for qualified buyers during your free consultation.',
  },
  {
    category: 'Windows',
    question: 'How much can I save on energy bills with new windows?',
    answer: 'ENERGY STAR certified replacement windows can reduce heating and cooling costs by 12-33%. Most Massachusetts homeowners see savings of $100-400 per year, with the windows paying for themselves in 7-15 years.',
  },
  {
    category: 'Windows',
    question: 'What\'s the difference between double and triple-pane windows?',
    answer: 'Double-pane windows have two glass layers with insulating gas between them. Triple-pane adds a third layer for 20-30% better insulation — ideal for New England winters. Triple-pane costs 10-15% more but offers superior energy efficiency and noise reduction.',
  },
  {
    category: 'Process',
    question: 'What happens during the free estimate?',
    answer: 'During our free consultation, we\'ll inspect your current exterior, discuss your goals and preferences, take measurements, show you material samples, and provide a detailed written quote — usually within 24-48 hours. No pressure, no obligation.',
  },
  {
    category: 'Process',
    question: 'How do I prepare for installation day?',
    answer: 'We\'ll provide specific instructions before your project. Generally, move vehicles from the driveway, remove items from exterior walls, ensure pets are secured, and clear a workspace around the house. We handle the rest!',
  },
  {
    category: 'Warranty',
    question: 'What warranties do you offer?',
    answer: 'All our installations include both manufacturer warranties (25-50 years on materials like James Hardie and CertainTeed) and our 5-year workmanship warranty. We stand behind every project we complete.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Frequently Asked Questions
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get answers to common questions about our services, process, and pricing
          </p>
        </div>

        {/* FAQ Grid */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-slate-50 rounded-xl overflow-hidden border border-slate-200 hover:border-amber-400 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <span className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                    {faq.category}
                  </span>
                  <h3 className="text-lg font-bold text-slate-900 mt-1">
                    {faq.question}
                  </h3>
                </div>
                <svg
                  className={cn(
                    'w-6 h-6 text-amber-500 flex-shrink-0 transition-transform duration-300',
                    openIndex === index && 'rotate-180'
                  )}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div
                className={cn(
                  'overflow-hidden transition-all duration-300',
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                )}
              >
                <p className="px-6 pb-5 text-gray-600 leading-relaxed">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">
            Have more questions? We&apos;re here to help!
          </p>
          <a
            href={`tel:${PHONE.replace(/[^0-9]/g, '')}`}
            className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold hover:shadow-xl hover:scale-105 transition-all"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call {PHONE} — Free Consultation
          </a>
        </div>
      </div>
    </section>
  );
}
