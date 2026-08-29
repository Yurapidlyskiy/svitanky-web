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
      <h2 className="text-base font-black uppercase tracking-wide text-[#F6C86E]">{title}</h2>
      <ul className="mt-6 flex flex-col">
        {links.map((link) => (
          <li key={link.href}>
            <Link
              className={`block border-b border-white/30 py-3 text-sm leading-snug text-white transition-colors hover:border-[#F6C86E] hover:text-[#F6C86E] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#F6C86E] ${
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
