'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';

import { requireAdmin } from '@/features/auth/session';
import { ROUTES } from '@/shared/config/routes';
import { createSupabaseServerClient } from '@/shared/supabase/server';

import { readImage } from './image';
import { parsePostFields } from './schema';
import { POST_IMAGES_BUCKET } from './storage';
import type { PostFormState } from './types';

const ONE_YEAR_SECONDS = '31536000';

export async function createPost(
  _previous: PostFormState,
  formData: FormData
): Promise<PostFormState> {
  // A Server Action is a public POST endpoint — authorise here, not in the page.
  await requireAdmin();

  const fields = parsePostFields(formData);
  const image = await readImage(formData.get('image'));

  if (!fields.success || !image.ok) {
    return {
      fieldErrors: {
        ...(fields.success ? {} : z.flattenError(fields.error).fieldErrors),
        ...(image.ok ? {} : { image: [image.error] }),
      },
    };
  }

  const supabase = await createSupabaseServerClient();
  const post = fields.data;
  // Server-generated name: the client's filename never reaches the bucket.
  const imagePath = `${post.publishedOn.slice(0, 4)}/${crypto.randomUUID()}.${image.type.extension}`;

  const upload = await supabase.storage.from(POST_IMAGES_BUCKET).upload(imagePath, image.file, {
    contentType: image.type.mime,
    cacheControl: ONE_YEAR_SECONDS,
    upsert: false,
  });

  if (upload.error) {
    console.error('[posts] image upload failed', { message: upload.error.message });
    return { error: 'Не вдалося завантажити фото. Спробуйте ще раз' };
  }

  const { error } = await supabase.from('posts').insert({
    category: post.category,
    title: post.title,
    excerpt: post.excerpt,
    published_on: post.publishedOn,
    image_path: imagePath,
  });

  if (error) {
    // Compensate: don't leave an orphaned image in the bucket.
    await supabase.storage.from(POST_IMAGES_BUCKET).remove([imagePath]);
    console.error('[posts] insert failed', { code: error.code });
    return { error: 'Не вдалося зберегти публікацію. Спробуйте ще раз' };
  }

  revalidatePath(ROUTES.posts);
  redirect(ROUTES.posts);
}
