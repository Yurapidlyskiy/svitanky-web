import { z } from 'zod';

import { POST_CATEGORIES } from './categories';

export const TITLE_MAX = 120;
export const EXCERPT_MAX = 300;

const isRealDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

/** Mirrors the `posts` table constraints, so the DB never has to reject a valid-looking form. */
export const postFieldsSchema = z.object({
  category: z.enum(POST_CATEGORIES, { error: 'Оберіть тип публікації' }),
  title: z
    .string({ error: 'Введіть заголовок' })
    .trim()
    .min(3, { error: 'Заголовок — щонайменше 3 символи' })
    .max(TITLE_MAX, { error: `Заголовок — до ${TITLE_MAX} символів` }),
  excerpt: z
    .string({ error: 'Введіть опис' })
    .trim()
    .min(10, { error: 'Опис — щонайменше 10 символів' })
    .max(EXCERPT_MAX, { error: `Опис — до ${EXCERPT_MAX} символів` }),
  publishedOn: z
    .string({ error: 'Вкажіть дату' })
    .regex(/^\d{4}-\d{2}-\d{2}$/, { error: 'Вкажіть дату' })
    .refine(isRealDate, { error: 'Некоректна дата' })
    .refine((value) => value >= '2000-01-01' && value <= '2100-12-31', {
      error: 'Некоректна дата',
    }),
});

export type PostFields = z.infer<typeof postFieldsSchema>;

export function parsePostFields(formData: FormData) {
  return postFieldsSchema.safeParse({
    category: formData.get('category'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    publishedOn: formData.get('publishedOn'),
  });
}
