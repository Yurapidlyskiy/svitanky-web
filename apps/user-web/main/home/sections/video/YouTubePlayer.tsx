'use client';

import Image from 'next/image';
import { useState } from 'react';

type YouTubePlayerProps = {
  videoId: string;
  title: string;
};

export function YouTubePlayer({ title, videoId }: YouTubePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    return (
      <div className="relative w-full overflow-hidden rounded-3xl bg-black aspect-video">
        <iframe
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1&playsinline=1`}
          title={title}
        />
      </div>
    );
  }

  return (
    <button
      aria-label={`Відтворити відео: ${title}`}
      className="group relative block w-full aspect-video focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-400"
      onClick={() => setIsPlaying(true)}
      type="button"
    >
      <div className="absolute inset-0 overflow-hidden rounded-3xl bg-gray-200">
        <Image
          alt={title}
          className="object-cover"
          fill
          sizes="(min-width: 1024px) 80vw, 100vw"
          src={`https://i.ytimg.com/vi/${videoId}/maxresdefault.jpg`}
        />
      </div>
      <span className="absolute -bottom-5 -right-5 flex size-[72px] sm:-bottom-7 sm:-right-7 sm:size-[90px] items-center justify-center">
        <span
          className="absolute inset-0 hidden rounded-full border-2 border-[#004574] bg-transparent group-hover:block group-hover:animate-ping"
          style={{
            animationDuration: '2s',
            animationTimingFunction: 'cubic-bezier(0, 0.2, 0.8, 1)',
          }}
        />
        <span
          className="absolute inset-0 hidden rounded-full border-2 border-[#004574] bg-transparent group-hover:block group-hover:animate-ping"
          style={{
            animationDuration: '2s',
            animationDelay: '1s',
            animationTimingFunction: 'cubic-bezier(0, 0.2, 0.8, 1)',
          }}
        />

        <span className="relative flex h-full w-full items-center justify-center rounded-full bg-[#004574] shadow-lg transition-transform duration-200 ease-out group-hover:scale-105 group-active:scale-90">
          <span className="flex size-16 sm:size-[82px] items-center justify-center rounded-full bg-white">
            <span className="flex size-[52px] sm:size-[68px] items-center justify-center rounded-full bg-amber-400">
              <svg
                aria-hidden="true"
                className="ml-1 size-5 sm:size-7"
                fill="#004574"
                viewBox="0 0 24 24"
              >
                <path d="M8 5v14l11-7Z" />
              </svg>
            </span>
          </span>
        </span>
      </span>
    </button>
  );
}
