'use client';

import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  youtubeId: string;
}

const videos: Video[] = [
  {
    id: '1',
    title: 'Projeto de Reforma Completa',
    youtubeId: 'Yp0dvERMbVY',
  },
  {
    id: '2',
    title: 'Transformação Exterior',
    youtubeId: 'g4BVzOZGLRo',
  },
];

interface VideoGalleryProps {
  title?: string;
  subtitle?: string;
}

export default function VideoGallery({
  title = 'Our Projects in Action',
  subtitle = 'Watch our team transform homes across Massachusetts',
}: VideoGalleryProps) {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-4">
            {title}
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-amber-400 to-yellow-300 mx-auto mb-6" />
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Video Grid */}
        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {videos.map((video) => (
            <div
              key={video.id}
              className="group relative aspect-video rounded-2xl overflow-hidden shadow-xl bg-slate-900"
            >
              {activeVideo === video.id ? (
                <iframe
                  src={`https://www.youtube.com/embed/${video.youtubeId}?autoplay=1`}
                  title={video.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              ) : (
                <>
                  {/* Thumbnail */}
                  <img
                    src={`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`}
                    alt={video.title}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />

                  {/* Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />

                  {/* Play Button */}
                  <button
                    onClick={() => setActiveVideo(video.id)}
                    className="absolute inset-0 flex items-center justify-center"
                    aria-label={`Play ${video.title}`}
                  >
                    <div className="w-20 h-20 bg-amber-400 rounded-full flex items-center justify-center shadow-2xl transform transition-all duration-300 group-hover:scale-110 group-hover:bg-amber-300">
                      <svg className="w-8 h-8 text-slate-900 ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </button>

                  {/* Title */}
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-xl font-bold text-white">
                      {video.title}
                    </h3>
                    <p className="text-amber-400 text-sm font-semibold mt-1">
                      Click to watch
                    </p>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://www.youtube.com/@maiaconstruction"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center px-8 py-4 bg-red-600 text-white rounded-full font-bold hover:bg-red-700 transition-all"
          >
            <svg className="w-6 h-6 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
            </svg>
            Subscribe to Our Channel
          </a>
        </div>
      </div>
    </section>
  );
}
