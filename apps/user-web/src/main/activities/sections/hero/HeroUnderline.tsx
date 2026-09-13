export function HeroUnderline({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 100"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      fill="none"
      aria-hidden="true"
      shapeRendering="geometricPrecision"
    >
      <path
        d="M34 62 C125 45 213 31 310 29 C400 27 482 30 563 35"
        stroke="#FFB21A"
        strokeWidth="14"
        strokeLinecap="round"
      />

      <path
        d="M196 80 C278 66 374 60 505 69"
        stroke="#FFB21A"
        strokeWidth="11"
        strokeLinecap="round"
      />
    </svg>
  );
}
