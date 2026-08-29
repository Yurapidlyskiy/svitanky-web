type CampFeatureCardProps = {
  description: string;
  title: string;
};

export function CampFeatureCard({ description, title }: CampFeatureCardProps) {
  return (
    <article className="flex flex-col overflow-hidden rounded-3xl bg-white shadow-sm">
      <div className="flex flex-1 flex-col gap-3 p-6">
        <h3 className="text-lg font-black leading-snug text-brand-navy sm:text-xl">{title}</h3>
        <p className="text-sm leading-relaxed text-slate-600">{description}</p>
      </div>

      <div aria-hidden="true" className="h-2 bg-amber-400" />
    </article>
  );
}
