import Image from 'next/image';

import { CAMPS_COLLAGE_PHOTOS } from './content';

/** Position, size and tilt for each photo, in stacking order (back to front). */
const PHOTO_LAYOUT = [
  'left-0 top-4 z-10 h-36 w-40 -rotate-6 sm:h-44 sm:w-48',
  'right-0 top-0 z-20 h-40 w-44 rotate-6 sm:h-52 sm:w-56',
  'bottom-0 left-4 z-30 h-44 w-52 rotate-2 sm:h-56 sm:w-64',
] as const;

export function CampsPhotoCollage() {
  return (
    <div className="relative h-72 w-full max-w-sm sm:h-96">
      {CAMPS_COLLAGE_PHOTOS.map((photo, index) => (
        <div
          className={`absolute overflow-hidden rounded-2xl border-4 border-white bg-white shadow-lg ${PHOTO_LAYOUT[index]}`}
          key={photo.src}
        >
          <Image alt={photo.alt} className="object-cover" fill sizes="256px" src={photo.src} />
        </div>
      ))}
    </div>
  );
}
