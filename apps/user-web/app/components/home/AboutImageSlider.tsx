'use client';

import Image from 'next/image';
import { useCallback, useRef, useState } from 'react';

const SLIDES = [
  { alt: 'Учасники Світанків України 1', src: '/assets/poster-1.jpeg' },
  { alt: 'Подія Світанків України 2', src: '/assets/poster-2.jpeg' },
  { alt: 'Спільнота Світанків України 3', src: '/assets/poster-3.jpeg' },
  { alt: 'Учасники Світанків України 4', src: '/assets/poster-1.jpeg' },
  { alt: 'Спільнота Світанків України 5', src: '/assets/poster-3.jpeg' },
];

const DRAG_THRESHOLD = 24;
const MAX_DRAG_OFFSET = 40;

export function AboutImageSlider() {
  const [activeSlide, setActiveSlide] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const dragStartX = useRef<number | null>(null);
  const dragOffsetRef = useRef(0);

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
    const nextDragOffset = Math.max(
      -MAX_DRAG_OFFSET,
      Math.min(MAX_DRAG_OFFSET, event.clientX - dragStartX.current)
    );
    dragOffsetRef.current = nextDragOffset;
    setDragOffset(nextDragOffset);
  };

  const handlePointerEnd = () => {
    if (dragStartX.current === null) return;

    if (dragOffsetRef.current <= -DRAG_THRESHOLD) moveSlide(1);
    if (dragOffsetRef.current >= DRAG_THRESHOLD) moveSlide(-1);

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

      const absDiff = Math.abs(diff);

      let translateX = 0;
      let scale = 1;
      let zIndex = 50 - absDiff;
      let opacity = 1;
      let grayscale = 0;
      const activeCardDragOffset = absDiff === 0 ? dragOffset : 0;

      if (absDiff === 0) {
        translateX = 0;
        scale = 1;
      } else if (absDiff === 1) {
        translateX = diff > 0 ? 65 : -65;
        scale = 0.85;
        grayscale = 100;
      } else if (absDiff === 2) {
        translateX = diff > 0 ? 110 : -110;
        scale = 0.7;
        opacity = 0;
        grayscale = 100;
      } else {
        translateX = diff > 0 ? 150 : -150;
        scale = 0.5;
        opacity = 0;
        zIndex = 10;
      }

      return {
        wrapper: {
          transform: `translateX(calc(-50% + ${translateX}% + ${activeCardDragOffset}px)) scale(${scale})`,
          zIndex,
          opacity,
          transition:
            isDragging && absDiff === 0 ? 'none' : 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
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
    [activeSlide, dragOffset, isDragging]
  );

  return (
    <section
      aria-label="Фотогалерея Світанків України"
      aria-roledescription="carousel"
      // ЗМІНЕНО: Прибрали pb-12 (величезний відступ знизу) та залишили невеликий pb-2
      className="relative w-full pt-2 pb-2"
    >
      <div
        className={`relative mx-auto h-[300px] w-full touch-pan-y select-none sm:h-[400px] md:h-[450px] ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
        onPointerCancel={handlePointerEnd}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerEnd}
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
        // ЗМІНЕНО: Прибрали `absolute inset-x-0 bottom-0 mt-6`
        // Замість цього просто використовуємо `mt-4` (або `mt-2`, якщо хочете ще ближче)
        className="mt-4 flex justify-center gap-4"
        role="tablist"
      >
        {SLIDES.map((_, index) => (
          <button
            key={index}
            aria-controls={`slide-${index}`}
            aria-label={`Перейти до фото ${index + 1}`}
            aria-selected={index === activeSlide}
            className={`h-3 rounded-full border-2 border-slate-900 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-slate-900 ${
              index === activeSlide ? 'w-8 bg-slate-900' : 'w-3 bg-transparent hover:bg-slate-300'
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
