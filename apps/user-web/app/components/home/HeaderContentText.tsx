import Image from 'next/image';
import Link from 'next/link';

export function HeaderContentText() {
  return (
    <section className="home-hero relative flex items-center overflow-hidden bg-[#FFFDF8]">
      <Image
        alt="Хлопчик тримає паперове сонце на тлі гір"
        className="object-cover object-[70%_38%]"
        fill
        priority
        sizes="100vw"
        src="/assets/header_background.png"
      />
      <div className="pointer-events-none absolute inset-0 bg-[#FFFDF8]/45" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/4 bg-linear-to-t from-[#FFFDF8] to-transparent" />

      <div className="relative z-10 w-full px-5 py-20 sm:px-8 lg:px-12 xl:px-[100px]">
        <div className="flex max-w-xl flex-col gap-6 font-display sm:gap-7">
          <h1 className="relative text-4xl font-black leading-tight text-sky-950 sm:text-5xl lg:text-6xl">
            <div
              aria-hidden="true"
              className="absolute -left-2 -top-11 h-12 w-20 sm:-left-4 sm:-top-14 sm:h-14 sm:w-24"
            >
              <div className="absolute bottom-0 left-0 h-1.5 w-4 origin-left -rotate-[70deg] rounded-full bg-[#FFC107] sm:h-2 sm:w-5" />
              <div className="absolute bottom-1 left-4 h-1.5 w-5 origin-left -rotate-[65deg] rounded-full bg-[#FFC107] sm:h-2 sm:w-6" />
              <div className="absolute bottom-2 left-8 h-2 w-6 origin-left -rotate-[60deg] rounded-full bg-[#FFC107] sm:h-2.5 sm:w-7" />
              <div className="absolute bottom-3 left-12 h-2 w-7 origin-left -rotate-[55deg] rounded-full bg-[#FFC107] sm:h-2.5 sm:w-8" />
            </div>
            Світанки <br />
            запалюєш{' '}
            <span className="relative inline-block">
              ти
              <svg
                aria-hidden="true"
                className="absolute inset-x-0 -bottom-1 -z-10 h-3 w-full text-[#FFC107]"
                fill="none"
                preserveAspectRatio="none"
                viewBox="0 0 100 12"
              >
                <path d="M2 8 Q50 2 98 7" stroke="currentColor" strokeLinecap="round" strokeWidth="6" />
              </svg>
            </span>
          </h1>
          <p className="max-w-md text-lg font-bold leading-relaxed text-sky-900 sm:text-xl">
            Разом ми даруємо дітям зі Сходу світло, віру та майбутнє{' '}
            <svg
              aria-hidden="true"
              className="inline-block h-7 w-7 -rotate-6 align-[-8px] sm:h-8 sm:w-8"
              fill="none"
              viewBox="0 0 28 26"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M14 24.5C14 24.5 2 16.8 2 8.9C2 4.7 5.3 2 8.6 2.4C11.2 2.7 13.2 5.1 14 7.2C14.8 5.1 16.9 2.6 19.6 2.4C22.9 2.1 26 4.7 26 8.9C26 16.8 14 24.5 14 24.5Z"
                stroke="#FFC107"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              />
            </svg>
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-amber-400 px-7 py-3 font-bold text-white transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              href="/support"
            >
              Підтримати &gt;
            </Link>
            <Link
              className="rounded-full bg-[#E7EEFC] px-7 py-3 font-bold text-sky-950 transition-colors hover:bg-[#D9E4F8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-200"
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
