import Image from 'next/image';
import Link from 'next/link';

export function HeroSection() {
  return (
    <section className="home-hero relative flex flex-col items-center justify-center overflow-hidden bg-[#FFFDF8]">
      <Image
        alt="img"
        className="object-cover object-[70%_38%]"
        fill
        priority
        sizes="100vw"
        src="/assets/images/home/hero/header_background.png"
      />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#FFFDF8] to-transparent" />

      <div className="relative z-10 w-full px-5 py-20 sm:px-8 lg:px-12 xl:px-[100px] top-[-30px] left-[60px]">
        <div className="origin-left flex w-full max-w-[600px] flex-col gap-6 lg:min-h-[300px] lg:scale-110 sm:gap-7">
          <h1 className="hero-title origin-left -rotate-[3deg] text-left text-[clamp(3rem,5vw,4.5rem)] leading-[0.95] text-[#004574]">
            <span className="relative block pl-[0.55em]">
              <svg
                aria-hidden="true"
                className="pointer-events-none absolute -left-[0.45em] top-1/2 h-[1.25em] w-[1.2em] -translate-y-[70%] text-[#F9AF22]"
                fill="none"
                viewBox="0 0 170 220"
              >
                <path
                  d="M13 109L101 116"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="18"
                />
                <path
                  d="M32 191L107 147"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="18"
                />
                <path
                  d="M43 14L111 86"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="18"
                />
                <path
                  d="M132 12L148 57"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeWidth="18"
                />
              </svg>
              Світанки
            </span>

            <span className="block">
              запалюєш{' '}
              <span className="relative inline-block">
                ти
                <svg
                  aria-hidden="true"
                  className="absolute inset-x-0 -bottom-[0.12em] -z-10 h-[0.19em] w-full text-[#F9AF22]"
                  fill="none"
                  preserveAspectRatio="none"
                  viewBox="0 0 100 12"
                >
                  <path
                    d="M2 8 Q50 2 98 7"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeWidth="7"
                  />
                </svg>
              </span>
            </span>
          </h1>

          <p className="max-w-md text-lg font-medium leading-[1.1] text-sky-900 sm:text-xl">
            Разом ми даруємо дітям зі Сходу світло,
            <br /> віру та майбутнє{' '}
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

          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-amber-400 px-7 py-3 font-bold text-white shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-amber-500 hover:shadow-md hover:shadow-amber-400/30 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              href="/support"
            >
              Підтримати &gt;
            </Link>
            <Link
              className="rounded-full bg-[#E7EEFC] px-7 py-3 font-bold text-sky-950 shadow-sm transition-[background-color,box-shadow,transform] duration-200 ease-out hover:scale-105 hover:bg-[#D9E4F8] hover:shadow-md hover:shadow-sky-300/40 active:scale-95 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
              href="/about"
            >
              Дізнатися більше &gt;
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
