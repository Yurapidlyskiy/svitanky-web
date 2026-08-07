import Image from 'next/image';

type ValueCardProps = {
  icon: { src: string; alt: string };
  title: string;
  description: string;
};

export function ValueCard({ description, icon, title }: ValueCardProps) {
  return (
    <article className="flex flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-400">
        <Image alt={icon.alt} className="size-9 object-contain" height={36} src={icon.src} width={36} />
      </div>
      <h3 className="text-2xl font-black uppercase text-[#004574]">{title}</h3>
      <p className="text-base leading-relaxed text-slate-700">{description}</p>
    </article>
  );
}
