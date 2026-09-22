import Image from 'next/image';

import { LOCATION_PLACE } from './content';

export function LocationMapCard() {
  return (
    <div className="rounded-3xl bg-[#fefdf9] p-4 shadow-[0_12px_40px_-12px_rgba(0,69,116,0.18)] sm:p-8">
      <div className="relative">
        <Image
          alt={`Карта України з позначеним містом ${LOCATION_PLACE.city}`}
          className="h-auto w-full"
          height={1664}
          sizes="(min-width: 1024px) 45vw, 100vw"
          src="/assets/images/home/location/verh.png"
          width={2588}
        />

        <div
          aria-label={`${LOCATION_PLACE.city} на карті`}
          className="absolute left-[61%] top-[51%]"
          role="img"
        >
          <span className="map-marker-pulse absolute -inset-3 rounded-full bg-amber-400/45" />
          <span className="relative block size-5 rounded-full border-4 border-amber-300 bg-orange-400 shadow-sm" />
        </div>
      </div>
    </div>
  );
}
