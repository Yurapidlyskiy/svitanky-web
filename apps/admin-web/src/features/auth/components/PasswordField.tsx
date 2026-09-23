'use client';

import { Button } from '@project/common-ui';
import { Eye, EyeOff } from 'lucide-react';
import { useState } from 'react';

import { fieldId } from '@/shared/ui/FieldShell';
import { FormField } from '@/shared/ui/FormField';

type Props = {
  name: string;
  label: string;
  errors?: string[];
};

export function PasswordField({ name, label, errors }: Props) {
  const [isVisible, setIsVisible] = useState(false);
  const Icon = isVisible ? EyeOff : Eye;

  return (
    <FormField
      name={name}
      label={label}
      type={isVisible ? 'text' : 'password'}
      autoComplete="current-password"
      autoCapitalize="none"
      autoCorrect="off"
      spellCheck={false}
      required
      errors={errors}
      // Mask bullets inherit the font size; at text-sm they read as a faint "…".
      className={isVisible ? undefined : 'text-xl tracking-[0.15em] md:text-xl'}
      trailing={
        <Button
          type="button"
          variant="ghost"
          size="icon"
          aria-label={isVisible ? 'Приховати пароль' : 'Показати пароль'}
          aria-pressed={isVisible}
          aria-controls={fieldId(name)}
          onClick={() => setIsVisible((visible) => !visible)}
          className="text-brand-slate hover:bg-brand-sky/30 hover:text-brand-navy"
        >
          <Icon aria-hidden className="size-4.5" />
        </Button>
      }
    />
  );
}
