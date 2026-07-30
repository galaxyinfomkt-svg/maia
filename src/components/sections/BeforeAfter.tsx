'use client';

import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { allProjectPairs, featuredProjectPairs } from '@/lib/projects';

// Pairs come from src/lib/projects.ts so the slider, the /projects grid and the
// per-project pages can never drift apart. Outside /projects only the featured
// ones show — the full list turns the rail into an endless scroll.

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
  const visible = showAll || featuredProjectPairs.length === 0 ? allProjectPairs : featuredProjectPairs;
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
                  src={currentProject.after}
                  alt={`${currentProject.project.title} completed project in ${currentProject.project.location} - After renovation by Maia Construction`}
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
                  src={currentProject.before}
                  alt={`${currentProject.project.title} in ${currentProject.project.location} - ${
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
                {currentProject.project.title}
              </h3>
              <p className="text-amber-400 font-semibold">
                {currentProject.project.location} • {currentProject.project.service}
              </p>
              {currentProject.caption && (
                <p className="mt-3 text-white/70 max-w-2xl mx-auto">{currentProject.caption}</p>
              )}
              {currentProject.project.slug && (
                <a
                  href={`/projects/${currentProject.project.slug}`}
                  className="inline-block mt-4 text-amber-400 font-bold hover:text-amber-300 transition-colors"
                >
                  See the full project &rarr;
                </a>
              )}
            </div>
          </div>

          {/* Project Thumbnails */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white mb-4">Recent Projects</h3>
            {visible.map((project, index) => (
              <button
                key={project.key}
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
                    src={project.after}
                    alt={`${project.project.title} thumbnail - ${project.project.service} project in ${project.project.location}`}
                    fill
                    sizes="80px"
                    className="object-cover"
                    loading="lazy"
                  />
                </div>
                <div>
                  <p className="font-bold">{project.project.title}</p>
                  <p className={cn(
                    'text-sm',
                    activeProject === index ? 'text-slate-700' : 'text-white/60'
                  )}>
                    {project.project.location}
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
