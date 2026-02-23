'use client';

import { useEffect, useState } from 'react';

interface ContactFormProps {
  service?: string;
  city?: string;
  variant?: 'default' | 'hero';
}

export default function ContactForm({
  variant = 'default',
}: ContactFormProps) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Defer form loading to after initial paint to avoid blocking LCP
    // reCAPTCHA loads ~2.5MB of JS inside the iframe
    const hasIdleCallback = typeof window.requestIdleCallback === 'function';
    let idleId: number | undefined;
    let timeoutId: ReturnType<typeof setTimeout> | undefined;

    if (hasIdleCallback) {
      idleId = window.requestIdleCallback(() => setShouldLoad(true), { timeout: 3000 });
    } else {
      timeoutId = setTimeout(() => setShouldLoad(true), 2000);
    }

    return () => {
      if (idleId !== undefined) window.cancelIdleCallback(idleId);
      if (timeoutId !== undefined) clearTimeout(timeoutId);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Load the LeadConnector form embed script
    const script = document.createElement('script');
    script.src = 'https://link.msgsndr.com/js/form_embed.js';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoad]);

  const isHero = variant === 'hero';

  return (
    <div className={`rounded-2xl overflow-hidden ${
      isHero
        ? 'bg-white/10 backdrop-blur-xl border border-white/20 p-4'
        : 'bg-transparent'
    }`}>
      {isHero && (
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2 text-white">
            Get Your FREE Estimate Today
          </h2>
          <p className="text-white/80 text-sm">
            No obligation • Response within 24 hours • 5-star rated service
          </p>
        </div>
      )}

      {shouldLoad ? (
        <iframe
          src="https://api.leadconnectorhq.com/widget/form/ENLXDRVVpDsOljAanCpg"
          style={{
            width: '100%',
            height: '500px',
            border: 'none',
            borderRadius: '12px',
            background: 'transparent'
          }}
          id="inline-ENLXDRVVpDsOljAanCpg"
          data-layout="{'id':'INLINE'}"
          data-trigger-type="alwaysShow"
          data-trigger-value=""
          data-activation-type="alwaysActivated"
          data-activation-value=""
          data-deactivation-type="neverDeactivate"
          data-deactivation-value=""
          data-form-name="Website Formulário Maia"
          data-height="500"
          data-layout-iframe-id="inline-ENLXDRVVpDsOljAanCpg"
          data-form-id="ENLXDRVVpDsOljAanCpg"
          title="Contact Form - Maia Construction"
          loading="lazy"
        />
      ) : (
        <div
          style={{ width: '100%', height: '500px', borderRadius: '12px' }}
          className="bg-white/5 flex items-center justify-center"
        >
          <div className="text-white/60 text-sm">Loading form...</div>
        </div>
      )}
    </div>
  );
}
