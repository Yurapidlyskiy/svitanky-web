import type { ReactNode } from 'react';

import { AdminNav } from './AdminNav';

type Props = {
  email: string;
  actions?: ReactNode;
};

export function AdminHeader({ email, actions }: Props) {
  return (
    <header className="border-b-4 border-brand-amber bg-brand-navy text-canvas">
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-3 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
          <p className="flex items-center gap-2 font-semibold tracking-tight">
            <span aria-hidden className="size-3 rounded-full bg-brand-amber" />
            Дім Світанків
          </p>
          <AdminNav />
        </div>
        <div className="flex items-center gap-3 text-sm">
          <span className="hidden truncate text-brand-sky sm:inline">{email}</span>
          {actions}
        </div>
      </div>
    </header>
  );
}
