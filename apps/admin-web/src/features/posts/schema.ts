import { z } from 'zod';

import { ARTICLE_CATEGORIES, PROJECT_CATEGORY, PROJECT_STATUSES } from './categories';

export const TITLE_MAX = 120;
export const EXCERPT_MAX = 300;
/** Mirrors the `goal_amount` and `raised_amount` check constraints. */
export const AMOUNT_MAX = 1_000_000_000;

const isRealDate = (value: string) => {
  const date = new Date(`${value}T00:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().startsWith(value);
};

/** Whole hryvnias from a text input. Spaces are allowed: `1 200 000`. */
const amount = (label: string, min: number) =>
  z
    .string({ error: `Вкажіть ${label}` })
    .transform((value) => value.replace(/\s/g, ''))
    .pipe(z.string().regex(/^\d+$/, { error: `Вкажіть ${label} цілим числом` }))
    .transform(Number)
    .pipe(
      z
        .number()
        .min(min, { error: `Вкажіть ${label}` })
        .max(AMOUNT_MAX, { error: 'Занадто велика сума' })
    );

/** Mirrors the `posts` table constraints, so the DB never has to reject a valid-looking form. */
const commonFields = {
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
};

export const postFieldsSchema = z.discriminatedUnion(
  'category',
  [
    z.object({ category: z.enum(ARTICLE_CATEGORIES), ...commonFields }),
    z.object({
      category: z.literal(PROJECT_CATEGORY),
      ...commonFields,
      projectStatus: z.enum(PROJECT_STATUSES, { error: 'Оберіть статус проєкту' }),
      goal: amount('ціль збору', 1),
      raised: amount('зібрану суму', 0),
    }),
  ],
  { error: 'Оберіть тип публікації' }
);

export type PostFields = z.infer<typeof postFieldsSchema>;

export const postIdSchema = z.uuid();

export function parsePostFields(formData: FormData) {
  return postFieldsSchema.safeParse({
    category: formData.get('category'),
    title: formData.get('title'),
    excerpt: formData.get('excerpt'),
    publishedOn: formData.get('publishedOn'),
    projectStatus: formData.get('projectStatus'),
    goal: formData.get('goal'),
    raised: formData.get('raised'),
  });
}

export function parsePostId(formData: FormData) {
  return postIdSchema.safeParse(formData.get('id'));
}
