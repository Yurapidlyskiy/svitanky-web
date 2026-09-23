import { z } from 'zod';

// bcrypt, which Supabase Auth hashes with, ignores everything past 72 bytes.
const PASSWORD_MAX_LENGTH = 72;

export const credentialsSchema = z.object({
  email: z
    .string({ error: 'Введіть електронну пошту' })
    .trim()
    .toLowerCase()
    .pipe(z.email({ error: 'Введіть коректну електронну пошту' }).max(254)),
  password: z
    .string({ error: 'Введіть пароль' })
    .min(1, { error: 'Введіть пароль' })
    .max(PASSWORD_MAX_LENGTH, { error: 'Пароль задовгий' }),
});

export type Credentials = z.infer<typeof credentialsSchema>;

export function parseCredentials(formData: FormData) {
  return credentialsSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password'),
  });
}
