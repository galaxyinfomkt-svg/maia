import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections';
import { SITE_NAME, SITE_URL, PHONE, PHONE_LINK, EMAIL, EMAIL_LINK, ADDRESS } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: `${SITE_NAME} privacy policy. Learn how we collect, use, and protect your personal information when you use our website or services in Massachusetts.`,
};

export default function PrivacyPage() {
  return (
    <>
      <Hero
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your information"
        badge="Legal"
        showCTA={false}
        size="inner"
      />

      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto prose prose-lg prose-slate">
            <p className="text-gray-500 text-sm mb-8">
              Last updated: January 1, 2025
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Introduction</h2>
            <p className="text-gray-600 mb-8">
              {SITE_NAME} (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) respects your privacy and is committed to
              protecting your personal information. This Privacy Policy explains how we collect, use,
              disclose, and safeguard your information when you visit our website{' '}
              <Link href="/" className="text-amber-600 hover:text-amber-700 underline">{SITE_URL}</Link>{' '}
              or use our home improvement services in Massachusetts.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information We Collect</h2>
            <h3 className="text-xl font-semibold text-slate-900 mb-3">Personal Information You Provide</h3>
            <p className="text-gray-600 mb-4">
              When you contact us for a free estimate, fill out a form, or communicate with us, we may collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Name and contact information (phone number, email address)</li>
              <li>Property address and project details</li>
              <li>Photos or descriptions of your home improvement needs</li>
              <li>Communication records (emails, phone calls, messages)</li>
            </ul>

            <h3 className="text-xl font-semibold text-slate-900 mb-3">Information Collected Automatically</h3>
            <p className="text-gray-600 mb-4">
              When you visit our website, we may automatically collect:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Browser type and version</li>
              <li>Operating system</li>
              <li>Pages visited and time spent on our website</li>
              <li>Referring website or source</li>
              <li>IP address and general location data</li>
              <li>Device information</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">How We Use Your Information</h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Respond to your inquiries and provide free estimates</li>
              <li>Schedule and deliver our home improvement services (siding, windows, doors)</li>
              <li>Communicate with you about your project</li>
              <li>Improve our website and services</li>
              <li>Send you relevant information about our services (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Cookies and Tracking Technologies</h2>
            <p className="text-gray-600 mb-4">
              Our website uses cookies and similar tracking technologies to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Analyze website traffic and usage patterns (Google Analytics)</li>
              <li>Remember your preferences</li>
              <li>Improve your browsing experience</li>
              <li>Measure the effectiveness of our marketing efforts</li>
            </ul>
            <p className="text-gray-600 mb-8">
              You can control cookies through your browser settings. Disabling cookies may affect
              some features of our website.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Information Sharing</h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li><strong>Service providers:</strong> Trusted third parties who assist with website hosting, analytics, and business operations</li>
              <li><strong>Legal compliance:</strong> When required by law, regulation, or legal process</li>
              <li><strong>Business protection:</strong> To protect the rights, property, or safety of {SITE_NAME}, our customers, or others</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Data Security</h2>
            <p className="text-gray-600 mb-8">
              We implement reasonable security measures to protect your personal information from unauthorized
              access, alteration, disclosure, or destruction. However, no method of transmission over the
              internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Your Rights</h2>
            <p className="text-gray-600 mb-4">
              You have the right to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt out of marketing communications</li>
              <li>Request information about our data practices</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-600 mb-8">
              Our website may contain links to third-party websites (e.g., Google Reviews, social media).
              We are not responsible for the privacy practices of these external sites. We encourage you
              to review their privacy policies.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Children&apos;s Privacy</h2>
            <p className="text-gray-600 mb-8">
              Our website and services are not directed to children under 13. We do not knowingly collect
              personal information from children under 13. If you believe we have collected such information,
              please contact us immediately.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Changes to This Policy</h2>
            <p className="text-gray-600 mb-8">
              We may update this Privacy Policy from time to time. Changes will be posted on this page
              with an updated revision date. Your continued use of our website after changes are posted
              constitutes your acceptance of the updated policy.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about this Privacy Policy or our data practices, please contact us:
            </p>
            <div className="bg-slate-50 rounded-2xl p-8 mb-8">
              <p className="font-bold text-slate-900 text-xl mb-4">{SITE_NAME}</p>
              <div className="space-y-2 text-gray-600">
                <p>{ADDRESS.full}</p>
                <p>
                  Phone:{' '}
                  <a href={PHONE_LINK} className="text-amber-600 hover:text-amber-700 underline">
                    {PHONE}
                  </a>
                </p>
                <p>
                  Email:{' '}
                  <a href={EMAIL_LINK} className="text-amber-600 hover:text-amber-700 underline">
                    {EMAIL}
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
