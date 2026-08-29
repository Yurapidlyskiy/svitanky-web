import { PERSONAL_DATA_LAW_URL } from '@/shared/config/support';

export function ConsentCheckbox() {
  return (
    <label className="group flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-slate-700">
      <div className="relative mt-0.5 flex size-5 shrink-0 items-center justify-center">
        <input className="peer sr-only" name="consent" required type="checkbox" />
        <div className="absolute inset-0 rounded border border-brand-sky-pale bg-white peer-checked:border-amber-400 peer-checked:bg-amber-400 peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-navy"></div>
        <svg
          className="relative z-10 hidden size-3.5 text-white peer-checked:block"
          fill="none"
          stroke="currentColor"
          strokeWidth="3.5"
          viewBox="0 0 24 24"
        >
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
      <span>
        Погоджуюсь на обробку персональних даних, відповідно до{' '}
        <a
          className="font-bold text-brand-navy underline decoration-brand-sky underline-offset-2 hover:decoration-brand-navy"
          href={PERSONAL_DATA_LAW_URL}
          onClick={(event) => event.stopPropagation()}
          rel="noopener noreferrer"
          target="_blank"
        >
          Закону України «Про захист персональних даних» (№ 2297-VI)
        </a>
      </span>
    </label>
  );
}
