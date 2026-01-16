'use client';

import { useEffect } from 'react';

interface ContactFormProps {
  service?: string;
  city?: string;
  variant?: 'default' | 'hero';
}

export default function ContactForm({
  variant = 'default',
}: ContactFormProps) {
  useEffect(() => {
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
  }, []);

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
      />
    </div>
  );
}
