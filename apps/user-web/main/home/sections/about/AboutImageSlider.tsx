'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const SLIDES = [
  { alt: 'Учасники Світанків України 1', src: '/assets/images/shared/poster-1.jpeg' },
  { alt: 'Подія Світанків України 2', src: '/assets/images/shared/poster-2.jpeg' },
  { alt: 'Спільнота Світанків України 3', src: '/assets/images/shared/poster-3.jpeg' },
  { alt: 'Учасники Світанків України 4', src: '/assets/images/shared/poster-1.jpeg' },
  { alt: 'Спільнота Світанків України 5', src: '/assets/images/shared/poster-3.jpeg' },
];

const POSITION_TIERS = [
  { translateX: 0, scale: 1, opacity: 1, grayscale: 0 },
  { translateX: 65, scale: 0.85, opacity: 1, grayscale: 100 },
  { translateX: 110, scale: 0.7, opacity: 0, grayscale: 100 },
  { translateX: 150, scale: 0.5, opacity: 0, grayscale: 100 },
];
const MAX_ABS_DIFF = POSITION_TIERS.length - 1;

const DRAG_TRIGGER_RATIO = 0.18;
const DEFAULT_SLIDE_UNIT = 260;

export function AboutImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragStartX = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);

  const getSlideUnit = useCallback(() => {
    const width = containerRef.current?.clientWidth;
    return width ? width * 0.55 : DEFAULT_SLIDE_UNIT;
  }, []);

  const moveSlide = useCallback((direction: 1 | -1) => {
    setActiveSlide((current) => (current + direction + SLIDES.length) % SLIDES.length);
  }, []);

  const handlePointerDown = (event: React.PointerEvent<HTMLDivElement>) => {
    event.currentTarget.setPointerCapture(event.pointerId);
    dragStartX.current = event.clientX;
    setIsDragging(true);
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLDivElement>) => {
    if (dragStartX.current === null) return;
    const maxOffset = getSlideUnit() * (MAX_ABS_DIFF - 0.5);
    const nextDragOffset = Math.max(
      -maxOffset,
      Math.min(maxOffset, event.clientX - dragStartX.current)
    );
    dragOffsetRef.current = nextDragOffset;
    setDragOffset(nextDragOffset);
  };

  const handlePointerEnd = () => {
    if (dragStartX.current === null) return;

    const dragProgress = dragOffsetRef.current / getSlideUnit();

    if (dragProgress <= -DRAG_TRIGGER_RATIO) moveSlide(1);
    if (dragProgress >= DRAG_TRIGGER_RATIO) moveSlide(-1);

    dragStartX.current = null;
    dragOffsetRef.current = 0;
    setDragOffset(0);
    setIsDragging(false);
  };

  const getSlideStyles = useCallback(
    (index: number) => {
      let diff = index - activeSlide;
      const half = Math.floor(SLIDES.length / 2);

      if (diff > half) diff -= SLIDES.length;
      if (diff < -half) diff += SLIDES.length;

      const effectiveDiff = diff + dragOffset / getSlideUnit();
      const absDiff = Math.min(Math.abs(effectiveDiff), MAX_ABS_DIFF);
      const direction = effectiveDiff >= 0 ? 1 : -1;

      const lowerIndex = Math.floor(absDiff);
      const upperIndex = Math.min(lowerIndex + 1, POSITION_TIERS.length - 1);
      const progress = absDiff - lowerIndex;
      const lower = POSITION_TIERS[lowerIndex]!;
      const upper = POSITION_TIERS[upperIndex]!;

      const translateX =
        direction * (lower.translateX + (upper.translateX - lower.translateX) * progress);
      const scale = lower.scale + (upper.scale - lower.scale) * progress;
      const opacity = lower.opacity + (upper.opacity - lower.opacity) * progress;
      const grayscale = lower.grayscale + (upper.grayscale - lower.grayscale) * progress;
      const zIndex = Math.round(30 - absDiff * 10);

      return {
        wrapper: {
          transform: `translateX(calc(-50% + ${translateX}%)) scale(${scale})`,
          zIndex,
          opacity,
          transition: isDragging ? 'none' : 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
        },
        inner: {
          filter: `grayscale(${grayscale}%)`,
          transition: 'filter 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
          isolation: 'isolate' as const,
          clipPath: 'inset(0 round 32px)',
          WebkitClipPath: 'inset(0 round 32px)',
        },
      };
    },
    [activeSlide, dragOffset, isDragging, getSlideUnit]
  );

  return (
    <section
      aria-label="Фотогалерея Світанків України"
      aria-roledescription="carousel"
      className="relative flex w-full flex-col pt-2 pb-2"
    >
      <div
        className={`relative mx-auto h-[300px] w-full touch-pan-y select-none sm:h-[400px] md:h-[450px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
        ref={containerRef}
        style={{ touchAction: 'pan-y' }}
      >
        <div className="absolute inset-0 h-full w-full">
          {SLIDES.map((slide, index) => {
            const styles = getSlideStyles(index);

            return (
              <div
                key={index}
                aria-hidden={index !== activeSlide}
                aria-label={`Слайд ${index + 1} з ${SLIDES.length}`}
                aria-roledescription="slide"
                className="absolute left-1/2 top-1/2 aspect-[4/5] w-[180px] -translate-y-1/2 cursor-pointer overflow-hidden rounded-[32px] sm:w-[240px] md:w-[300px]"
                onClick={() => setActiveSlide(index)}
                role="group"
                style={styles.wrapper}
              >
                <div
                  className="relative h-full w-full overflow-hidden rounded-[32px]"
                  style={styles.inner}
                >
                  <Image
                    alt={slide.alt}
                    className="pointer-events-none object-cover"
                    fill
                    priority
                    sizes="(max-width: 640px) 180px, (max-width: 768px) 240px, 300px"
                    src={slide.src}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div
        aria-label="Перемикач слайдів"
        className="mt-0 sm:-mt-2 md:-mt-4 flex justify-center gap-4 relative z-10"
        role="tablist"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            aria-controls={`slide-${index}`}
            aria-label={`Перейти до фото ${index + 1}`}
            aria-selected={index === activeSlide}

            className={`h-3 rounded-full border-2 border-[#004574] transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[#004574] ${
              index === activeSlide
                ? 'w-8 bg-[#004574]'
                : 'w-3 bg-transparent hover:bg-[#004574]/20'
            }`}

            onClick={() => setActiveSlide(index)}
            role="tab"
            type="button"
          />
        ))}
      </div>
    </section>
  );
}
