import { contactDetails } from '@/shared/config/contacts';

const iconClassName = 'mt-0.5 size-6 shrink-0 text-white';

export function FooterContacts() {
  return (
    <div>
      <h2 className="text-base font-black uppercase tracking-wide text-brand-amber">Контактні дані</h2>
      <ul className="mt-6 flex flex-col gap-4 text-sm leading-relaxed text-white">
        <li className="flex items-start gap-3">
          <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
            <path d="M6.6 10.8a15.1 15.1 0 0 0 6.6 6.6l2.2-2.2a1 1 0 0 1 1-.25c1.1.37 2.3.57 3.6.57a1 1 0 0 1 1 1V20a1 1 0 0 1-1 1A17 17 0 0 1 3 4a1 1 0 0 1 1-1h3.5a1 1 0 0 1 1 1c0 1.3.2 2.5.57 3.6a1 1 0 0 1-.25 1l-2.2 2.2Z" />
          </svg>
          <a className="hover:underline" href={contactDetails.phoneHref}>
            {contactDetails.phone}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
            <path d="M20 4H4a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
          </svg>
          <a className="break-all hover:underline" href={`mailto:${contactDetails.email}`}>
            {contactDetails.email}
          </a>
        </li>
        <li className="flex items-start gap-3">
          <svg aria-hidden="true" className={iconClassName} fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
          </svg>
          <span>{contactDetails.address}</span>
        </li>
      </ul>
    </div>
  );
}
