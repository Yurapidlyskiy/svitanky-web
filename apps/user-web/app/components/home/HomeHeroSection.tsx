import Image from 'next/image';
import Link from 'next/link';

export function HomeHeroSection() {
  return (
    <section className="home-hero relative flex overflow-hidden bg-slate-950 text-white">
      <Image
        alt="Хлопчик тримає сонце серед дерев"
        className="object-cover object-[center_42%] scale-[1.85] translate-x-[20%] translate-y-[20%]"
        fill
        priority
        sizes="100vw"
        src="/assets/images/mainHeader.jpg"
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-r from-black/65 via-black/25 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-[18%] bg-linear-to-t from-white via-white/80 to-white/0 backdrop-blur-[2px]" />

      <div className="relative z-10 flex w-full flex-1 items-center px-5 py-12 sm:px-8 lg:px-12 xl:px-[12vw]">
        <div className="flex max-w-2xl flex-col gap-6 sm:gap-8">
          <h1 className="font-heading text-4xl font-black leading-tight sm:text-5xl lg:text-6xl xl:text-7xl">
            Світанки <br /> запалюєш ти
          </h1>
          <p className="max-w-xl text-lg font-medium leading-relaxed text-white sm:text-xl">
            Разом ми даруємо дітям зі Сходу світло, віру та майбутнє.
          </p>
          <div className="flex flex-wrap gap-4">
            <Link
              className="rounded-full bg-amber-400 px-7 py-3 font-bold text-white transition-colors hover:bg-amber-300 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-200"
              href="/support"
            >
              Підтримати &gt;
            </Link>
            <Link
              className="rounded-full bg-sky-200 px-7 py-3 font-bold text-sky-900 transition-colors hover:bg-sky-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-sky-100"
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
