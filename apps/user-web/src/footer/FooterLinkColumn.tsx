import Link from 'next/link';

import type { FooterLink } from './navigation';

type FooterLinkColumnProps = {
  title: string;
  links: FooterLink[];
  uppercaseLinks?: boolean;
};

export function FooterLinkColumn({ links, title, uppercaseLinks = false }: FooterLinkColumnProps) {
  return (
    <nav aria-label={title}>
      <h2 className="text-base font-black uppercase tracking-wide text-brand-amber">{title}</h2>
      <ul className="mt-6 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`block border-b border-white/30 py-3 text-sm leading-snug text-white transition-colors hover:border-brand-amber hover:text-brand-amber focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-amber ${
                uppercaseLinks ? 'uppercase' : ''
              }`}
              href={link.href}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
