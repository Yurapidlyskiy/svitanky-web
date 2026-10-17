import { useTranslations } from 'next-intl';

import { Link } from '@/shared/i18n/navigation';

import { buildProjectsHref, PROJECT_FILTERS } from './lib';
import type { ProjectFilter } from './types';

type ProjectStatusFilterProps = {
  activeFilter: ProjectFilter;
};

export function ProjectStatusFilter({ activeFilter }: ProjectStatusFilterProps) {
  const t = useTranslations('news.projectsHighlight');

  return (
    <nav
      aria-label={t('filtersLabel')}
      className="-mx-5 -my-2 overflow-x-auto px-5 py-2 sm:mx-0 sm:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
    >
      <ul className="flex w-max items-center gap-1 rounded-full bg-white p-1.5 shadow-sm">
        {PROJECT_FILTERS.map((filter) => {
          const isActive = filter === activeFilter;

          return (
            <li key={filter}>
              <Link
                aria-current={isActive ? 'page' : undefined}
                className={`inline-flex items-center rounded-full px-4 py-2 text-sm font-bold whitespace-nowrap transition-colors duration-200 ease-out focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-navy ${
                  isActive ? 'bg-brand-navy text-white' : 'text-brand-navy hover:bg-brand-sky-mist'
                }`}
                href={buildProjectsHref(filter)}
                scroll={false}
              >
                {t(`filters.${filter}`)}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
