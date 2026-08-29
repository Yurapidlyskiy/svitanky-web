'use client';

import { useId, useState } from 'react';

type FaqAccordionItemProps = {
  answer: string;
  question: string;
};

export function FaqAccordionItem({ answer, question }: FaqAccordionItemProps) {
  const [isOpen, setIsOpen] = useState(false);
  const panelId = useId();

  return (
    <div className="rounded-3xl bg-white shadow-sm">
      <h3>
        <button
          aria-controls={panelId}
          aria-expanded={isOpen}
          className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-300"
          onClick={() => setIsOpen((open) => !open)}
          type="button"
        >
          <span className="text-base font-bold text-brand-navy sm:text-lg">{question}</span>
          <span
            aria-hidden="true"
            className={`flex size-6 shrink-0 items-center justify-center text-brand-navy transition-transform duration-200 ease-out ${
              isOpen ? 'rotate-45' : ''
            }`}
          >
            <svg
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeWidth="2.5"
              viewBox="0 0 24 24"
            >
              <path d="M12 5v14" />
              <path d="M5 12h14" />
            </svg>
          </span>
        </button>
      </h3>

      <div hidden={!isOpen} id={panelId}>
        <p className="px-6 pb-5 text-sm leading-relaxed text-slate-600 sm:text-base">{answer}</p>
      </div>
    </div>
  );
}
