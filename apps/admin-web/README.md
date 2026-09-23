# admin-web

Admin panel for «Дім Світанків». Dev server: `npm run dev` → http://localhost:3001.
Architecture: `.claude/rules/admin-web-architecture.md`.

## Supabase setup

1. Copy `.env.local.example` to `.env.local` and fill in the URL and the
   **publishable** key.
2. Dashboard → Authentication → Sign In / Providers → turn **off** "Allow new
   users to sign up". Admins are invited, never self-registered.
3. Create the user (Authentication → Users → Add user), then grant the role
   in the SQL editor:

   ```sql
   update auth.users
   set raw_app_meta_data = raw_app_meta_data || '{"role": "admin"}'
   where email = 'admin@example.com';
   ```

   The role is read from the JWT, so the user must sign in again after this.

## Scripts

`npm run dev` · `build` · `lint` · `check-types` · `test` (vitest)
