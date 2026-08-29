import Image from 'next/image';

type CommunityLifeRowProps = {
  image: { src: string; alt: string };
  text: string;
  reverse?: boolean;
};

export function CommunityLifeRow({ image, reverse = false, text }: CommunityLifeRowProps) {
  return (
    <div
      className={`flex flex-col overflow-hidden rounded-3xl shadow-sm sm:flex-row ${
        reverse ? 'sm:flex-row-reverse' : ''
      }`}
    >
      <div className="relative h-48 w-full sm:h-64 sm:w-1/2 lg:h-72">
        <Image alt={image.alt} className="object-cover" fill sizes="(min-width: 640px) 50vw, 100vw" src={image.src} />
      </div>
      <div
        className={`flex w-full items-center p-8 sm:w-1/2 ${reverse ? 'bg-[#E3ECFA]' : 'bg-sand'}`}
      >
        <p className="text-lg font-black leading-snug text-brand-navy sm:text-xl">{text}</p>
      </div>
    </div>
  );
}
