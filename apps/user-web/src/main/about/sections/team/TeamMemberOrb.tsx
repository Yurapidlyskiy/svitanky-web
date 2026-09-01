type TeamMemberOrbProps = {
  name: string;
  role: string;
};

function getInitials(name: string) {
  return name
    .split(' ')
    .filter((part) => !part.includes('.'))
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();
}

export function TeamMemberOrb({ name, role }: TeamMemberOrbProps) {
  return (
    <article className="group flex flex-col items-center gap-3 text-center">
      <span className="relative flex size-24 items-center justify-center rounded-full bg-linear-to-br from-brand-amber to-brand-amber-strong text-2xl font-black text-white shadow-sm ring-4 ring-white transition-transform duration-300 ease-out group-hover:scale-105 sm:size-28">
        {getInitials(name)}

        <span
          aria-hidden="true"
          className="absolute inset-0 -z-10 rounded-full bg-brand-amber/40 opacity-0 blur-lg transition-opacity duration-300 ease-out group-hover:opacity-70"
        />
      </span>

      <div>
        <p className="text-sm font-black leading-snug text-brand-navy sm:text-base">{name}</p>
        <p className="mt-1 text-xs leading-snug text-slate-600 sm:text-sm">{role}</p>
      </div>
    </article>
  );
}
