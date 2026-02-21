import { Metadata } from 'next';
import Link from 'next/link';
import { Hero } from '@/components/sections';
import { SITE_NAME, SITE_URL, PHONE, PHONE_LINK, EMAIL, EMAIL_LINK, ADDRESS, HIC_NUMBER } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: `${SITE_NAME} terms of service. Review the terms and conditions for using our website and home improvement services in Massachusetts.`,
};

export default function TermsPage() {
  return (
    <>
      <Hero
        title="Terms of Service"
        subtitle="Terms and conditions for using our website and services"
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

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Agreement to Terms</h2>
            <p className="text-gray-600 mb-8">
              By accessing or using the {SITE_NAME} website at{' '}
              <Link href="/" className="text-amber-600 hover:text-amber-700 underline">{SITE_URL}</Link>{' '}
              (&quot;the Website&quot;), you agree to be bound by these Terms of Service. If you do not agree
              to these terms, please do not use our Website.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Services</h2>
            <p className="text-gray-600 mb-4">
              {SITE_NAME} is a licensed home improvement contractor (MA HIC #{HIC_NUMBER}) providing the following
              services across Massachusetts:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Siding installation and replacement (vinyl, fiber cement, James Hardie)</li>
              <li>Window installation and replacement (energy-efficient, ENERGY STAR certified)</li>
              <li>Door installation and replacement (entry doors, storm doors, patio doors)</li>
              <li>General contracting and exterior renovation</li>
            </ul>
            <p className="text-gray-600 mb-8">
              All services are subject to a separate written contract between {SITE_NAME} and the homeowner,
              which will outline the specific scope of work, materials, timeline, and pricing.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Free Estimates</h2>
            <p className="text-gray-600 mb-8">
              We offer free, no-obligation estimates for home improvement projects. Requesting an estimate
              does not commit you to any service. Estimates are valid for 30 days from the date provided
              and are subject to change based on material costs and project scope adjustments.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Website Use</h2>
            <p className="text-gray-600 mb-4">
              When using our Website, you agree to:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li>Provide accurate and truthful information when submitting forms or contacting us</li>
              <li>Use the Website only for lawful purposes</li>
              <li>Not attempt to interfere with or disrupt the Website&apos;s functionality</li>
              <li>Not reproduce, distribute, or modify any content without our written permission</li>
              <li>Not use automated tools to scrape or collect data from the Website</li>
            </ul>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Intellectual Property</h2>
            <p className="text-gray-600 mb-8">
              All content on this Website, including text, images, logos, graphics, photos (including
              before-and-after project photos), and design elements, is the property of {SITE_NAME} and is
              protected by copyright and intellectual property laws. You may not use, reproduce, or
              distribute any content without our prior written consent.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Licensing and Insurance</h2>
            <p className="text-gray-600 mb-8">
              {SITE_NAME} is a licensed and insured contractor in the state of Massachusetts. Our
              Massachusetts Home Improvement Contractor (HIC) license number is #{HIC_NUMBER}. We maintain
              appropriate liability insurance and workers&apos; compensation coverage as required by
              Massachusetts law.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Warranties</h2>
            <p className="text-gray-600 mb-4">
              Warranty terms for our services are outlined in your individual project contract and may include:
            </p>
            <ul className="list-disc pl-6 text-gray-600 mb-8 space-y-2">
              <li><strong>Workmanship warranty:</strong> Coverage for installation and labor</li>
              <li><strong>Manufacturer warranty:</strong> Coverage provided by the product manufacturer (varies by product, typically 25-50 years)</li>
            </ul>
            <p className="text-gray-600 mb-8">
              Specific warranty details will be provided in your project proposal and contract.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Limitation of Liability</h2>
            <p className="text-gray-600 mb-8">
              The information on this Website is provided &quot;as is&quot; for general informational purposes.
              While we strive to keep the content accurate and up to date, {SITE_NAME} makes no warranties
              or representations about the completeness, accuracy, or reliability of the Website content.
              We shall not be liable for any indirect, incidental, or consequential damages arising from
              your use of the Website.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Third-Party Links</h2>
            <p className="text-gray-600 mb-8">
              Our Website may contain links to third-party websites, including Google Reviews, social media
              platforms, and product manufacturer sites. These links are provided for your convenience.
              {SITE_NAME} is not responsible for the content or practices of linked websites.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Reviews and Testimonials</h2>
            <p className="text-gray-600 mb-8">
              Customer reviews and testimonials displayed on our Website or linked from third-party
              platforms (such as Google) reflect individual experiences and opinions. Results may vary
              depending on the specific project, materials chosen, and property conditions.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Governing Law</h2>
            <p className="text-gray-600 mb-8">
              These Terms of Service are governed by and construed in accordance with the laws of the
              Commonwealth of Massachusetts. Any disputes arising from these terms or your use of the
              Website shall be resolved in the courts of Massachusetts.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Changes to These Terms</h2>
            <p className="text-gray-600 mb-8">
              We reserve the right to update or modify these Terms of Service at any time. Changes will
              be posted on this page with an updated revision date. Your continued use of the Website
              after changes are posted constitutes your acceptance of the updated terms.
            </p>

            <h2 className="text-3xl font-bold text-slate-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have questions about these Terms of Service, please contact us:
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

            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8">
              <p className="text-gray-700">
                For questions about a specific project or service agreement, please refer to your
                individual contract or contact us directly at{' '}
                <a href={PHONE_LINK} className="text-amber-600 hover:text-amber-700 font-semibold underline">
                  {PHONE}
                </a>.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
