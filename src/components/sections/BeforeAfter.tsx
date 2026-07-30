'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

interface BeforeAfterProject {
  id: string;
  title: string;
  location: string;
  beforeImage: string;
  afterImage: string;
  service: string;
  /** Badge on the left-hand image. Some pairs are mid-job rather than
   *  original condition, and calling those "BEFORE" would misrepresent them. */
  beforeLabel?: string;
}

const projects: BeforeAfterProject[] = [
  // Atkinson, NH — one house, three elevations of the same siding replacement.
  {
    id: '6',
    title: 'Full Siding Replacement — Rear Elevation',
    location: 'Atkinson, NH',
    beforeImage: '/images/before-after/siding-before-atkinson-nh.webp',
    afterImage: '/images/before-after/siding-after-atkinson-nh.webp',
    service: 'Siding',
  },
  {
    id: '7',
    title: 'Full Siding Replacement — Side Elevation',
    location: 'Atkinson, NH',
    beforeImage: '/images/before-after/siding-before-atkinson-nh-2.webp',
    afterImage: '/images/before-after/siding-after-atkinson-nh-2.webp',
    service: 'Siding',
  },
  {
    id: '8',
    title: 'Full Siding Replacement — Entry Side',
    location: 'Atkinson, NH',
    beforeImage: '/images/before-after/siding-before-atkinson-nh-3.webp',
    afterImage: '/images/before-after/siding-after-atkinson-nh-3.webp',
    service: 'Siding',
  },
  {
    id: '9',
    title: 'Palladian Window & Custom PVC Trim',
    location: 'Woburn, MA',
    beforeImage: '/images/before-after/siding-before-woburn-ma.webp',
    afterImage: '/images/before-after/siding-after-woburn-ma.webp',
    service: 'Siding',
    beforeLabel: 'MID-JOB',
  },
  {
    id: '10',
    title: 'Sliding Patio Door Replacement',
    location: 'Norfolk, MA',
    beforeImage: '/images/before-after/door-before-norfolk-ma.webp',
    afterImage: '/images/before-after/door-after-norfolk-ma.webp',
    service: 'Doors',
    beforeLabel: 'DURING INSTALL',
  },
  {
    id: '11',
    title: 'Housewrap to Finished Siding',
    location: 'Atkinson, NH',
    beforeImage: '/images/before-after/siding-before-atkinson-nh-4.webp',
    afterImage: '/images/before-after/siding-after-atkinson-nh-4.webp',
    service: 'Siding',
    beforeLabel: 'HOUSEWRAP',
  },
  {
    id: '12',
    title: 'Wall Insulation to Finished Siding',
    location: 'Atkinson, NH',
    beforeImage: '/images/before-after/siding-before-atkinson-nh-5.webp',
    afterImage: '/images/before-after/siding-after-atkinson-nh-5.webp',
    service: 'Siding',
    beforeLabel: 'INSULATION',
  },
  {
    id: '13',
    title: 'Custom PVC Arch Trim',
    location: 'Woburn, MA',
    beforeImage: '/images/before-after/trim-before-woburn-ma.webp',
    afterImage: '/images/before-after/trim-after-woburn-ma.webp',
    service: 'Siding',
    beforeLabel: 'FABRICATION',
  },
  // Real Maia Construction projects. Each entry is ONE house (before + after).
  // Two of the file names below are historical (pairs 1 & 2 keep their original
  // paths); the images are the genuine same-house before/after shots. afterImage
  // is also the card/thumbnail cover, so it is always the finished photo.
  {
    id: '1',
    title: 'Full Vinyl Siding Replacement',
    location: 'Framingham, MA',
    beforeImage: '/images/before-after/siding-before-framingham-ma.webp', // brown Cape — before
    afterImage: '/images/before-after/exterior-after-worcester-ma.webp',  // same house, navy — after
    service: 'Siding',
  },
  {
    id: '2',
    title: 'Cedar-to-Vinyl Siding Transformation',
    location: 'Worcester, MA',
    beforeImage: '/images/before-after/siding-after-framingham-ma.webp',   // teal Dutch Colonial — before
    afterImage: '/images/before-after/exterior-before-worcester-ma.webp',  // same house, blue-gray — after
    service: 'Siding',
  },
  {
    id: '3',
    title: 'Carriage House Fiber-Cement Siding',
    location: 'Marlborough, MA',
    beforeImage: '/images/before-after/siding-before-marlborough-ma.webp',
    afterImage: '/images/before-after/siding-after-marlborough-ma.webp',
    service: 'Siding',
  },
  {
    id: '4',
    title: 'Split-Level Siding Replacement',
    location: 'Natick, MA',
    beforeImage: '/images/before-after/siding-before-natick-ma.webp',
    afterImage: '/images/before-after/siding-after-natick-ma.webp',
    service: 'Siding',
  },
  {
    id: '5',
    title: 'Complete Exterior Siding',
    location: 'Hudson, MA',
    beforeImage: '/images/before-after/siding-before-hudson-ma.webp',
    afterImage: '/images/before-after/siding-after-hudson-ma.webp',
    service: 'Siding',
  },
];

