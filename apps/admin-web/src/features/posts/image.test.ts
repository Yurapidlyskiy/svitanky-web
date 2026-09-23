import { describe, expect, it } from 'vitest';

import { IMAGE_MAX_BYTES, detectImageType, readImage } from './image';

const JPEG = [0xff, 0xd8, 0xff, 0xe0];
const PNG = [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a];
const WEBP = [0x52, 0x49, 0x46, 0x46, 0, 0, 0, 0, 0x57, 0x45, 0x42, 0x50];

const file = (bytes: number[], type = 'image/jpeg', name = 'photo.jpg') =>
  new File([new Uint8Array(bytes)], name, { type });

describe('detectImageType', () => {
  it.each([
    [JPEG, 'image/jpeg'],
    [PNG, 'image/png'],
    [WEBP, 'image/webp'],
  ])('recognises %j', (bytes, mime) => {
    expect(detectImageType(new Uint8Array(bytes))?.mime).toBe(mime);
  });

  it('rejects anything else', () => {
    expect(detectImageType(new TextEncoder().encode('<html><script>'))).toBeNull();
    expect(detectImageType(new Uint8Array([0x47, 0x49, 0x46, 0x38]))).toBeNull(); // GIF
  });
});

describe('readImage', () => {
  it('accepts a real image and trusts the bytes, not the declared type', async () => {
    const result = await readImage(file(PNG, 'image/jpeg', 'lies.jpg'));
    expect(result.ok && result.type.extension).toBe('png');
  });

  it('rejects a disguised file', async () => {
    const result = await readImage(file([0x3c, 0x68, 0x74, 0x6d, 0x6c], 'image/jpeg'));
    expect(result.ok).toBe(false);
  });

  it('rejects a missing, empty or string value', async () => {
    expect((await readImage(null)).ok).toBe(false);
    expect((await readImage('photo.jpg')).ok).toBe(false);
    expect((await readImage(file([]))).ok).toBe(false);
  });

  it('rejects an oversized file', async () => {
    const big = new File([new Uint8Array(IMAGE_MAX_BYTES + 1)], 'big.jpg');
    expect((await readImage(big)).ok).toBe(false);
  });
});
