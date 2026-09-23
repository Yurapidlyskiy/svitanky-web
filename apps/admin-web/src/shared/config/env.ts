import { z } from 'zod';

const publicEnvSchema = z.object({
  // The project origin only. supabase-js appends /auth/v1, /rest/v1 itself, so a
  // pasted API URL (…/rest/v1/) silently breaks every auth call with a 404.
  NEXT_PUBLIC_SUPABASE_URL: z.url().refine((value) => new URL(value).pathname === '/', {
    error: 'NEXT_PUBLIC_SUPABASE_URL must be the bare project URL, e.g. https://<ref>.supabase.co',
  }),
  NEXT_PUBLIC_SUPABASE_ANON_KEY: z
    .string()
    .min(1)
    .refine((key) => !key.startsWith('sb_secret_'), {
      error: 'A secret key must never be exposed through a NEXT_PUBLIC_ variable',
    }),
});

// NEXT_PUBLIC_ values are inlined at build time only when referenced
// literally, so each one is read by its full name rather than via process.env.
export const publicEnv = publicEnvSchema.parse({
  NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
});
