'use client';

import { cn } from '@project/common-ui';
import { ImagePlus } from 'lucide-react';
import Image from 'next/image';
import { type DragEvent, useRef, useState } from 'react';

import { FieldShell, fieldErrorId, fieldId } from '@/shared/ui/FieldShell';

import { IMAGE_ACCEPT, validateImageFile } from '../image';

type Props = {
  previewUrl: string | null;
  onChange: (file: File | null) => void;
  errors?: string[];
};

const ID = fieldId('image');

export function ImagePicker({ previewUrl, onChange, errors }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [clientError, setClientError] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const shownErrors = clientError ? [clientError] : errors;

  function accept(file: File | undefined) {
    if (!file) return;
    const error = validateImageFile(file);
    setClientError(error);
    if (error && inputRef.current) inputRef.current.value = '';
    onChange(error ? null : file);
  }

  function handleDrop(event: DragEvent<HTMLLabelElement>) {
    event.preventDefault();
    setIsDragging(false);
    const file = event.dataTransfer.files[0];
    if (!file || !inputRef.current) return;
    // Put the dropped file into the real input, so it is part of the FormData.
    const transfer = new DataTransfer();
    transfer.items.add(file);
    inputRef.current.files = transfer.files;
    accept(file);
  }

  return (
    <FieldShell
      id={ID}
      label="Фото"
      errors={shownErrors}
      aside={<span className="text-xs text-brand-slate">JPG, PNG або WebP, до 5 МБ</span>}
    >
      <div>
        <input
          ref={inputRef}
          id={ID}
          name="image"
          type="file"
          accept={IMAGE_ACCEPT}
          className="peer sr-only"
          aria-invalid={shownErrors?.length ? true : undefined}
          aria-describedby={shownErrors?.length ? fieldErrorId(ID) : undefined}
          onChange={(event) => accept(event.target.files?.[0])}
        />
        <label
          htmlFor={ID}
          onDragOver={(event) => {
            event.preventDefault();
            setIsDragging(true);
          }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={handleDrop}
          className={cn(
            'group relative flex aspect-[16/10] cursor-pointer items-center justify-center overflow-hidden rounded-xl border-2 border-dashed border-input bg-canvas transition-colors peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50 peer-aria-invalid:border-destructive hover:border-brand-navy/50',
            isDragging && 'border-brand-navy bg-brand-sky/20'
          )}
        >
          {previewUrl ? (
            <>
              <Image alt="" src={previewUrl} fill unoptimized className="object-cover" />
              <span className="absolute inset-0 flex items-center justify-center bg-brand-navy/50 text-sm font-semibold text-canvas opacity-0 transition-opacity group-hover:opacity-100">
                Змінити фото
              </span>
            </>
          ) : (
            <span className="flex flex-col items-center gap-2 px-4 text-center text-sm text-brand-slate">
              <ImagePlus aria-hidden className="size-8 text-brand-navy/60" />
              <span>
                <span className="font-semibold text-brand-navy">Оберіть фото</span> або перетягніть
                його сюди
              </span>
            </span>
          )}
        </label>
      </div>
    </FieldShell>
  );
}
