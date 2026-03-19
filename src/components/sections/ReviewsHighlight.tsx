'use client';

import { useEffect, useState } from 'react';

export default function ReviewsHighlight() {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 500);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!loaded) return;

    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      if (document.body.contains(script)) {
        document.body.removeChild(script);
      }
    };
  }, [loaded]);

  return (
    <section className="py-20 bg-slate-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-slate-900 mb-4">
            What Our Customers Say
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Real verified reviews from Massachusetts homeowners
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {loaded ? (
            <iframe
              className="lc_reviews_widget"
              src="https://reputationhub.site/reputation/widgets/review_widget/b8spY0hvhFRzHHxsdJlZ"
              frameBorder="0"
              scrolling="no"
              style={{ minWidth: '100%', width: '100%', minHeight: '400px' }}
              title="Google Reviews - Maia Construction"
            />
          ) : (
            <div style={{ minHeight: '400px' }} className="flex items-center justify-center">
              <div className="text-gray-400 text-sm">Loading reviews...</div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
