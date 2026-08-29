import { Section, SectionHeading } from '@/shared/ui';

import { AboutImageSlider } from './AboutImageSlider';

export function AboutSection() {
  return (
    <Section className="flex flex-col overflow-x-clip" id="about">
      <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-2 lg:gap-24 xl:-translate-x-16 xl:gap-28">
        <div className="max-w-xl">
          <SectionHeading align="left">Про нас</SectionHeading>
          <div className="mt-7 space-y-7 text-base font-medium leading-relaxed text-slate-800 sm:text-lg">
            <p>
              «Світанки України» — це християнська спільнота, яка об&apos;єднує дітей та молодь зі
              Східної України, створюючи для них простір дружби, розвитку та духовного оновлення.
            </p>
            <p>
              Уявіть собі прифронтове село, війна поруч, люди живуть між страхом і надією. І раптом
              серед цього з&apos;являється простір, де чути дитячий сміх, де світло перемагає
              темряву, а маленькі серця вчаться вірити у майбутнє. Так народилися «Світанки України»
              — спільнота, яка з першого дня стала викликом безнадії і доказом того, що навіть у
              найтемнішу ніч обов&apos;язково приходить ранок.
            </p>
          </div>
        </div>
        <AboutImageSlider />
      </div>
    </Section>
  );
}
