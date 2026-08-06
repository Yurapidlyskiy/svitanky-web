import { AboutImageSlider } from './AboutImageSlider';

export function HomeAboutSection() {
  return (
    <section className="bg-[#FFFDF8] px-5 pb-20 sm:px-8 lg:px-12 lg:pb-28 xl:px-[12vw]">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-20">
        <div className="max-w-xl">
          <h2 className="font-heading text-4xl font-black uppercase text-sky-800 sm:text-5xl">
            Про нас
          </h2>
          <div className="mt-7 space-y-7 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
            <p>
              «Світанки України» — це християнська спільнота, яка об&apos;єднує дітей та молодь зі Східної України,
              створюючи для них простір дружби, розвитку та духовного оновлення.
            </p>
            <p>
              Уявіть собі прифронтове село, війна поруч, люди живуть між страхом і надією. І раптом серед цього
              з&apos;являється простір, де чути дитячий сміх, де світло перемагає темряву, а маленькі серця вчаться
              вірити у майбутнє. Так народилися «Світанки України» — спільнота, яка з першого дня стала викликом
              безнадії і доказом того, що навіть у найтемнішу ніч обов&apos;язково приходить ранок.
            </p>
          </div>
        </div>
        <AboutImageSlider />
      </div>
    </section>
  );
}
