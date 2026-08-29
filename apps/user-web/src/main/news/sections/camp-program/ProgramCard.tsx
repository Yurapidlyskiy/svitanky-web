import type { CampProgramList } from './types';

type ProgramCardProps = {
  list: CampProgramList;
};

export function ProgramCard({ list }: ProgramCardProps) {
  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
      <h3 className="text-lg font-black text-brand-navy sm:text-xl">{list.title}</h3>

      <ul className="mt-5 divide-y divide-slate-100">
        {list.rows.map((row) => (
          <li className="flex gap-4 py-3 text-sm sm:text-base" key={row.label}>
            <span className="w-24 shrink-0 font-bold text-brand-navy sm:w-28">{row.label}</span>
            <span className="text-slate-600">{row.text}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
