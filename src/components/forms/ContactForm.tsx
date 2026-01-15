'use client';

import { useState } from 'react';
import { Button, Input } from '@/components/ui';
import { services } from '@/lib/services';

interface ContactFormProps {
  service?: string;
  city?: string;
  variant?: 'default' | 'hero';
}

export default function ContactForm({
  service,
  city,
  variant = 'default',
}: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    service: service || '',
    message: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder: Log form data to console
    // In production, send to API route or form service
    console.log('Form submitted:', { ...formData, city });

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitting(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={`rounded-2xl p-8 text-center ${
        variant === 'hero'
          ? 'bg-white/10 backdrop-blur-xl border border-white/20'
          : 'bg-green-50 border border-green-200'
      }`}>
        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <h3 className={`text-2xl font-bold mb-2 ${variant === 'hero' ? 'text-white' : 'text-green-800'}`}>
          Thank You!
        </h3>
        <p className={variant === 'hero' ? 'text-white/80' : 'text-green-700'}>
          We&apos;ve received your request and will contact you within 24 hours.
        </p>
      </div>
    );
  }

  const isHero = variant === 'hero';

  return (
    <div className={`rounded-2xl p-8 ${
      isHero
        ? 'bg-white/10 backdrop-blur-xl border border-white/20'
        : 'bg-white shadow-xl'
    }`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${isHero ? 'text-white' : 'text-slate-900'}`}>
          Get Your Free Estimate
        </h2>
        <p className={isHero ? 'text-white/80' : 'text-gray-600'}>
          Fill out the form and we&apos;ll contact you within 24 hours
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHero ? 'text-white' : 'text-slate-700'}`}>
            Full Name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="name"
            required
            placeholder="John Smith"
            value={formData.name}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isHero
                ? 'bg-white/20 border-white/30 text-white placeholder-white/50 focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-400'
            } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHero ? 'text-white' : 'text-slate-700'}`}>
            Email <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            name="email"
            required
            placeholder="john@example.com"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isHero
                ? 'bg-white/20 border-white/30 text-white placeholder-white/50 focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-400'
            } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHero ? 'text-white' : 'text-slate-700'}`}>
            Phone <span className="text-red-500">*</span>
          </label>
          <input
            type="tel"
            name="phone"
            required
            placeholder="(508) 123-4567"
            value={formData.phone}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isHero
                ? 'bg-white/20 border-white/30 text-white placeholder-white/50 focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-400'
            } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          />
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHero ? 'text-white' : 'text-slate-700'}`}>
            Service Needed <span className="text-red-500">*</span>
          </label>
          <select
            name="service"
            required
            value={formData.service}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isHero
                ? 'bg-white/20 border-white/30 text-white focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 focus:border-amber-400'
            } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          >
            <option value="" className="text-slate-900">Select a service</option>
            {services.map((s) => (
              <option key={s.id} value={s.slug} className="text-slate-900">
                {s.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className={`block text-sm font-semibold mb-2 ${isHero ? 'text-white' : 'text-slate-700'}`}>
            Project Details
          </label>
          <textarea
            name="message"
            rows={4}
            placeholder="Tell us about your project..."
            value={formData.message}
            onChange={handleChange}
            className={`w-full px-4 py-3 rounded-lg border transition-colors ${
              isHero
                ? 'bg-white/20 border-white/30 text-white placeholder-white/50 focus:border-amber-400'
                : 'bg-white border-slate-300 text-slate-900 placeholder-slate-400 focus:border-amber-400'
            } focus:outline-none focus:ring-2 focus:ring-amber-400/20`}
          />
        </div>

        {/* Hidden field for city tracking */}
        <input type="hidden" name="city" value={city || ''} />

        <Button
          type="submit"
          disabled={isSubmitting}
          className="w-full"
          size="lg"
        >
          {isSubmitting ? 'Sending...' : 'Get Free Estimate'}
        </Button>
      </form>
    </div>
  );
}
