'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { requireAdmin } from '@/features/auth/session';
import { ROUTES } from '@/shared/config/routes';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import { hasImageFile, readImage, type ValidImage } from './image';
import { toPostColumns } from './row';
import { parsePostFields, parsePostId, type PostFields } from './schema';
import { POST_IMAGES_BUCKET } from './storage';
import type { DeletePostState, PostFormState } from './types';

const ONE_YEAR_SECONDS = '31536000';
const UPLOAD_ERROR = 'Не вдалося завантажити фото. Спробуйте ще раз';
const SAVE_ERROR = 'Не вдалося зберегти публікацію. Спробуйте ще раз';

type Supabase = Awaited<ReturnType<typeof createSupabaseServerClient>>;

function invalidFields(fields: z.ZodSafeParseResult<PostFields>, imageError?: string) {
  return {
    fieldErrors: {
      ...(fields.success ? {} : z.flattenError(fields.error).fieldErrors),
      ...(imageError ? { image: [imageError] } : {}),
    },
  };
}

/** Returns the stored path. The name is generated: the client's filename never reaches the bucket. */
async function uploadImage(supabase: Supabase, image: ValidImage, publishedOn: string) {
  const path = `${publishedOn.slice(0, 4)}/${crypto.randomUUID()}.${image.type.extension}`;
  const { error } = await supabase.storage.from(POST_IMAGES_BUCKET).upload(path, image.file, {
    contentType: image.type.mime,
    cacheControl: ONE_YEAR_SECONDS,
    upsert: false,
  });

  if (error) {
    console.error('[posts] image upload failed', { message: error.message });
    return null;
  }
  return path;
}

/** Storage reports a file it could not see as an empty result, not an error. */
async function removeImage(supabase: Supabase, path: string) {
  const { data, error } = await supabase.storage.from(POST_IMAGES_BUCKET).remove([path]);
  if (error || data.length === 0) console.error('[posts] image removal failed', { path });
}

export async function createPost(
  _previous: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  // A Server Action is a public POST endpoint — authorise here, not in the page.
  await requireAdmin();

  const fields = parsePostFields(formData);
  const image = await readImage(formData.get('image'));

  if (!fields.success || !image.ok) {
    return invalidFields(fields, image.ok ? undefined : image.error);
  }

  const supabase = await createSupabaseServerClient();
  const imagePath = await uploadImage(supabase, image, fields.data.publishedOn);
  if (!imagePath) return { error: UPLOAD_ERROR };

  const { error } = await supabase
    .from('posts')
    .insert({ ...toPostColumns(fields.data), image_path: imagePath });

  if (error) {
    // Compensate: don't leave an orphaned image in the bucket.
    await removeImage(supabase, imagePath);
    console.error('[posts] insert failed', { code: error.code });
    return { error: SAVE_ERROR };
  }

  revalidatePath(ROUTES.posts);
  redirect(ROUTES.postsInCategory(fields.data.category));
}

export async function updatePost(
  _previous: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  await requireAdmin();

  const id = parsePostId(formData);
  if (!id.success) return { error: SAVE_ERROR };

  const fields = parsePostFields(formData);
  const imageValue = formData.get('image');
  const image = hasImageFile(imageValue) ? await readImage(imageValue) : null;

  if (!fields.success || image?.ok === false) {
    return invalidFields(fields, image?.ok === false ? image.error : undefined);
  }

  const supabase = await createSupabaseServerClient();
  const current = await supabase
    .from('posts')
    .select('image_path')
    .eq('id', id.data)
    .maybeSingle()
    .overrideTypes<{ image_path: string }, { merge: false }>();

  if (current.error || !current.data) return { error: SAVE_ERROR };

  // A new photo gets a new name rather than overwriting: the old one is cached for a year.
  const newImagePath = image && (await uploadImage(supabase, image, fields.data.publishedOn));
  if (image && !newImagePath) return { error: UPLOAD_ERROR };

  const { data, error } = await supabase
    .from('posts')
    .update({
      ...toPostColumns(fields.data),
      ...(newImagePath ? { image_path: newImagePath } : {}),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id.data)
    .select('id');

  // No row and no error: deleted meanwhile, or blocked by RLS.
  if (error || data.length === 0) {
    if (newImagePath) await removeImage(supabase, newImagePath);
    console.error('[posts] update failed', { code: error?.code ?? 'no row' });
    return { error: SAVE_ERROR };
  }

  if (newImagePath) await removeImage(supabase, current.data.image_path);

  revalidatePath(ROUTES.posts);
  redirect(ROUTES.postsInCategory(fields.data.category));
}

export async function deletePost(
  _previous: DeletePostState,
  formData: FormData
): Promise<DeletePostState> {
  await requireAdmin();

  const id = parsePostId(formData);
  if (!id.success) return { error: 'Не вдалося видалити публікацію' };

  const supabase = await createSupabaseServerClient();
  // The row goes first: a failure after this leaves a stray file, the other
  // order would leave a live post with a broken image. The path comes from the
  // database, never from the form.
  const { data, error } = await supabase
    .from('posts')
    .delete()
    .eq('id', id.data)
    .select('image_path')
    .overrideTypes<{ image_path: string }[], { merge: false }>();

  if (error) {
    console.error('[posts] delete failed', { code: error.code });
    return { error: 'Не вдалося видалити публікацію. Спробуйте ще раз' };
  }

  // No row and no error: already deleted elsewhere, or blocked by RLS.
  // Refresh the list either way, and only a blocked post stays to show this.
  revalidatePath(ROUTES.posts);
  const [post] = data;
  if (!post) return { error: 'Публікацію не видалено. Оновіть сторінку й спробуйте ще раз' };

  await removeImage(supabase, post.image_path);

  return {};
}
