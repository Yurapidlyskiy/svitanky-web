import Image from 'next/image';

type TeamMemberCardProps = {
  name: string;
  role: string;
  photo?: { src: string; alt: string };
};

export function TeamMemberCard({ name, photo, role }: TeamMemberCardProps) {
  return (
    <article className="flex flex-col gap-3">
      <div className="relative aspect-square w-full overflow-hidden rounded-2xl bg-slate-200">
        {photo ? (
          <Image alt={photo.alt} className="object-cover" fill sizes="(min-width: 1024px) 25vw, 50vw" src={photo.src} />
        ) : null}
      </div>
      <div>
        <p className="text-base font-black leading-snug text-brand-navy sm:text-lg">{name}</p>
        <p className="mt-1 text-sm leading-snug text-slate-600">{role}</p>
      </div>
    </article>
  );
}
