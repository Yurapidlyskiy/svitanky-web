import { socialLinks } from '@/shared/config/contacts';

function FacebookIcon() {
  return (
    <svg aria-hidden="true" className="size-9" fill="currentColor" viewBox="0 0 24 24">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.96h-1.5c-1.49 0-1.95.93-1.95 1.87v2.25h3.32l-.53 3.49h-2.79V24C19.61 23.1 24 18.1 24 12.07Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      aria-hidden="true"
      className="size-9"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect height="20" rx="5" width="20" x="2" y="2" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" fill="currentColor" r="1" stroke="none" />
    </svg>
  );
}

export function FooterSocials() {
  return (
    <div>
      <h2 className="text-base font-black uppercase tracking-wide text-[#F6C86E]">Ми в соц. мережах</h2>
      <ul className="mt-6 flex items-center gap-5">
        {socialLinks.map((social) => (
          <li key={social.network}>
            <a
              aria-label={social.label}
              className="block text-white transition-[color,transform] duration-200 ease-out hover:scale-110 hover:text-[#F6C86E] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F6C86E]"
              href={social.href}
              rel="noopener noreferrer"
              target="_blank"
            >
              {social.network === 'facebook' ? <FacebookIcon /> : <InstagramIcon />}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
