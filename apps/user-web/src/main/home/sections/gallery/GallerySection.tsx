'use client';

import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

import { Section } from '@/shared/ui';

import { GALLERY_SLIDES } from './content';
import { GalleryArrowButton } from './GalleryArrowButton';

const DRAG_TRIGGER_RATIO = 0.15;

export function GallerySection() {
  const t = useTranslations('home.gallery');
  const tCarousel = useTranslations('common.carousel');
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);

  const moveSlide = useCallback((direction: 1 | -1) => {
    setActiveSlide(
      (current) => (current + direction + GALLERY_SLIDES.length) % GALLERY_SLIDES.length
    );
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartX.current = event.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const nextOffset = event.clientX - dragStartX.current;
    dragOffsetRef.current = nextOffset;
    setDragOffset(nextOffset);
  };

  const handlePointerEnd = () => {
    if (dragStartX.current === null) return;
    const width = containerRef.current?.clientWidth || 1;
    const dragProgress = dragOffsetRef.current / width;

    if (dragProgress <= -DRAG_TRIGGER_RATIO) moveSlide(1);
    if (dragProgress >= DRAG_TRIGGER_RATIO) moveSlide(-1);

    dragStartX.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  const width = containerRef.current?.clientWidth || 1;
  const dragPercent = (dragOffset / width) * 100;

  return (
    <Section
      aria-label={t('label')}
      aria-roledescription="carousel"
      className="flex flex-col"
      width="wide"
    >
      <div
        className={`relative w-full touch-pan-y select-none overflow-hidden rounded-[32px] shadow-sm ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        ref={containerRef}
        style={{ touchAction: 'pan-y' }}
      >
        <div
          className="flex aspect-[16/9] w-full sm:aspect-[16/7]"
          style={{
            transform: `translateX(calc(${-activeSlide * 100}% + ${dragPercent}%))`,
            transition: isDragging ? 'none' : 'transform 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          }}
        >
          {GALLERY_SLIDES.map((slide, index) => (
            <div
              aria-hidden={index !== activeSlide}
              aria-label={tCarousel('slide', { index: index + 1, total: GALLERY_SLIDES.length })}
              aria-roledescription="slide"
              className="relative h-full w-full shrink-0"
              key={slide.id}
              role="group"
            >
              <Image
                alt={t(`slides.${slide.id}`)}
                className="pointer-events-none object-cover"
                fill
                priority={index === 0}
                sizes="100vw"
                src={slide.src}
              />
            </div>
          ))}
        </div>

        <GalleryArrowButton
          direction="prev"
          label={tCarousel('prev')}
          onClick={() => moveSlide(-1)}
        />
        <GalleryArrowButton
          direction="next"
          label={tCarousel('next')}
          onClick={() => moveSlide(1)}
        />
      </div>

      <div
        aria-label={tCarousel('switcher')}
        className="mt-6 flex justify-center gap-3"
        role="tablist"
      >
        {GALLERY_SLIDES.map((_, index) => (
          <button
            key={index}
            aria-label={tCarousel('goTo', { index: index + 1 })}
            aria-selected={index === activeSlide}
            className={`rounded-full transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-brand-navy ${
              index === activeSlide
                ? 'h-3.5 w-3.5 bg-amber-400'
                : 'h-2.5 w-2.5 bg-sky-200 hover:bg-sky-300'
            }`}
            onClick={() => setActiveSlide(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </Section>
  );
}
