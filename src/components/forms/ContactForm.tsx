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

  return shouldLoad ? (
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
    <div style={{ width: '100%', height: '440px' }} />
  );
}
