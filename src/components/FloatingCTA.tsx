'use client';

import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { PHONE, PHONE_LINK } from '@/lib/constants';
import { trackPhoneCall } from '@/components/Analytics';

export default function FloatingCTA() {
  const [isVisible, setIsVisible] = useState(false);
  const chatLoaded = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Load chat widget script on first interaction
  useEffect(() => {
    const loadChat = () => {
      if (chatLoaded.current) return;
      chatLoaded.current = true;

      const script = document.createElement('script');
      script.src = 'https://widgets.leadconnectorhq.com/loader.js';
      script.setAttribute('data-resources-url', 'https://widgets.leadconnectorhq.com/chat-widget/loader.js');
      script.setAttribute('data-widget-id', '679401e4ae907c375b57f661');
      script.async = true;
      document.body.appendChild(script);
    };

    const timer = setTimeout(loadChat, 5000);
    const onInteraction = () => { loadChat(); cleanup(); };
    const cleanup = () => {
      window.removeEventListener('scroll', onInteraction);
      window.removeEventListener('click', onInteraction);
      window.removeEventListener('touchstart', onInteraction);
    };

    window.addEventListener('scroll', onInteraction, { passive: true });
    window.addEventListener('click', onInteraction);
    window.addEventListener('touchstart', onInteraction, { passive: true });

    return () => { clearTimeout(timer); cleanup(); };
  }, []);

  // Hide the default LeadConnector chat bubble via CSS
  useEffect(() => {
    const style = document.createElement('style');
    style.textContent = `
      #lc_text_widget, .lc_text_widget, [id^="chat-widget"], iframe[src*="leadconnectorhq"] {
        display: none !important;
      }
    `;
    document.head.appendChild(style);
    return () => { document.head.removeChild(style); };
  }, []);

  const openChat = () => {
    // Remove hide styles temporarily and trigger the LC widget
    const styles = document.querySelectorAll('style');
    styles.forEach((s) => {
      if (s.textContent?.includes('lc_text_widget')) {
        s.textContent = '';
      }
    });

    // Try multiple selectors to find and click the LC chat button
    setTimeout(() => {
      const selectors = [
        '#lc_text_widget',
        '.lc_text_widget',
        '[id^="chat-widget"]',
        'iframe[src*="leadconnectorhq"]',
      ];
      for (const sel of selectors) {
        const el = document.querySelector(sel) as HTMLElement;
        if (el) {
          el.style.display = '';
          el.click();
          break;
        }
      }
    }, 100);
  };

  return (
    <div
      className={cn(
        'fixed bottom-6 right-6 z-40 flex items-center gap-3 transition-all duration-300',
        isVisible ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'
      )}
    >
      {/* Phone Button */}
      <a
        href={PHONE_LINK}
        onClick={trackPhoneCall}
        aria-label="Call for free estimate"
        className="flex items-center gap-2 px-5 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-slate-900 opacity-75" />
          <span className="relative inline-flex rounded-full h-3 w-3 bg-slate-900" />
        </span>
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
        </svg>
        <span className="hidden sm:inline">{PHONE}</span>
        <span className="sm:hidden">Call</span>
      </a>

      {/* Chat Button */}
      <button
        onClick={openChat}
        aria-label="Open chat"
        className="flex items-center gap-2 px-5 py-4 bg-slate-900 text-white rounded-full font-bold shadow-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clipRule="evenodd" />
        </svg>
        <span className="hidden sm:inline">Chat</span>
      </button>
    </div>
  );
}
