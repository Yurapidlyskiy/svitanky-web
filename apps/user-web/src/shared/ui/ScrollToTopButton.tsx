'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

export function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setIsMounted(true), []);
  useEffect(() => {
    let frame = 0;

    function update() {
      frame = 0;
      setIsVisible(window.scrollY > window.innerHeight);
    }

    function onScroll() {
      if (frame) return;
      frame = requestAnimationFrame(update);
    }

    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);

    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [pathname]);

  function scrollToTop() {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    window.scrollTo({ behavior: prefersReducedMotion ? 'auto' : 'smooth', left: 0, top: 0 });
  }

  if (!isMounted) return null;

  return createPortal(
    <button
      aria-hidden={!isVisible}
      aria-label="Нагору"
      className={`fixed bottom-6 right-5 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full border-2 border-amber-400 bg-canvas text-amber-400 shadow-md transition-[opacity,transform,background-color,color] duration-300 ease-out hover:bg-amber-400 hover:text-white active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 sm:bottom-8 sm:right-8 ${
        isVisible ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
      onClick={scrollToTop}
      tabIndex={isVisible ? undefined : -1}
      type="button"
    >
      <svg
        aria-hidden="true"
        className="size-6"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.5"
        viewBox="0 0 24 24"
      >
        <path d="m6 15 6-6 6 6" />
      </svg>
    </button>,
    document.body
  );
}
