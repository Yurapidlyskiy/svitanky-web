type HeroSubtitleProps = {
  className?: string;
};

export function HeroSubtitle({ className = '' }: HeroSubtitleProps) {
  return (
    <p className={className}>
      Разом ми даруємо дітям зі Сходу світло,
      <br className="hidden lg:inline" /> віру та майбутнє{' '}
      <svg
        aria-hidden="true"
        className="relative top-2 ml-1 inline-block h-8 w-9 -rotate-6 sm:top-3 sm:h-9 sm:w-10"
        fill="none"
        viewBox="0 0 72 64"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M35.2 57.8C30.2 51.7 10.5 37.4 8.3 21.6C6.9 11.5 12.1 5.7 20.2 5.3C27.8 4.9 32.5 10.5 35.1 17.3C38.3 9.9 44.2 4.1 52.1 5.5C60.4 7 64.5 13.3 62.8 23.4C60.3 38.3 41 53.6 35.2 57.8Z"
          stroke="#FFC107"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="10"
        />
      </svg>
    </p>
  );
}
