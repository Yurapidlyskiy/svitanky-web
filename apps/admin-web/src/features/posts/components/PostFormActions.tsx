import { Button, buttonVariants } from '@project/common-ui';
import Link from 'next/link';

type Props = {
  cancelHref: string;
  isEditing: boolean;
  isPending: boolean;
};

function submitLabel(isEditing: boolean, isPending: boolean) {
  if (isEditing) return isPending ? 'Зберігаємо…' : 'Зберегти зміни';
  return isPending ? 'Публікуємо…' : 'Опублікувати';
}

export function PostFormActions({ cancelHref, isEditing, isPending }: Props) {
  return (
    <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
      <Link
        href={cancelHref}
        className={buttonVariants({ variant: 'outline', className: 'h-10 px-4' })}
      >
        Скасувати
      </Link>
      <Button
        type="submit"
        disabled={isPending}
        aria-busy={isPending}
        className="h-10 px-5 font-semibold"
      >
        {submitLabel(isEditing, isPending)}
      </Button>
    </div>
  );
}
