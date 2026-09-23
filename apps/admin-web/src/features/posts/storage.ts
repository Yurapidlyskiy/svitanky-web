import type { SupabaseClient } from '@supabase/supabase-js';

export const POST_IMAGES_BUCKET = 'post-images';

export function postImageUrl(supabase: SupabaseClient, path: string): string {
  return supabase.storage.from(POST_IMAGES_BUCKET).getPublicUrl(path).data.publicUrl;
}
