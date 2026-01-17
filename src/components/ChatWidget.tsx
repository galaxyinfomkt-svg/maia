'use client';

import { useEffect, useState } from 'react';

export default function ChatWidget() {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Delay loading chat widget for better Core Web Vitals
    // Load after 5 seconds of page load or on user interaction
    const timer = setTimeout(() => {
      setShouldLoad(true);
    }, 5000);

    // Also load on user interaction (scroll, click, touch)
    const handleInteraction = () => {
      setShouldLoad(true);
      // Remove listeners after first interaction
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };

    window.addEventListener('scroll', handleInteraction, { passive: true });
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction, { passive: true });

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  useEffect(() => {
    if (!shouldLoad) return;

    // Load the chat widget script only when needed
    const script = document.createElement('script');
    script.src = 'https://widgets.leadconnectorhq.com/loader.js';
    script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
    script.setAttribute('data-widget-id', '679401e4ae907c375b57f661');
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [shouldLoad]);

  return null;
}