// The homepage, city and service pages show only these five — the full list of
// thirteen turns the "Recent Projects" rail into an endless scroll. Picked for
// the widest visible change, one entry per town, and one door job so the rail
// isn't all siding. /projects passes showAll and gets everything.
const FEATURED_IDS = ['6', '2', '4', '1', '10'];

const featured = FEATURED_IDS.map((id) => projects.find((p) => p.id === id)).filter(
  (p): p is BeforeAfterProject => Boolean(p)
);

interface BeforeAfterProps {
  title?: string;
  subtitle?: string;
  /** Show every project instead of the five featured ones. Used by /projects. */
  showAll?: boolean;
}

export default function BeforeAfter({
  title = 'Our Transformations',
  subtitle = 'See the difference quality craftsmanship makes',
  showAll = false,
}: BeforeAfterProps) {
  const visible = showAll || featured.length === 0 ? projects : featured;
  const [activeProject, setActiveProject] = useState(0);
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = Math.max(0, Math.min(e.touches[0].clientX - rect.left, rect.width));
    setSliderPosition((x / rect.width) * 100);
  };

  const currentProject = visible[activeProject];

  return (
    <section className="py-24 bg-slate-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-white/80 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Before/After Slider */}
          <div className="lg:col-span-2">
            <div
              className="relative aspect-[4/3] rounded-2xl overflow-hidden cursor-ew-resize select-none"
              onMouseMove={handleMouseMove}
              onMouseDown={() => setIsDragging(true)}
              onMouseUp={() => setIsDragging(false)}
              onMouseLeave={() => setIsDragging(false)}
              onTouchMove={handleTouchMove}
            >
              {/* After Image (Background) */}
              <div className="absolute inset-0">
                <Image
                  src={currentProject.afterImage}
                  alt={`${currentProject.title} completed project in ${currentProject.location} - After renovation by Maia Construction`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 right-4 px-4 py-2 bg-green-500 text-white rounded-full text-sm font-bold">
                  AFTER
                </div>
              </div>

              {/* Before Image (Overlay with clip) */}
              <div
                className="absolute inset-0 overflow-hidden"
                style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
              >
                <Image
                  src={currentProject.beforeImage}
                  alt={`${currentProject.title} in ${currentProject.location} - ${
                    currentProject.beforeLabel
                      ? `${currentProject.beforeLabel.toLowerCase()}, work underway`
                      : 'Before renovation, original condition'
                  }`}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4 px-4 py-2 bg-red-500 text-white rounded-full text-sm font-bold">
                  {currentProject.beforeLabel ?? 'BEFORE'}
                </div>
              </div>

              {/* Slider Line */}
              <div
                className="absolute top-0 bottom-0 w-1 bg-white shadow-lg cursor-ew-resize z-10"
                style={{ left: `${sliderPosition}%`, transform: 'translateX(-50%)' }}
              >
                {/* Slider Handle */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center">
                  <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                  </svg>
                </div>
              </div>

              {/* Instructions */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 px-4 py-2 bg-black/50 backdrop-blur-sm text-white rounded-full text-sm">
                Drag to compare
              </div>
            </div>

            {/* Project Info */}
            <div className="mt-6 text-center">
              <h3 className="text-2xl font-bold text-white mb-2">
                {currentProject.title}
              </h3>
              <p className="text-amber-400 font-semibold">
                {currentProject.location} • {currentProject.service}
              </p>
            </div>
          </div>

          {/* Project Thumbnails */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Recent Projects</h3>
            {visible.map((project, index) => (
              <button
                key={project.id}
                onClick={() => {
                  setActiveProject(index);
                  setSliderPosition(50);
                }}
                className={cn(
                  'w-full flex items-center gap-4 p-4 rounded-xl transition-all text-left',
                  activeProject === index
                    ? 'bg-amber-400 text-slate-900'
                    : 'bg-white/10 text-white hover:bg-white/20'
                )}
              >
                <div className="relative w-20 h-16 rounded-lg overflow-hidden flex-shrink-0">
                  <Image
                    src={project.afterImage}
                    alt={`${project.title} thumbnail - ${project.service} project in ${project.location}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-bold">{project.title}</p>
                  <p className={cn(
                    'text-sm',
                    activeProject === index ? 'text-slate-700' : 'text-white/60'
                  )}>
                    {project.location}
                  </p>
                </div>
              </button>
            ))}

            {/* View All Button */}
            <a
              href="/projects"
              className="block w-full mt-6 px-6 py-4 bg-transparent border-2 border-amber-400 text-amber-400 rounded-xl font-bold text-center hover:bg-amber-400 hover:text-slate-900 transition-all"
            >
              View All Projects
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
