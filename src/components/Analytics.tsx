'use client';

import Script from 'next/script';

// Google Analytics 4 Measurement ID - Replace with your actual ID
const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID || 'G-XXXXXXXXXX';

// Meta Pixel ID - Replace with your actual ID
const META_PIXEL_ID = process.env.NEXT_PUBLIC_META_PIXEL_ID || 'XXXXXXXXXXXXXXX';

export function GoogleAnalytics() {
  if (GA_MEASUREMENT_ID === 'G-XXXXXXXXXX') {
    return null; // Don't render if no real ID is set
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            page_title: document.title,
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
}

export function MetaPixel() {
  if (META_PIXEL_ID === 'XXXXXXXXXXXXXXX') {
    return null; // Don't render if no real ID is set
  }

  return (
    <>
      <Script id="meta-pixel" strategy="afterInteractive">
        {`
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${META_PIXEL_ID}');
          fbq('track', 'PageView');
        `}
      </Script>
      <noscript>
        <img
          height="1"
          width="1"
          style={{ display: 'none' }}
          src={`https://www.facebook.com/tr?id=${META_PIXEL_ID}&ev=PageView&noscript=1`}
          alt=""
        />
      </noscript>
    </>
  );
}

// Conversion tracking functions
export function trackPhoneCall() {
  if (typeof window !== 'undefined') {
    // Google Analytics event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'conversion', {
        event_category: 'engagement',
        event_label: 'phone_call',
        value: 1,
      });
    }
    // Meta Pixel event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
  }
}

export function trackFormSubmission(formName: string) {
  if (typeof window !== 'undefined') {
    // Google Analytics event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'form_submission', {
        event_category: 'engagement',
        event_label: formName,
        value: 1,
      });
    }
    // Meta Pixel event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: formName });
    }
  }
}

export function trackQuoteRequest() {
  if (typeof window !== 'undefined') {
    // Google Analytics event
    if ((window as any).gtag) {
      (window as any).gtag('event', 'generate_lead', {
        event_category: 'conversion',
        event_label: 'quote_request',
        value: 100,
      });
    }
    // Meta Pixel event
    if ((window as any).fbq) {
      (window as any).fbq('track', 'Lead', { content_name: 'Quote Request' });
    }
  }
}

export default function Analytics() {
  return (
    <>
      <GoogleAnalytics />
      <MetaPixel />
    </>
  );
}
