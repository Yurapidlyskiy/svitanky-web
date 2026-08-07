type GalleryArrowButtonProps = {
  direction: 'prev' | 'next';
  label: string;
  onClick: () => void;
};

export function GalleryArrowButton({ direction, label, onClick }: GalleryArrowButtonProps) {
  const isPrev = direction === 'prev';

  return (
    <button
      aria-label={label}
      className={`absolute top-1/2 z-10 -translate-y-1/2 text-amber-400/70 transition-colors duration-200 ease-out hover:text-amber-300 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-amber-300 ${
        isPrev ? 'left-3 sm:left-6' : 'right-3 sm:right-6'
      }`}
      onClick={onClick}
      onPointerDown={(event) => event.stopPropagation()}
      type="button"
    >
      <svg aria-hidden="true" className="h-10 w-8 sm:h-14 sm:w-11" viewBox="0 0 44 60">
        <path
          d={isPrev ? 'M36 6 6 30 36 54Z' : 'M8 6 38 30 8 54Z'}
          fill="currentColor"
          stroke="currentColor"
          strokeLinejoin="round"
          strokeWidth="10"
        />
      </svg>
    </button>
  );
}
