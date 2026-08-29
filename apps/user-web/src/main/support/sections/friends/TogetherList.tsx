import { TOGETHER_HEADING, TOGETHER_PARAGRAPHS, TOGETHER_POINTS } from './content';

export function TogetherList() {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="font-heading text-3xl font-black uppercase leading-tight text-brand-navy sm:text-4xl">
        {TOGETHER_HEADING}
      </h2>

      <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-700">
        {TOGETHER_PARAGRAPHS.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>

      <div>
        <p className="text-base font-black text-brand-navy">Разом ми:</p>
        <ul className="mt-3 list-disc space-y-2 pl-5 marker:text-brand-navy">
          {TOGETHER_POINTS.map((point) => (
            <li className="font-semibold text-brand-navy" key={point}>
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
