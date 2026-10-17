import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

import { IntlMessageFormat } from 'intl-messageformat';
import { describe, expect, it } from 'vitest';

import LOCALES from './locales.json';
import { compareMessageShape, flattenMessages, type MessageTree } from './messageTools';

// Catalog checks that run in CI: a broken or incomplete messages file fails the build
// here instead of showing raw keys or crashing on the live site.

function messagesPath(locale: string): string {
  return fileURLToPath(new URL(`./messages/${locale}.json`, import.meta.url));
}

function loadMessages(locale: string): Map<string, string> {
  return flattenMessages(JSON.parse(readFileSync(messagesPath(locale), 'utf8')) as MessageTree);
}

const source = loadMessages(LOCALES.source);

describe(`${LOCALES.source}.json (source)`, () => {
  it.each([...source])('%s is valid ICU', (_key, text) => {
    expect(() => new IntlMessageFormat(text, LOCALES.source)).not.toThrow();
  });
});

describe('locales.json', () => {
  it('serves the source language', () => {
    expect(LOCALES.enabled).toContain(LOCALES.source);
  });

  it('only enables languages that have a messages file', () => {
    for (const locale of LOCALES.enabled) {
      expect(existsSync(messagesPath(locale)), `messages/${locale}.json`).toBe(true);
    }
  });
});

const servedTranslations = LOCALES.enabled.filter((locale) => locale !== LOCALES.source);

describe.each(servedTranslations)('%s.json (served)', (locale) => {
  const translation = loadMessages(locale);

  it('has exactly the source keys — run `npm run i18n:translate` after editing uk.json', () => {
    expect([...translation.keys()].sort()).toEqual([...source.keys()].sort());
  });

  it.each([...source])('%s keeps its placeholders and is valid ICU', (key, text) => {
    const translated = translation.get(key) ?? '';

    expect(compareMessageShape(text, translated)).toBeNull();
    expect(() => new IntlMessageFormat(translated, locale)).not.toThrow();
  });
});
