export const IMAGE_MAX_BYTES = 5 * 1024 * 1024;
export const IMAGE_ACCEPT = 'image/jpeg,image/png,image/webp';

type ImageType =
  | { mime: 'image/jpeg'; extension: 'jpg' }
  | { mime: 'image/png'; extension: 'png' }
  | { mime: 'image/webp'; extension: 'webp' };

type ImageResult = { ok: true; file: File; type: ImageType } | { ok: false; error: string };

const startsWith = (bytes: Uint8Array, signature: number[], offset = 0) =>
  signature.every((byte, index) => bytes[offset + index] === byte);

/**
 * Identifies the format from the file's magic bytes. `File.type` comes from
 * the client and is only a hint — an .html renamed to .jpg would pass it.
 */
export function detectImageType(bytes: Uint8Array): ImageType | null {
  if (startsWith(bytes, [0xff, 0xd8, 0xff])) return { mime: 'image/jpeg', extension: 'jpg' };
  if (startsWith(bytes, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a])) {
    return { mime: 'image/png', extension: 'png' };
  }
  // RIFF....WEBP
  if (
    startsWith(bytes, [0x52, 0x49, 0x46, 0x46]) &&
    startsWith(bytes, [0x57, 0x45, 0x42, 0x50], 8)
  ) {
    return { mime: 'image/webp', extension: 'webp' };
  }
  return null;
}

/** Server-side check of an uploaded form value. */
export async function readImage(value: FormDataEntryValue | null): Promise<ImageResult> {
  if (!(value instanceof File) || value.size === 0) return { ok: false, error: 'Додайте фото' };
  if (value.size > IMAGE_MAX_BYTES) return { ok: false, error: 'Фото має бути до 5 МБ' };

  const header = new Uint8Array(await value.slice(0, 12).arrayBuffer());
  const type = detectImageType(header);
  if (!type) return { ok: false, error: 'Підтримуються лише JPG, PNG або WebP' };

  return { ok: true, file: value, type };
}

const ACCEPTED_MIME_TYPES = IMAGE_ACCEPT.split(',');

/**
 * Instant client-side feedback before upload. Only a UX shortcut — the
 * server re-checks with `readImage`, which inspects the real bytes.
 */
export function validateImageFile(file: File): string | null {
  if (!ACCEPTED_MIME_TYPES.includes(file.type)) return 'Підтримуються лише JPG, PNG або WebP';
  if (file.size > IMAGE_MAX_BYTES) return 'Фото має бути до 5 МБ';
  return null;
}
