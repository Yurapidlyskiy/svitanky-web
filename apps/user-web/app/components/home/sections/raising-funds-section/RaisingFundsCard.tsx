import Image from 'next/image';

type RaisingFundsCardProps = {
  icon: { src: string; alt: string };
  title: string;
  paragraphs: string[];
  question: string;
  answer: string;
};

export function RaisingFundsCard({ answer, icon, paragraphs, question, title }: RaisingFundsCardProps) {
  return (
    <article className="flex h-full flex-col gap-5 rounded-3xl bg-white p-8 shadow-sm">
      <div className="flex size-16 items-center justify-center rounded-2xl bg-amber-400">
        <Image alt={icon.alt} className="size-9 object-contain" height={36} src={icon.src} width={36} />
      </div>
      <h3 className="text-2xl font-black text-[#004574]">{title}</h3>
      <div className="flex flex-col gap-4 text-base leading-relaxed text-slate-700">
        {paragraphs.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className="mt-auto flex flex-col gap-3 border-t border-slate-100 pt-5">
        <div className="rounded-2xl bg-[#F4F7FC] p-5">
          <p className="flex items-center gap-2.5 text-lg font-black text-[#004574]">
            <span aria-hidden="true" className="size-2.5 shrink-0 rounded-full bg-sky-300" />
            {question}
          </p>
          <p className="mt-2 text-base text-slate-700">{answer}</p>
        </div>
      </div>
    </article>
  );
}
