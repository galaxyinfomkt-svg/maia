'use client';

import { useEffect, useState } from 'react';

export default function ContactForm() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShouldLoad(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    const script = document.createElement('script');
    script.src = 'https://lp.beeprohub.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoad]);

  return (
    <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
      <div className="text-center py-4 border-b border-gray-100">
        <h2 className="text-xl font-bold text-slate-900">Get Your Free Quote</h2>
        <div className="w-16 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mt-2" />
      </div>

      {shouldLoad ? (
        <iframe
          src="https://lp.beeprohub.com/widget/form/OSOLXmA2wmcc6dwjRqpi"
          style={{
            width: '100%',
            height: '440px',
            border: 'none',
            borderRadius: '3px',
          }}
          id="inline-OSOLXmA2wmcc6dwjRqpi"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Form 0"
          data-height="440"
          data-layout-iframe-id="inline-OSOLXmA2wmcc6dwjRqpi"
          data-form-id="OSOLXmA2wmcc6dwjRqpi"
          title="Contact Form - Maia Construction"
        />
      ) : (
        <div
          style={{ width: '100%', height: '440px' }}
          className="bg-gray-50 flex items-center justify-center"
        >
          <div className="text-gray-400 text-sm">Loading form...</div>
        </div>
      )}
    </div>
  );
}
