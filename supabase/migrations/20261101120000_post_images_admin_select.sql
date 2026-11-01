-- Removing a file needs select as well as delete: Storage looks the object up
-- under the caller's RLS first. The bucket's admin policies cover insert, update
-- and delete only, so an admin's image removal would find nothing to delete.
-- Visitors are unaffected: they load images by public URL, which bypasses RLS.

create policy "admins read post images"
  on storage.objects for select
  to authenticated
  using (bucket_id = 'post-images' and (select public.is_admin()));
