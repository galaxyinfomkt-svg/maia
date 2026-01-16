'use client';

import { useEffect } from 'react';

export default function ReviewWidget() {
  useEffect(() => {
    // Load the review widget script
    const script = document.createElement('script');
    script.src = 'https://reputationhub.site/reputation/assets/review-widget.js';
    script.type = 'text/javascript';
    script.async = true;
    document.body.appendChild(script);

    return () => {
      // Cleanup script on unmount
      document.body.removeChild(script);
    };
  }, []);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            Customer Reviews
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600">
            See what our customers are saying about us
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <iframe
            className="lc_reviews_widget"
            src="https://reputationhub.site/reputation/widgets/review_widget/b8spY0hvhFRzHHxsdJlZ"
            frameBorder="0"
            scrolling="no"
            style={{ minWidth: '100%', width: '100%', minHeight: '500px' }}
            title="Customer Reviews"
          />
        </div>
      </div>
    </section>
  );
}
