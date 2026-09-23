'use client';

import { Button } from '@project/common-ui';

export default function PanelError({ reset }: { error: Error; reset: () => void }) {
  return (
    <div role="alert" className="mx-auto max-w-md rounded-2xl border bg-white p-8 text-center">
      <p className="font-semibold text-brand-navy">Не вдалося завантажити дані</p>
      <p className="mt-1 text-sm text-brand-slate">Перевірте з&apos;єднання та спробуйте ще раз.</p>
      <Button onClick={reset} className="mt-5 h-10 px-4">
        Спробувати ще раз
      </Button>
    </div>
  );
}
