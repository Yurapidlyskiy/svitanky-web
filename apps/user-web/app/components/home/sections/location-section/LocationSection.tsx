import Image from 'next/image';

export function LocationSection() {
  return (
    <section className="flex flex-col bg-[#FFFDF8]">
      <p className="mx-auto mb-10 text-center text-sm font-bold uppercase tracking-[0.18em] text-amber-500">
        Звідси починається наша справа
      </p>
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[3fr_2fr] lg:gap-16">
        <div className="relative">
          <Image
            alt="Карта України з позначеним Верхньодніпровськом"
            className="h-auto w-full"
            height={1664}
            sizes="(min-width: 1024px) 60vw, 100vw"
            src="/assets/images/home/location/map.png"
            width={2588}
          />
          <div aria-label="Верхньодніпровськ на карті" className="absolute left-[61%] top-[51%]" role="img">
            <span className="map-marker-pulse absolute -inset-3 rounded-full bg-amber-400/45" />
            <span className="relative block size-5 rounded-full border-4 border-amber-300 bg-orange-400 shadow-sm" />
          </div>
        </div>
        <div className="max-w-md">
          <h2 className="font-heading text-3xl font-black uppercase text-sky-800 sm:text-4xl">Верхньодніпровськ</h2>
          <div className="mt-7 space-y-5 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
            <p>
              Саме тут народилася спільнота «Світанки України» — місце, де діти та молодь знаходять підтримку,
              дружбу й простір для зростання.
            </p>
            <p>
              Із Верхньодніпровська починається наша щоденна справа: бути поруч, дарувати світло й допомагати
              знаходити надію навіть у складні часи.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
