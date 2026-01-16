import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Hero } from '@/components/sections';
import { JsonLd, Breadcrumbs } from '@/components/seo';
import { getAllPosts, getPostBySlug, getRecentPosts } from '@/lib/blog';
import { SITE_NAME, PHONE, PHONE_LINK } from '@/lib/constants';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.description,
      images: post.image ? [{ url: post.image }] : [],
      publishedTime: post.date,
      authors: [post.author],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: post.image ? [post.image] : [],
    },
  };
}

// Blog post content - in a real app, this would come from MDX files
const blogContent: Record<string, React.ReactNode> = {
  'choosing-right-siding-massachusetts': (
    <>
      <p className="lead">
        Choosing the right siding for your Massachusetts home is one of the most important decisions
        you&apos;ll make as a homeowner. The siding you select needs to withstand harsh New England winters,
        humid summers, and everything in between while keeping your home beautiful and energy-efficient.
      </p>

      <h2>Understanding Massachusetts Climate Challenges</h2>
      <p>
        Massachusetts homeowners face unique weather challenges that directly impact siding choices.
        From heavy snowfall and ice storms in winter to humid conditions in summer, your siding
        must be able to handle it all.
      </p>
      <ul>
        <li><strong>Temperature extremes:</strong> From -10°F to 95°F throughout the year</li>
        <li><strong>Moisture:</strong> Average 47 inches of rain and 45 inches of snow annually</li>
        <li><strong>Salt air:</strong> Coastal areas face additional corrosion concerns</li>
        <li><strong>UV exposure:</strong> Fading and material degradation over time</li>
      </ul>

      <h2>Popular Siding Options for Massachusetts Homes</h2>

      <h3>1. Vinyl Siding</h3>
      <p>
        Vinyl siding remains the most popular choice for Massachusetts homeowners, and for good reason.
        It offers excellent value, durability, and a wide range of colors and styles.
      </p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Low maintenance - no painting required</li>
        <li>Resistant to moisture and insects</li>
        <li>Affordable compared to other options</li>
        <li>Wide variety of colors and styles</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Can crack in extreme cold</li>
        <li>May fade over time</li>
        <li>Less eco-friendly than some alternatives</li>
      </ul>

      <h3>2. Fiber Cement Siding (James Hardie)</h3>
      <p>
        Fiber cement siding has become increasingly popular due to its durability and authentic appearance.
        It can mimic the look of wood without the maintenance concerns.
      </p>
      <p><strong>Pros:</strong></p>
      <ul>
        <li>Extremely durable - lasts 50+ years</li>
        <li>Fire resistant</li>
        <li>Won&apos;t rot, warp, or attract pests</li>
        <li>Looks like real wood</li>
      </ul>
      <p><strong>Cons:</strong></p>
      <ul>
        <li>Higher initial cost</li>
        <li>Heavier - may require structural reinforcement</li>
        <li>Requires repainting every 10-15 years</li>
      </ul>

      <h3>3. Wood Siding</h3>
      <p>
        For homeowners wanting an authentic, natural look, wood siding remains a timeless choice.
        It&apos;s particularly popular for historic homes and properties seeking a traditional New England aesthetic.
      </p>

      <h2>Making Your Decision</h2>
      <p>
        When choosing siding for your Massachusetts home, consider these factors:
      </p>
      <ol>
        <li><strong>Budget:</strong> Initial cost vs. long-term maintenance</li>
        <li><strong>Style:</strong> What complements your home&apos;s architecture</li>
        <li><strong>Location:</strong> Coastal areas may need more durable options</li>
        <li><strong>HOA restrictions:</strong> Some communities have specific requirements</li>
        <li><strong>Energy efficiency:</strong> Insulated siding options can reduce heating costs</li>
      </ol>

      <h2>Ready to Upgrade Your Siding?</h2>
      <p>
        At Maia Construction, we specialize in helping Massachusetts homeowners choose and install
        the perfect siding for their homes. With over a decade of experience, we understand the
        unique challenges of New England homes and can guide you through every step of the process.
      </p>
    </>
  ),
  'energy-efficient-windows-guide': (
    <>
      <p className="lead">
        If you&apos;re a Massachusetts homeowner looking to reduce your energy bills and improve your
        home&apos;s comfort, upgrading to energy-efficient windows is one of the smartest investments
        you can make.
      </p>

      <h2>Why Energy-Efficient Windows Matter</h2>
      <p>
        Windows are responsible for 25-30% of residential heating and cooling energy use.
        In Massachusetts, where winter heating costs can be substantial, inefficient windows
        are essentially throwing money out the window.
      </p>

      <h2>Understanding Window Energy Ratings</h2>

      <h3>U-Factor</h3>
      <p>
        The U-factor measures how well a window insulates. Lower numbers are better.
        For Massachusetts, look for windows with a U-factor of 0.30 or lower.
      </p>

      <h3>Solar Heat Gain Coefficient (SHGC)</h3>
      <p>
        SHGC measures how much solar radiation passes through the window. In our climate,
        a moderate SHGC (0.25-0.40) is ideal to capture winter sun while reducing summer heat.
      </p>

      <h2>Types of Energy-Efficient Windows</h2>
      <ul>
        <li><strong>Double-pane:</strong> Two layers of glass with insulating gas</li>
        <li><strong>Triple-pane:</strong> Maximum insulation for extreme climates</li>
        <li><strong>Low-E coatings:</strong> Reflects heat while allowing light through</li>
        <li><strong>Gas-filled:</strong> Argon or krypton between panes for better insulation</li>
      </ul>

      <h2>Expected Savings</h2>
      <p>
        Massachusetts homeowners can expect to save 10-30% on heating and cooling costs
        after upgrading to ENERGY STAR certified windows. The exact savings depend on your
        current windows and home size.
      </p>

      <h2>Available Rebates and Incentives</h2>
      <p>
        Don&apos;t forget to check for available incentives:
      </p>
      <ul>
        <li>Federal tax credits for energy-efficient home improvements</li>
        <li>Mass Save rebates for qualifying windows</li>
        <li>Local utility company incentives</li>
      </ul>
    </>
  ),
  'front-door-curb-appeal': (
    <>
      <p className="lead">
        Your front door is the focal point of your home&apos;s exterior. It&apos;s the first thing
        visitors see and plays a crucial role in both curb appeal and home security.
        Choosing the right front door can dramatically transform your home&apos;s appearance.
      </p>

      <h2>The Impact of Your Front Door</h2>
      <p>
        A new front door can increase your home&apos;s value by up to $6,000 according to
        recent studies. But beyond financial returns, the right door:
      </p>
      <ul>
        <li>Creates a welcoming first impression</li>
        <li>Improves home security</li>
        <li>Enhances energy efficiency</li>
        <li>Reflects your personal style</li>
      </ul>

      <h2>Popular Door Materials</h2>

      <h3>Fiberglass</h3>
      <p>
        Fiberglass doors offer the best of both worlds: the beauty of wood with
        minimal maintenance. They won&apos;t warp, crack, or rot, making them ideal
        for New England&apos;s variable climate.
      </p>

      <h3>Steel</h3>
      <p>
        For maximum security and energy efficiency, steel doors are hard to beat.
        Modern steel doors can be painted any color and feature realistic wood
        grain textures.
      </p>

      <h3>Wood</h3>
      <p>
        Nothing matches the warmth and character of a real wood door. While they
        require more maintenance, wood doors offer unparalleled beauty and can
        be fully customized.
      </p>

      <h2>Choosing the Right Style</h2>
      <p>
        Consider your home&apos;s architectural style when selecting a door:
      </p>
      <ul>
        <li><strong>Colonial:</strong> Panel doors with symmetrical design</li>
        <li><strong>Craftsman:</strong> Square panels with glass lites at top</li>
        <li><strong>Modern:</strong> Clean lines, minimal ornamentation</li>
        <li><strong>Traditional:</strong> Classic raised panels</li>
      </ul>

      <h2>Don&apos;t Forget the Details</h2>
      <p>
        The finishing touches matter:
      </p>
      <ul>
        <li>Hardware finish (brass, nickel, black, bronze)</li>
        <li>Glass options (clear, frosted, decorative)</li>
        <li>Sidelights and transoms</li>
        <li>Storm door pairing</li>
      </ul>
    </>
  ),
  'hiring-general-contractor-massachusetts': (
    <>
      <p className="lead">
        Hiring the right general contractor can make or break your home improvement project.
        In Massachusetts, where building codes are strict and weather conditions demanding,
        choosing a qualified professional is essential for success.
      </p>

      <h2>Why Choosing the Right Contractor Matters</h2>
      <p>
        A quality general contractor brings expertise, project management skills, and a network
        of reliable subcontractors to your project. The wrong choice can lead to cost overruns,
        delays, and subpar work that costs even more to fix.
      </p>

      <h2>10 Essential Questions to Ask</h2>

      <h3>1. Are you licensed and insured in Massachusetts?</h3>
      <p>
        Massachusetts requires contractors to hold proper licenses for certain types of work.
        Always verify their license with the state and confirm they carry both liability
        insurance and workers&apos; compensation coverage.
      </p>

      <h3>2. How long have you been in business?</h3>
      <p>
        Experience matters. A contractor who has been operating successfully for several years
        has proven they can deliver quality work and maintain client satisfaction.
      </p>

      <h3>3. Can you provide local references?</h3>
      <p>
        Ask for references from recent projects similar to yours. Follow up with those
        homeowners to learn about their experience with the contractor.
      </p>

      <h3>4. Do you pull permits for the work?</h3>
      <p>
        Reputable contractors handle all necessary permits. Work done without proper permits
        can create problems when you sell your home or file an insurance claim.
      </p>

      <h3>5. Who will be on-site daily?</h3>
      <p>
        Know who your point of contact will be during the project. Will the contractor
        be present, or will a project manager oversee the work?
      </p>

      <h3>6. What is your timeline for this project?</h3>
      <p>
        Get a realistic timeline with milestones. Be wary of contractors who promise
        unusually fast completion times.
      </p>

      <h3>7. How do you handle change orders?</h3>
      <p>
        Changes happen. Understand their process for handling modifications to the original
        scope of work and how additional costs will be communicated.
      </p>

      <h3>8. What is your payment schedule?</h3>
      <p>
        Never pay the full amount upfront. A typical schedule includes a deposit, progress
        payments, and final payment upon completion.
      </p>

      <h3>9. Do you offer warranties on your work?</h3>
      <p>
        Ask about warranties for both labor and materials. Get the warranty terms in writing
        as part of your contract.
      </p>

      <h3>10. Can I see a detailed written estimate?</h3>
      <p>
        A professional contractor provides a detailed, itemized estimate that breaks down
        costs for materials, labor, and any other expenses.
      </p>

      <h2>Red Flags to Watch For</h2>
      <ul>
        <li>Requesting full payment upfront</li>
        <li>No physical business address</li>
        <li>Pressure to sign immediately</li>
        <li>Unwillingness to provide references</li>
        <li>Significantly lower bids than competitors</li>
      </ul>
    </>
  ),
  'winter-home-preparation-guide': (
    <>
      <p className="lead">
        Massachusetts winters are notorious for their harsh conditions. Preparing your home
        before the cold sets in can prevent costly damage and keep your family comfortable
        all season long.
      </p>

      <h2>Why Winter Preparation Matters</h2>
      <p>
        New England winters bring freezing temperatures, heavy snow, ice storms, and strong
        winds. Without proper preparation, you could face frozen pipes, ice dams, heat loss,
        and structural damage that costs thousands to repair.
      </p>

      <h2>Exterior Preparation Checklist</h2>

      <h3>Inspect and Clean Gutters</h3>
      <p>
        Clogged gutters can lead to ice dams that damage your roof and siding. Clean all
        debris and ensure downspouts direct water away from your foundation.
      </p>

      <h3>Check Your Roof</h3>
      <p>
        Look for missing, damaged, or curling shingles. Address any issues before snow
        accumulates. Check flashing around chimneys and vents for gaps.
      </p>

      <h3>Seal Gaps and Cracks</h3>
      <p>
        Inspect the exterior for gaps around windows, doors, pipes, and cables. Use
        weatherstripping and caulk to seal any openings where cold air can enter.
      </p>

      <h3>Service Your Heating System</h3>
      <p>
        Have your furnace or heating system inspected and serviced before winter. Replace
        filters and ensure everything is working efficiently.
      </p>

      <h3>Protect Outdoor Plumbing</h3>
      <ul>
        <li>Disconnect and drain garden hoses</li>
        <li>Shut off exterior faucets from inside</li>
        <li>Insulate exposed pipes in unheated areas</li>
        <li>Know where your main water shutoff is located</li>
      </ul>

      <h2>Window and Door Maintenance</h2>
      <p>
        Windows and doors are major sources of heat loss. Check for:
      </p>
      <ul>
        <li>Drafts around frames and seals</li>
        <li>Cracked or damaged weatherstripping</li>
        <li>Condensation between panes (indicates seal failure)</li>
        <li>Proper operation of locks and latches</li>
      </ul>

      <h2>Siding Inspection</h2>
      <p>
        Your siding protects your home from the elements. Before winter:
      </p>
      <ul>
        <li>Look for cracks, holes, or loose panels</li>
        <li>Check for signs of moisture damage or rot</li>
        <li>Ensure all seams are properly sealed</li>
        <li>Clean mold or mildew that could worsen in cold, damp conditions</li>
      </ul>

      <h2>Emergency Preparation</h2>
      <p>
        Be ready for power outages and severe weather:
      </p>
      <ul>
        <li>Stock emergency supplies (flashlights, batteries, water)</li>
        <li>Have a backup heating source if possible</li>
        <li>Keep snow removal equipment accessible</li>
        <li>Know how to safely use a generator</li>
      </ul>
    </>
  ),
  'home-renovation-roi': (
    <>
      <p className="lead">
        Smart home renovations can significantly increase your property value while improving
        your daily living experience. But not all improvements are created equal when it comes
        to return on investment.
      </p>

      <h2>Understanding ROI in Home Improvement</h2>
      <p>
        Return on investment for home renovations measures how much of your project cost
        you can recoup when selling your home. While personal enjoyment matters, knowing
        which projects offer the best financial returns helps you make informed decisions.
      </p>

      <h2>Top ROI Home Improvements for 2025</h2>

      <h3>1. Siding Replacement (75-85% ROI)</h3>
      <p>
        New siding dramatically improves curb appeal and protects your home from the elements.
        Fiber cement and vinyl siding consistently rank among the best investments for
        Massachusetts homeowners.
      </p>

      <h3>2. Window Replacement (70-80% ROI)</h3>
      <p>
        Energy-efficient windows reduce utility costs and appeal to buyers. ENERGY STAR
        certified windows can recoup a significant portion of their cost at resale while
        providing immediate comfort and savings.
      </p>

      <h3>3. Entry Door Replacement (75-90% ROI)</h3>
      <p>
        A new front door offers one of the highest returns of any home improvement. Steel
        doors provide the best ROI, combining security, energy efficiency, and curb appeal.
      </p>

      <h3>4. Garage Door Replacement (90-100% ROI)</h3>
      <p>
        Often overlooked, garage door replacement consistently tops ROI lists. A new garage
        door instantly updates your home&apos;s appearance and improves functionality.
      </p>

      <h2>Factors Affecting ROI in Massachusetts</h2>
      <ul>
        <li><strong>Local market conditions:</strong> Boston metro areas may see higher returns</li>
        <li><strong>Quality of work:</strong> Professional installation matters</li>
        <li><strong>Material choices:</strong> Mid-range options often outperform luxury</li>
        <li><strong>Energy efficiency:</strong> Increasingly important to buyers</li>
      </ul>

      <h2>Improvements That May Not Pay Off</h2>
      <p>
        Some projects, while enjoyable, rarely recoup their costs:
      </p>
      <ul>
        <li>Swimming pools (especially in New England)</li>
        <li>Over-the-top customizations</li>
        <li>High-end upgrades in modest neighborhoods</li>
        <li>Combining bedrooms</li>
      </ul>

      <h2>Making Smart Decisions</h2>
      <p>
        The best renovation decisions balance personal enjoyment with financial return.
        Focus on improvements that enhance your daily life while maintaining or increasing
        your home&apos;s value.
      </p>
    </>
  ),
  'vinyl-vs-fiber-cement-siding': (
    <>
      <p className="lead">
        Choosing between vinyl and fiber cement siding is one of the biggest decisions
        you&apos;ll make for your home&apos;s exterior. Both options have loyal supporters,
        and understanding their differences helps you make the right choice for your situation.
      </p>

      <h2>Vinyl Siding: The Popular Choice</h2>
      <p>
        Vinyl siding has been America&apos;s most popular siding choice for decades, and for
        good reason. It offers an excellent balance of affordability, durability, and low maintenance.
      </p>

      <h3>Vinyl Advantages</h3>
      <ul>
        <li><strong>Cost-effective:</strong> Generally 20-30% less expensive than fiber cement</li>
        <li><strong>Low maintenance:</strong> Never needs painting; cleans easily</li>
        <li><strong>Color throughout:</strong> Scratches don&apos;t show because color is integrated</li>
        <li><strong>Moisture resistant:</strong> Won&apos;t rot or absorb water</li>
        <li><strong>Wide variety:</strong> Available in numerous colors and styles</li>
      </ul>

      <h3>Vinyl Considerations</h3>
      <ul>
        <li>Can crack in extreme cold</li>
        <li>May fade over time with UV exposure</li>
        <li>Less fire resistant than fiber cement</li>
        <li>Can warp if installed incorrectly</li>
      </ul>

      <h2>Fiber Cement Siding: The Premium Option</h2>
      <p>
        Fiber cement siding, with James Hardie being the most recognized brand, offers
        exceptional durability and a more authentic wood-like appearance.
      </p>

      <h3>Fiber Cement Advantages</h3>
      <ul>
        <li><strong>Exceptional durability:</strong> Can last 50+ years with proper maintenance</li>
        <li><strong>Fire resistant:</strong> Non-combustible material</li>
        <li><strong>Pest resistant:</strong> Won&apos;t attract termites or woodpeckers</li>
        <li><strong>Authentic appearance:</strong> Closely mimics real wood grain</li>
        <li><strong>Holds paint well:</strong> Factory finishes last 15+ years</li>
      </ul>

      <h3>Fiber Cement Considerations</h3>
      <ul>
        <li>Higher upfront cost</li>
        <li>Heavier material requiring more labor to install</li>
        <li>Requires repainting every 10-15 years</li>
        <li>Can absorb moisture if not properly sealed</li>
      </ul>

      <h2>Cost Comparison</h2>
      <p>
        For a typical Massachusetts home:
      </p>
      <ul>
        <li><strong>Vinyl:</strong> $6-$12 per square foot installed</li>
        <li><strong>Fiber Cement:</strong> $10-$18 per square foot installed</li>
      </ul>

      <h2>Which Is Right for You?</h2>
      <p>
        <strong>Choose vinyl if:</strong> Budget is a primary concern, you want minimal maintenance,
        or you plan to sell within 10-15 years.
      </p>
      <p>
        <strong>Choose fiber cement if:</strong> You want maximum durability, authentic wood appearance,
        superior fire protection, or plan to stay in your home long-term.
      </p>
    </>
  ),
  'signs-need-new-windows': (
    <>
      <p className="lead">
        Your windows work hard every day, protecting your home from the elements while letting
        in natural light. But even quality windows don&apos;t last forever. Here are seven signs
        that it&apos;s time to consider replacement.
      </p>

      <h2>1. Drafts and Air Leaks</h2>
      <p>
        If you feel cold air coming through closed windows, the seals have likely failed.
        Hold a candle or lighter near the window frame on a windy day—if the flame flickers,
        you have air infiltration that&apos;s costing you money on heating bills.
      </p>

      <h2>2. Condensation Between Panes</h2>
      <p>
        Fog or moisture between double or triple-pane glass indicates seal failure. Once the
        insulating gas escapes, the window loses much of its energy efficiency. This damage
        is irreversible without full window replacement.
      </p>

      <h2>3. Difficulty Opening or Closing</h2>
      <p>
        Windows that stick, won&apos;t stay open, or are hard to operate have likely warped or
        shifted. This could be due to moisture damage, settling, or worn hardware. Beyond
        inconvenience, this affects your home&apos;s security and ventilation.
      </p>

      <h2>4. Visible Damage or Decay</h2>
      <p>
        Obvious signs like rotting wood frames, chipping paint, or water stains indicate
        serious problems. Water damage can spread to surrounding walls and cause mold growth
        if not addressed promptly.
      </p>

      <h2>5. Increasing Energy Bills</h2>
      <p>
        If your heating and cooling costs keep rising despite steady usage, inefficient windows
        could be the culprit. Windows account for 25-30% of residential heating and cooling
        energy use. Modern ENERGY STAR windows can significantly reduce these costs.
      </p>

      <h2>6. Outside Noise Intrusion</h2>
      <p>
        Quality windows should provide sound insulation. If you&apos;re hearing more traffic,
        airplanes, or neighborhood noise than before, your windows are no longer providing
        adequate sound dampening.
      </p>

      <h2>7. Single-Pane or Older Windows</h2>
      <p>
        If your home still has single-pane windows or windows that are 20+ years old, they&apos;re
        likely well past their effective lifespan. Technology has advanced significantly,
        and modern windows offer dramatically better performance.
      </p>

      <h2>The Cost of Waiting</h2>
      <p>
        Delaying window replacement often costs more in the long run through:
      </p>
      <ul>
        <li>Higher energy bills every month</li>
        <li>Water damage to walls and framing</li>
        <li>Reduced home comfort</li>
        <li>Lower home value</li>
      </ul>

      <h2>When to Act</h2>
      <p>
        If you&apos;re experiencing multiple signs from this list, it&apos;s time to get a professional
        assessment. A qualified contractor can evaluate your windows and help you understand
        your options.
      </p>
    </>
  ),
  'exterior-renovation-timeline': (
    <>
      <p className="lead">
        Planning an exterior renovation but unsure what to expect? Understanding the typical
        timeline helps you prepare, set realistic expectations, and minimize disruption to
        your daily life.
      </p>

      <h2>Factors Affecting Timeline</h2>
      <p>
        Several variables influence how long your project will take:
      </p>
      <ul>
        <li>Size of your home</li>
        <li>Scope of work (single project vs. multiple improvements)</li>
        <li>Weather conditions</li>
        <li>Permit requirements</li>
        <li>Material availability</li>
        <li>Existing conditions and unforeseen issues</li>
      </ul>

      <h2>Siding Replacement Timeline</h2>
      <p>
        For an average-sized Massachusetts home (1,500-2,500 sq ft):
      </p>
      <ul>
        <li><strong>Consultation and estimate:</strong> 1-2 days</li>
        <li><strong>Material ordering:</strong> 1-3 weeks</li>
        <li><strong>Permits (if required):</strong> 1-2 weeks</li>
        <li><strong>Installation:</strong> 5-10 days</li>
        <li><strong>Final inspection:</strong> 1-2 days</li>
      </ul>
      <p>
        <strong>Total typical timeline:</strong> 3-6 weeks from contract to completion
      </p>

      <h2>Window Replacement Timeline</h2>
      <p>
        Window replacement is often faster than homeowners expect:
      </p>
      <ul>
        <li><strong>Measurement and ordering:</strong> 2-4 weeks</li>
        <li><strong>Installation:</strong> 1-3 days for most homes</li>
        <li><strong>Finishing touches:</strong> Same day or next day</li>
      </ul>
      <p>
        <strong>Total typical timeline:</strong> 3-5 weeks from order to installation
      </p>

      <h2>Door Installation Timeline</h2>
      <p>
        Entry door replacement is typically the quickest exterior upgrade:
      </p>
      <ul>
        <li><strong>Selection and ordering:</strong> 1-3 weeks</li>
        <li><strong>Installation:</strong> 4-8 hours</li>
      </ul>
      <p>
        <strong>Total typical timeline:</strong> 2-4 weeks
      </p>

      <h2>Complete Exterior Renovation</h2>
      <p>
        If you&apos;re doing siding, windows, and doors together:
      </p>
      <ul>
        <li><strong>Planning and design:</strong> 1-2 weeks</li>
        <li><strong>Material ordering:</strong> 2-4 weeks</li>
        <li><strong>Installation:</strong> 2-4 weeks</li>
      </ul>
      <p>
        <strong>Total typical timeline:</strong> 5-10 weeks
      </p>

      <h2>Best Time of Year for Exterior Work</h2>
      <p>
        In Massachusetts, the optimal seasons are:
      </p>
      <ul>
        <li><strong>Spring (April-June):</strong> Mild temperatures, less rain than fall</li>
        <li><strong>Fall (September-November):</strong> Stable weather before winter</li>
        <li><strong>Summer:</strong> Good weather but higher demand may affect scheduling</li>
        <li><strong>Winter:</strong> Limited exterior work possible, but indoor prep can be done</li>
      </ul>

      <h2>How to Minimize Delays</h2>
      <ul>
        <li>Make decisions promptly when asked</li>
        <li>Clear the work area before installers arrive</li>
        <li>Plan for material lead times</li>
        <li>Be flexible with scheduling</li>
        <li>Book contractors well in advance, especially for spring and fall</li>
      </ul>
    </>
  ),

  'mass-save-rebates-windows-doors': (
    <>
      <p className="lead">
        Massachusetts homeowners can save thousands of dollars on energy-efficient windows and doors
        through the Mass Save program. This comprehensive guide explains how to take advantage of
        these valuable rebates in 2025.
      </p>

      <h2>What is Mass Save?</h2>
      <p>
        Mass Save is a collaborative of Massachusetts&apos; gas and electric utilities and energy
        efficiency service providers. The program offers rebates, incentives, and no-cost energy
        assessments to help residents reduce energy usage and costs.
      </p>

      <h2>Window Rebates Available in 2025</h2>
      <p>
        Massachusetts residents can receive substantial rebates on ENERGY STAR certified windows:
      </p>
      <ul>
        <li><strong>Standard rebate:</strong> $75 per window (up to 10 windows)</li>
        <li><strong>Triple-pane bonus:</strong> Additional $25 per window</li>
        <li><strong>Income-eligible households:</strong> Up to 100% of costs covered</li>
        <li><strong>Maximum rebate:</strong> $750-$1,000 for most homeowners</li>
      </ul>

      <h2>Door Rebates</h2>
      <p>
        Energy-efficient doors also qualify for Mass Save incentives:
      </p>
      <ul>
        <li><strong>ENERGY STAR entry doors:</strong> $50-$100 rebate per door</li>
        <li><strong>Storm doors:</strong> May qualify when combined with other upgrades</li>
        <li><strong>Sliding patio doors:</strong> $75-$150 rebate</li>
      </ul>

      <h2>How to Qualify</h2>
      <ol>
        <li><strong>Schedule a Home Energy Assessment:</strong> Free no-cost assessment from Mass Save</li>
        <li><strong>Choose qualifying products:</strong> Must be ENERGY STAR certified</li>
        <li><strong>Use approved contractors:</strong> Work with Mass Save partner contractors</li>
        <li><strong>Submit documentation:</strong> Keep receipts and submit rebate forms</li>
      </ol>

      <h2>Federal Tax Credits</h2>
      <p>
        In addition to Mass Save rebates, you may also qualify for federal energy tax credits:
      </p>
      <ul>
        <li>30% of costs up to $600 for windows</li>
        <li>30% of costs up to $500 for doors</li>
        <li>Maximum annual credit: $1,200 for windows and doors combined</li>
      </ul>

      <h2>Maximize Your Savings</h2>
      <p>
        At Maia Construction, we help homeowners navigate both Mass Save rebates and federal tax
        credits. Our team handles the paperwork and ensures your installations meet all requirements
        for maximum savings.
      </p>
    </>
  ),

  'best-siding-colors-new-england-homes': (
    <>
      <p className="lead">
        Choosing the right siding color for your Massachusetts home can dramatically boost curb
        appeal and property value. Whether you own a classic Colonial, Cape Cod, or Victorian,
        the right color choice makes all the difference.
      </p>

      <h2>Understanding New England Architectural Styles</h2>
      <p>
        Massachusetts is home to diverse architectural styles, each with color traditions that
        honor their heritage while allowing for modern expression.
      </p>

      <h3>Colonial Homes</h3>
      <p>
        Classic Colonial homes look stunning in:
      </p>
      <ul>
        <li><strong>Classic white:</strong> Timeless and clean, pairs with any trim color</li>
        <li><strong>Slate gray:</strong> Modern twist on tradition</li>
        <li><strong>Navy blue:</strong> Bold yet historically appropriate</li>
        <li><strong>Sage green:</strong> Complements New England landscapes</li>
      </ul>

      <h3>Cape Cod Style</h3>
      <p>
        Cape Cod homes traditionally feature:
      </p>
      <ul>
        <li><strong>Weathered gray:</strong> Coastal classic that ages beautifully</li>
        <li><strong>Soft blue:</strong> Reflects the ocean and sky</li>
        <li><strong>Warm white:</strong> Clean and inviting</li>
        <li><strong>Natural cedar tones:</strong> Authentic coastal feel</li>
      </ul>

      <h3>Victorian Homes</h3>
      <p>
        Victorians allow for more colorful expressions:
      </p>
      <ul>
        <li><strong>Deep burgundy:</strong> Rich and historic</li>
        <li><strong>Forest green:</strong> Natural elegance</li>
        <li><strong>Multi-color schemes:</strong> Traditional &quot;painted ladies&quot; approach</li>
      </ul>

      <h2>Color Trends for 2025</h2>
      <ul>
        <li><strong>Warm neutrals:</strong> Greige, taupe, and warm beige</li>
        <li><strong>Dark and dramatic:</strong> Charcoal, black, and deep navy</li>
        <li><strong>Earth tones:</strong> Terracotta, olive, and rust accents</li>
        <li><strong>Blue-greens:</strong> Teal and eucalyptus continue trending</li>
      </ul>

      <h2>Factors to Consider</h2>
      <ul>
        <li><strong>Neighborhood context:</strong> Complement surrounding homes</li>
        <li><strong>Roof color:</strong> Ensure siding harmonizes with existing roof</li>
        <li><strong>Landscaping:</strong> Consider how colors interact with gardens</li>
        <li><strong>Sun exposure:</strong> Dark colors may fade faster on south-facing walls</li>
        <li><strong>HOA requirements:</strong> Check for any color restrictions</li>
      </ul>

      <h2>Free Color Consultation</h2>
      <p>
        Maia Construction offers free color consultations with every siding project. We&apos;ll
        help you choose colors that enhance your home&apos;s architecture and boost its value.
      </p>
    </>
  ),

  'storm-doors-vs-screen-doors': (
    <>
      <p className="lead">
        Choosing between a storm door and a screen door depends on your priorities: energy
        efficiency, ventilation, or both. This guide helps Massachusetts homeowners make the
        right choice for their homes.
      </p>

      <h2>What&apos;s the Difference?</h2>

      <h3>Storm Doors</h3>
      <p>
        Storm doors are designed primarily for protection and energy efficiency:
      </p>
      <ul>
        <li>Full glass panel or glass/screen combination</li>
        <li>Provide insulation against cold and heat</li>
        <li>Protect main entry door from weather</li>
        <li>Typically have interchangeable glass and screen panels</li>
      </ul>

      <h3>Screen Doors</h3>
      <p>
        Screen doors focus on ventilation and insect protection:
      </p>
      <ul>
        <li>Mesh screen allows airflow</li>
        <li>Keeps insects and debris out</li>
        <li>Lighter construction than storm doors</li>
        <li>Less protection from weather</li>
      </ul>

      <h2>Best Choice for Massachusetts Homes</h2>
      <p>
        Given Massachusetts&apos; cold winters and variable weather, storm doors offer the best
        year-round value. However, the best modern storm doors combine both functions.
      </p>

      <h3>Full-View Storm Doors</h3>
      <ul>
        <li><strong>Pros:</strong> Maximum light, showcases entry door</li>
        <li><strong>Cons:</strong> Less ventilation</li>
        <li><strong>Best for:</strong> Homes with attractive entry doors</li>
      </ul>

      <h3>Retractable Screen Storm Doors</h3>
      <ul>
        <li><strong>Pros:</strong> Best of both worlds - protection and ventilation</li>
        <li><strong>Cons:</strong> Higher cost</li>
        <li><strong>Best for:</strong> Most Massachusetts homes</li>
      </ul>

      <h3>Traditional Storm Doors</h3>
      <ul>
        <li><strong>Pros:</strong> Maximum insulation, affordable</li>
        <li><strong>Cons:</strong> Requires manual panel changes</li>
        <li><strong>Best for:</strong> Budget-conscious homeowners</li>
      </ul>

      <h2>Energy Savings</h2>
      <p>
        A quality storm door can reduce energy loss through your entry door by up to 50%.
        In Massachusetts, this can translate to $100-200 in annual heating savings.
      </p>

      <h2>Cost Comparison</h2>
      <ul>
        <li><strong>Basic screen door:</strong> $100-$300 installed</li>
        <li><strong>Standard storm door:</strong> $300-$600 installed</li>
        <li><strong>Premium retractable screen storm door:</strong> $600-$1,200 installed</li>
      </ul>

      <h2>Our Recommendation</h2>
      <p>
        For Massachusetts homes, we recommend a mid-range storm door with retractable screen
        functionality. This gives you energy protection in winter and ventilation in summer.
        Contact Maia Construction for a free consultation.
      </p>
    </>
  ),

  'siding-contractors-boston-metro': (
    <>
      <p className="lead">
        Finding a reliable siding contractor in the Boston metro area can be challenging.
        With so many options available, how do you choose the right one for your home?
        This guide helps you make an informed decision.
      </p>

      <h2>Why Location Matters for Siding Contractors</h2>
      <p>
        Hiring a local contractor in the Boston metro area offers several advantages:
      </p>
      <ul>
        <li><strong>Knowledge of local codes:</strong> Familiar with Boston, Cambridge, and surrounding area building requirements</li>
        <li><strong>Weather expertise:</strong> Understanding of New England&apos;s unique climate challenges</li>
        <li><strong>Quick response:</strong> Available for follow-up service and warranty work</li>
        <li><strong>Local reputation:</strong> Easier to verify references and see completed work</li>
      </ul>

      <h2>What to Look for in a Siding Contractor</h2>

      <h3>1. Proper Licensing</h3>
      <p>
        In Massachusetts, contractors must hold a valid Home Improvement Contractor (HIC) license.
        Always verify the license number through the state&apos;s official database.
      </p>

      <h3>2. Insurance Coverage</h3>
      <ul>
        <li>General liability insurance (minimum $1 million)</li>
        <li>Workers&apos; compensation insurance</li>
        <li>Ask for certificates of insurance</li>
      </ul>

      <h3>3. Experience and Specialization</h3>
      <p>
        Look for contractors with specific experience in your siding type:
      </p>
      <ul>
        <li>Vinyl siding specialists</li>
        <li>James Hardie certified installers</li>
        <li>Cedar and wood siding experts</li>
      </ul>

      <h3>4. Written Estimates and Contracts</h3>
      <p>
        A professional contractor should provide:
      </p>
      <ul>
        <li>Detailed written estimate</li>
        <li>Clear scope of work</li>
        <li>Material specifications</li>
        <li>Timeline and payment schedule</li>
        <li>Warranty information</li>
      </ul>

      <h2>Red Flags to Avoid</h2>
      <ul>
        <li>No physical business address</li>
        <li>Requesting full payment upfront</li>
        <li>Pressure to sign immediately</li>
        <li>No written contract</li>
        <li>Significantly lower prices than competitors</li>
        <li>No references or portfolio</li>
      </ul>

      <h2>Questions to Ask</h2>
      <ol>
        <li>How long have you been installing siding in the Boston area?</li>
        <li>Can you provide local references I can contact?</li>
        <li>Who will be doing the actual installation?</li>
        <li>What warranty do you offer on labor?</li>
        <li>How do you handle unexpected issues during installation?</li>
      </ol>
    </>
  ),

  'window-replacement-cost-massachusetts': (
    <>
      <p className="lead">
        Understanding window replacement costs in Massachusetts helps you budget effectively
        and avoid overpaying. Here&apos;s a comprehensive 2025 pricing guide based on current
        market rates.
      </p>

      <h2>Average Window Replacement Costs in MA</h2>
      <p>
        Window replacement costs vary based on several factors. Here are typical ranges:
      </p>

      <h3>By Window Type</h3>
      <ul>
        <li><strong>Double-hung windows:</strong> $400-$800 per window installed</li>
        <li><strong>Casement windows:</strong> $450-$900 per window installed</li>
        <li><strong>Bay windows:</strong> $1,500-$3,500 installed</li>
        <li><strong>Bow windows:</strong> $2,000-$4,000 installed</li>
        <li><strong>Picture windows:</strong> $400-$1,200 installed</li>
        <li><strong>Sliding windows:</strong> $350-$700 per window installed</li>
      </ul>

      <h3>By Material</h3>
      <ul>
        <li><strong>Vinyl:</strong> $300-$600 per window</li>
        <li><strong>Wood:</strong> $600-$1,200 per window</li>
        <li><strong>Fiberglass:</strong> $500-$900 per window</li>
        <li><strong>Aluminum:</strong> $400-$700 per window</li>
        <li><strong>Composite:</strong> $500-$800 per window</li>
      </ul>

      <h2>Factors Affecting Cost</h2>

      <h3>1. Window Size</h3>
      <p>
        Standard sizes cost less than custom dimensions. Oversized windows require
        more materials and labor.
      </p>

      <h3>2. Glass Options</h3>
      <ul>
        <li><strong>Double-pane:</strong> Standard, included in base price</li>
        <li><strong>Triple-pane:</strong> Add $100-$200 per window</li>
        <li><strong>Low-E coating:</strong> Add $25-$50 per window</li>
        <li><strong>Argon gas fill:</strong> Add $30-$50 per window</li>
      </ul>

      <h3>3. Installation Complexity</h3>
      <ul>
        <li>Second-floor access</li>
        <li>Frame damage requiring repair</li>
        <li>Custom trim work</li>
        <li>Removal of storms or old frames</li>
      </ul>

      <h2>Whole-House Replacement Costs</h2>
      <p>
        For a typical Massachusetts home with 15-20 windows:
      </p>
      <ul>
        <li><strong>Budget vinyl:</strong> $6,000-$10,000</li>
        <li><strong>Mid-range vinyl:</strong> $10,000-$15,000</li>
        <li><strong>Premium vinyl/fiberglass:</strong> $15,000-$25,000</li>
        <li><strong>Wood windows:</strong> $20,000-$35,000</li>
      </ul>

      <h2>Ways to Save Money</h2>
      <ul>
        <li>Mass Save rebates (up to $750)</li>
        <li>Federal tax credits (up to $600)</li>
        <li>Off-season installation discounts</li>
        <li>Multi-window package deals</li>
        <li>Financing options with promotional rates</li>
      </ul>

      <h2>Get an Accurate Quote</h2>
      <p>
        Prices vary significantly between contractors. We recommend getting at least
        3 written estimates from licensed Massachusetts contractors. At Maia Construction,
        we provide free, no-obligation estimates with transparent pricing.
      </p>
    </>
  ),

  'james-hardie-siding-installation': (
    <>
      <p className="lead">
        James Hardie fiber cement siding is considered the gold standard for home exteriors.
        But is it worth the higher investment for Massachusetts homeowners? Let&apos;s examine
        the facts.
      </p>

      <h2>What is James Hardie Siding?</h2>
      <p>
        James Hardie siding is made from fiber cement - a composite of cement, sand, and
        cellulose fibers. It&apos;s engineered specifically for different climate zones, with
        the HZ5 formulation designed for cold, wet climates like Massachusetts.
      </p>

      <h2>James Hardie vs. Vinyl Siding</h2>

      <h3>Durability</h3>
      <ul>
        <li><strong>James Hardie:</strong> 50+ year lifespan, doesn&apos;t warp, crack, or melt</li>
        <li><strong>Vinyl:</strong> 20-30 year lifespan, can crack in extreme cold</li>
      </ul>

      <h3>Appearance</h3>
      <ul>
        <li><strong>James Hardie:</strong> Deep wood-grain texture, holds paint better</li>
        <li><strong>Vinyl:</strong> Less authentic appearance, color fades over time</li>
      </ul>

      <h3>Fire Resistance</h3>
      <ul>
        <li><strong>James Hardie:</strong> Non-combustible, highest fire rating</li>
        <li><strong>Vinyl:</strong> Can melt and contribute to fire spread</li>
      </ul>

      <h3>Cost Comparison</h3>
      <ul>
        <li><strong>James Hardie:</strong> $10-$15 per sq ft installed</li>
        <li><strong>Vinyl:</strong> $5-$9 per sq ft installed</li>
      </ul>

      <h2>Why James Hardie Excels in Massachusetts</h2>

      <h3>HZ5 Climate Zone Engineering</h3>
      <p>
        The HZ5 formula is specifically designed for freeze-thaw cycles and moisture
        resistance - exactly what New England homes need.
      </p>

      <h3>ColorPlus Technology</h3>
      <p>
        Factory-applied finish that&apos;s baked on, providing:
      </p>
      <ul>
        <li>Better color consistency</li>
        <li>15-year color warranty</li>
        <li>Resistance to fading, chipping, and cracking</li>
      </ul>

      <h2>Installation Requirements</h2>
      <p>
        James Hardie requires certified installers due to:
      </p>
      <ul>
        <li>Specific cutting and fastening requirements</li>
        <li>Proper flashing and moisture management</li>
        <li>Warranty compliance requirements</li>
      </ul>

      <h2>Return on Investment</h2>
      <p>
        According to Remodeling Magazine&apos;s Cost vs. Value Report:
      </p>
      <ul>
        <li>James Hardie siding replacement recovers approximately 90% of cost at resale</li>
        <li>Vinyl siding recovers approximately 68% of cost</li>
      </ul>

      <h2>Our Verdict</h2>
      <p>
        For Massachusetts homeowners planning to stay in their home long-term, James Hardie
        is worth the investment. The superior durability, appearance, and warranty make it
        the better long-term value despite the higher upfront cost.
      </p>
    </>
  ),

  'patio-door-options-guide': (
    <>
      <p className="lead">
        Choosing the right patio door affects your home&apos;s aesthetics, energy efficiency,
        and indoor-outdoor flow. Here&apos;s how sliding, French, and bi-fold doors compare
        for Massachusetts homes.
      </p>

      <h2>Sliding Patio Doors</h2>

      <h3>How They Work</h3>
      <p>
        One or more panels slide horizontally on a track. Most common configuration is
        one fixed panel and one sliding panel.
      </p>

      <h3>Pros</h3>
      <ul>
        <li>Space-efficient - don&apos;t swing into room</li>
        <li>Large glass area for views and light</li>
        <li>Most affordable option</li>
        <li>Easy operation</li>
        <li>Good for smaller spaces</li>
      </ul>

      <h3>Cons</h3>
      <ul>
        <li>Only half the opening is accessible</li>
        <li>Track can collect debris</li>
        <li>Less traditional appearance</li>
      </ul>

      <h3>Cost</h3>
      <p>$1,500-$4,000 installed</p>

      <h2>French Patio Doors</h2>

      <h3>How They Work</h3>
      <p>
        Two hinged doors that swing open from the center. Can swing inward or outward.
      </p>

      <h3>Pros</h3>
      <ul>
        <li>Classic, elegant appearance</li>
        <li>Full opening access</li>
        <li>Better for traditional home styles</li>
        <li>Easier to maintain and clean</li>
        <li>Better ventilation</li>
      </ul>

      <h3>Cons</h3>
      <ul>
        <li>Requires swing space</li>
        <li>Higher cost</li>
        <li>More maintenance on hinges and seals</li>
      </ul>

      <h3>Cost</h3>
      <p>$2,500-$6,000 installed</p>

      <h2>Bi-Fold Patio Doors</h2>

      <h3>How They Work</h3>
      <p>
        Multiple panels fold accordion-style to one or both sides, creating a wide
        open space.
      </p>

      <h3>Pros</h3>
      <ul>
        <li>Maximum opening - up to 90% of frame</li>
        <li>Modern, dramatic appearance</li>
        <li>Seamless indoor-outdoor living</li>
        <li>Great for entertaining</li>
      </ul>

      <h3>Cons</h3>
      <ul>
        <li>Most expensive option</li>
        <li>Complex mechanism requires more maintenance</li>
        <li>Stacked panels take up space when open</li>
        <li>May not suit traditional homes</li>
      </ul>

      <h3>Cost</h3>
      <p>$5,000-$15,000+ installed</p>

      <h2>Best Choice for Massachusetts</h2>

      <h3>For Energy Efficiency</h3>
      <p>
        French doors typically offer the best seal against New England weather when
        properly installed with quality weatherstripping.
      </p>

      <h3>For Small Spaces</h3>
      <p>
        Sliding doors are ideal when you can&apos;t sacrifice floor space for swing clearance.
      </p>

      <h3>For Modern Homes</h3>
      <p>
        Bi-fold doors create a stunning feature, perfect for homes with outdoor
        living spaces and summer entertaining.
      </p>

      <h2>Get Expert Advice</h2>
      <p>
        Not sure which option is right for your home? Contact Maia Construction for
        a free consultation. We&apos;ll assess your space, discuss your priorities, and
        recommend the best patio door solution.
      </p>
    </>
  ),

  'home-exterior-maintenance-checklist': (
    <>
      <p className="lead">
        Regular maintenance extends the life of your siding, windows, and doors while
        preventing costly repairs. Use this seasonal checklist to protect your
        Massachusetts home.
      </p>

      <h2>Spring Maintenance (March-May)</h2>

      <h3>Siding</h3>
      <ul>
        <li>Inspect for winter damage - cracks, warping, loose panels</li>
        <li>Clean with gentle pressure wash (max 1500 PSI for vinyl)</li>
        <li>Check caulking around trim and windows</li>
        <li>Look for signs of pest damage or nesting</li>
        <li>Touch up paint on fiber cement siding if needed</li>
      </ul>

      <h3>Windows</h3>
      <ul>
        <li>Clean glass inside and out</li>
        <li>Check weatherstripping for damage</li>
        <li>Test window operation - they should open and close smoothly</li>
        <li>Inspect screens for tears or damage</li>
        <li>Clear weep holes of debris</li>
      </ul>

      <h3>Doors</h3>
      <ul>
        <li>Inspect weatherstripping and door sweeps</li>
        <li>Lubricate hinges and locks</li>
        <li>Check threshold for gaps</li>
        <li>Clean and inspect storm doors</li>
      </ul>

      <h2>Summer Maintenance (June-August)</h2>

      <h3>Siding</h3>
      <ul>
        <li>Trim vegetation away from siding (6-inch minimum gap)</li>
        <li>Check for fading or discoloration</li>
        <li>Inspect for mold or mildew growth</li>
      </ul>

      <h3>Windows</h3>
      <ul>
        <li>Install or check window screens</li>
        <li>Verify AC units aren&apos;t damaging window frames</li>
        <li>Check for condensation between glass panes (sign of seal failure)</li>
      </ul>

      <h3>Doors</h3>
      <ul>
        <li>Switch storm door panels to screens if applicable</li>
        <li>Check for wood rot on door frames</li>
        <li>Verify door locks and hardware function properly</li>
      </ul>

      <h2>Fall Maintenance (September-November)</h2>

      <h3>Siding</h3>
      <ul>
        <li>Final cleaning before winter</li>
        <li>Re-caulk any gaps or cracks</li>
        <li>Clear gutters and downspouts near siding</li>
        <li>Check for animal entry points</li>
      </ul>

      <h3>Windows</h3>
      <ul>
        <li>Switch from screens to storm windows</li>
        <li>Add window insulation film if needed</li>
        <li>Check for drafts with incense or candle test</li>
        <li>Ensure all windows lock properly</li>
      </ul>

      <h3>Doors</h3>
      <ul>
        <li>Replace worn weatherstripping</li>
        <li>Install storm door glass panels</li>
        <li>Check door bottom seal</li>
        <li>Verify exterior doors close tightly</li>
      </ul>

      <h2>Winter Maintenance (December-February)</h2>

      <h3>Siding</h3>
      <ul>
        <li>Carefully remove ice dams near siding</li>
        <li>Keep snow cleared from foundation line</li>
        <li>Watch for ice damage after storms</li>
      </ul>

      <h3>Windows</h3>
      <ul>
        <li>Monitor for excessive interior condensation</li>
        <li>Check for ice forming on interior glass (sign of poor insulation)</li>
        <li>Keep snow from blocking egress windows</li>
      </ul>

      <h3>Doors</h3>
      <ul>
        <li>Keep entry areas clear of snow and ice</li>
        <li>Check for drafts around door frames</li>
        <li>Ensure locks work in cold weather</li>
      </ul>

      <h2>When to Call a Professional</h2>
      <p>
        Contact Maia Construction if you notice:
      </p>
      <ul>
        <li>Visible damage to siding, windows, or doors</li>
        <li>Significant drafts or energy bill increases</li>
        <li>Water damage or staining</li>
        <li>Difficulty operating windows or doors</li>
        <li>Foggy or cloudy window glass</li>
      </ul>
    </>
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recentPosts = getRecentPosts(3).filter((p) => p.slug !== slug);
  const content = blogContent[slug] || <p>Content coming soon...</p>;

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.image,
    datePublished: post.date,
    author: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
    },
  };

  return (
    <>
      <JsonLd data={articleSchema} />

      {/* Hero with Post Image */}
      <section className="relative min-h-[50vh] flex items-end pt-24">
        {post.image && (
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
            priority
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/70 to-slate-900/30" />
        <div className="relative z-10 container mx-auto px-4 py-16">
          <div className="max-w-4xl">
            <div className="flex flex-wrap gap-2 mb-4">
              {post.tags.map((tag) => (
                <Link
                  key={tag}
                  href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                  className="px-3 py-1 bg-amber-400 text-slate-900 rounded-full text-sm font-semibold hover:bg-amber-300 transition-colors"
                >
                  {tag}
                </Link>
              ))}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{post.title}</h1>
            <div className="flex items-center space-x-4 text-white/80">
              <span>{post.author}</span>
              <span>•</span>
              <span>
                {new Date(post.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Breadcrumbs */}
      <div className="bg-slate-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <Breadcrumbs
            items={[
              { label: 'Blog', href: '/blog' },
              { label: post.title },
            ]}
          />
        </div>
      </div>

      {/* Article Content */}
      <article className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <div className="prose prose-lg max-w-none prose-headings:text-slate-900 prose-a:text-amber-500 prose-a:no-underline hover:prose-a:underline">
                {content}
              </div>

              {/* CTA */}
              <div className="mt-12 p-8 bg-gradient-to-r from-slate-900 to-blue-900 rounded-2xl text-white">
                <h3 className="text-2xl font-bold mb-4">Ready to Get Started?</h3>
                <p className="text-white/80 mb-6">
                  Contact Maia Construction today for a free estimate on your home improvement project.
                </p>
                <a
                  href={PHONE_LINK}
                  className="inline-flex items-center px-8 py-4 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold"
                >
                  Call {PHONE}
                </a>
              </div>

              {/* Follow Us */}
              <div className="mt-8 pt-8 border-t border-slate-200">
                <p className="font-semibold text-slate-900 mb-4">Follow Maia Construction:</p>
                <div className="flex space-x-4">
                  <a
                    href="https://www.facebook.com/maiaconstruction/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors"
                    aria-label="Facebook"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M18.77,7.46H14.5v-1.9c0-.9.6-1.1,1-1.1h3V.5h-4.33C10.24.5,9.5,3.44,9.5,5.32v2.15h-3v4h3v12h5v-12h3.85l.42-4Z"/></svg>
                  </a>
                  <a
                    href="https://www.instagram.com/maia.construction"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors"
                    aria-label="Instagram"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                  </a>
                  <a
                    href="https://www.youtube.com/@maiaconstruction581"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center hover:bg-amber-400 transition-colors"
                    aria-label="YouTube"
                  >
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 space-y-8">
                {/* Recent Posts */}
                <div className="bg-slate-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Recent Posts</h3>
                  <div className="space-y-4">
                    {recentPosts.map((recentPost) => (
                      <Link
                        key={recentPost.slug}
                        href={`/blog/${recentPost.slug}`}
                        className="block group"
                      >
                        <h4 className="font-semibold text-slate-900 group-hover:text-amber-500 transition-colors line-clamp-2">
                          {recentPost.title}
                        </h4>
                        <p className="text-sm text-gray-500 mt-1">
                          {new Date(recentPost.date).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>

                {/* Related Services */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200">
                  <h3 className="text-xl font-bold text-slate-900 mb-4">Our Services</h3>
                  <div className="space-y-3">
                    <Link href="/services/siding" className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group">
                      <span className="text-2xl">🏠</span>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-amber-500">Siding Installation</p>
                        <p className="text-xs text-gray-500">Vinyl & Fiber Cement</p>
                      </div>
                    </Link>
                    <Link href="/services/windows" className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group">
                      <span className="text-2xl">🪟</span>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-amber-500">Window Replacement</p>
                        <p className="text-xs text-gray-500">ENERGY STAR Certified</p>
                      </div>
                    </Link>
                    <Link href="/services/doors" className="flex items-center gap-3 p-3 rounded-lg hover:bg-amber-50 transition-colors group">
                      <span className="text-2xl">🚪</span>
                      <div>
                        <p className="font-semibold text-slate-900 group-hover:text-amber-500">Door Installation</p>
                        <p className="text-xs text-gray-500">Entry, Storm & Patio</p>
                      </div>
                    </Link>
                  </div>
                </div>

                {/* Contact Card */}
                <div className="bg-slate-900 rounded-2xl p-6 text-white">
                  <h3 className="text-xl font-bold mb-4">Need Help?</h3>
                  <p className="text-white/80 mb-4">
                    Our experts are here to answer your questions.
                  </p>
                  <a
                    href={PHONE_LINK}
                    className="block w-full py-3 bg-gradient-to-r from-amber-400 to-yellow-300 text-slate-900 rounded-full font-bold text-center"
                  >
                    {PHONE}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </article>
    </>
  );
}
