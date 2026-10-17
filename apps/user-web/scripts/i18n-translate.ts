/**
 * Translates `src/shared/i18n/messages/uk.json` into every target language with Claude.
 *
 *   npm run i18n:translate                    # translate new and changed strings
 *   npm run i18n:translate -- --dry-run       # list what would be translated, no API call
 *   npm run i18n:translate -- --locale it     # one language only
 *   npm run i18n:translate -- --force         # re-translate everything (e.g. after a glossary change)
 *
 * Only strings whose Ukrainian source changed since the last run are sent: the lockfile
 * (`messages/translations.lock.json`) remembers a hash of the source each translation was
 * made from. A hand edit in `en.json` / `it.json` is therefore kept until the Ukrainian
 * text it came from changes.
 *
 * Needs ANTHROPIC_API_KEY — in `apps/user-web/.env.local` or the shell environment.
 */
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { parseArgs } from 'node:util';

import Anthropic from '@anthropic-ai/sdk';
import { betaJSONSchemaOutputFormat } from '@anthropic-ai/sdk/helpers/beta/json-schema';
import { IntlMessageFormat } from 'intl-messageformat';

import GLOSSARY from '../src/shared/i18n/glossary.json';
import LOCALES from '../src/shared/i18n/locales.json';
import {
  buildLike,
  compareMessageShape,
  flattenMessages,
  type MessageTree,
} from '../src/shared/i18n/messageTools';

const MODEL = 'claude-opus-5-5';
const BATCH_SIZE = 40;
const LANGUAGE_NAMES: Record<string, string> = { en: 'English', it: 'Italian' };

const MESSAGES_DIR = new URL('../src/shared/i18n/messages/', import.meta.url);
const LOCK_PATH = fileURLToPath(new URL('translations.lock.json', MESSAGES_DIR));

type Lock = Record<string, Record<string, string>>;
type Entry = { key: string; text: string };

const TRANSLATION_BATCH = betaJSONSchemaOutputFormat({
  additionalProperties: false,
  properties: {
    translations: {
      items: {
        additionalProperties: false,
        properties: { key: { type: 'string' }, text: { type: 'string' } },
        required: ['key', 'text'],
        type: 'object',
      },
      type: 'array',
    },
  },
  required: ['translations'],
  type: 'object',
});

function messagesPath(locale: string): string {
  return fileURLToPath(new URL(`${locale}.json`, MESSAGES_DIR));
}

function readJson<T>(path: string, fallback: T): T {
  return existsSync(path) ? (JSON.parse(readFileSync(path, 'utf8')) as T) : fallback;
}

function writeJson(path: string, value: unknown): void {
  writeFileSync(path, `${JSON.stringify(value, null, 2)}\n`);
}

function hash(text: string): string {
  return createHash('sha256').update(text).digest('hex').slice(0, 16);
}

function systemPrompt(locale: string): string {
  const language = LANGUAGE_NAMES[locale] ?? locale;
  const glossary = GLOSSARY.terms
    .map((term) => {
      const target = (term as Record<string, string>)[locale];

      return `- "${term.uk}" → "${target}" (${term.note})`;
    })
    .join('\n');

  return `You translate the website of «Світанки України», a Ukrainian Christian charity that runs a home, camps and weekend meetings for children and young people from frontline communities in eastern Ukraine. Translate its interface strings from Ukrainian into ${language}.

Readers are international partners and donors — foundations, churches, companies — and volunteers. Write the way a thoughtful native ${language}-speaking charity would: warm, sincere and hopeful, plain rather than flowery, never sentimental or salesy. Keep short UI labels (buttons, tabs, aria-labels) short.

Each string is ICU MessageFormat, rendered by next-intl:
- Keep every argument exactly as written: {city}, {title}, {amount}. Never translate the name inside the braces.
- Keep every rich-text tag with the same name — <mark>…</mark>, <first>…</first>, <br></br>. You may move tags to fit ${language} word order, but every tag in the source appears in the translation.
- For {name, plural, …} keep the argument name and rewrite the categories for ${language}'s plural rules (CLDR), always including "other". Keep "#" where the number goes.
- A literal apostrophe is fine; never add quotes or braces that change the ICU structure.

Use these terms exactly:
${glossary}

Further rules:
- Write people's names in standard Ukrainian romanisation (e.g. "Михайло Костів" → "Mykhailo Kostiv"); "о." before a priest's name is "Fr.".
- Use ${language} punctuation and quotation marks.
- "Lorem ipsum…" placeholders stay exactly as they are.
- The key (e.g. "home.hero.title") tells you where a string appears; use it as context, never translate it.

Return every input key exactly once with its translation.`;
}

/** Translates one batch, halving it if the answer is cut off by the output limit. */
async function translateBatch(
  client: Anthropic,
  locale: string,
  entries: Entry[]
): Promise<Map<string, string>> {
  // Streaming: the SDK refuses non-streaming requests with an output limit this large.
  const stream = client.beta.messages.stream({
    betas: ['server-side-fallback-2026-07-01'],
    fallbacks: 'default',
    max_tokens: 32_000,
    messages: [{ content: JSON.stringify(entries, null, 2), role: 'user' }],
    model: MODEL,
    output_config: { effort: 'high', format: TRANSLATION_BATCH },
    system: systemPrompt(locale),
  });
  const response = await stream.finalMessage();

  if (response.stop_reason === 'max_tokens' && entries.length > 1) {
    const middle = Math.ceil(entries.length / 2);
    const [first, second] = await Promise.all([
      translateBatch(client, locale, entries.slice(0, middle)),
      translateBatch(client, locale, entries.slice(middle)),
    ]);

    return new Map([...first, ...second]);
  }

  if (response.stop_reason === 'refusal') {
    throw new Error(`Claude declined a batch starting at "${entries[0]?.key}".`);
  }

  if (!response.parsed_output) {
    throw new Error(`Unparseable answer (stop reason: ${response.stop_reason}).`);
  }

  usage.input += response.usage.input_tokens;
  usage.output += response.usage.output_tokens;

  return new Map(response.parsed_output.translations.map(({ key, text }) => [key, text]));
}

/** The keys in `entries` whose translation is missing or breaks the source's ICU shape. */
function findProblems(locale: string, entries: Entry[], translated: Map<string, string>): string[] {
  return entries.flatMap(({ key, text }) => {
    const translation = translated.get(key);

    if (translation === undefined) return [`${key}: missing`];

    const shape = compareMessageShape(text, translation);

    if (shape) return [`${key}: ${shape}`];

    try {
      new IntlMessageFormat(translation, locale);
    } catch (error) {
      return [`${key}: invalid ICU (${(error as Error).message})`];
    }

    return [];
  });
}

async function translateEntries(
  client: Anthropic,
  locale: string,
  entries: Entry[]
): Promise<Map<string, string>> {
  const result = new Map<string, string>();

  for (let start = 0; start < entries.length; start += BATCH_SIZE) {
    const batch = entries.slice(start, start + BATCH_SIZE);

    console.log(`  ${locale}: ${start + batch.length}/${entries.length}`);

    let translated = await translateBatch(client, locale, batch);
    const failed = new Set(
      findProblems(locale, batch, translated).map((line) => line.split(':')[0])
    );

    // One retry for the strings that came back broken.
    if (failed.size > 0) {
      const retried = await translateBatch(
        client,
        locale,
        batch.filter(({ key }) => failed.has(key))
      );

      translated = new Map([...translated, ...retried]);
    }

    const problems = findProblems(locale, batch, translated);

    if (problems.length > 0) {
      throw new Error(`Translations still broken after a retry:\n  ${problems.join('\n  ')}`);
    }

    for (const { key } of batch) result.set(key, translated.get(key) as string);
  }

  return result;
}

const usage = { input: 0, output: 0 };

async function main() {
  const { values: args } = parseArgs({
    options: {
      'dry-run': { default: false, type: 'boolean' },
      force: { default: false, type: 'boolean' },
      locale: { multiple: true, type: 'string' },
    },
  });

  const locales = args.locale ?? LOCALES.targets;
  const unknown = locales.filter((locale) => !LOCALES.targets.includes(locale));

  if (unknown.length > 0) {
    throw new Error(`Not a target in locales.json: ${unknown.join(', ')}`);
  }

  const sourceTree = readJson<MessageTree>(messagesPath(LOCALES.source), {});
  const source = flattenMessages(sourceTree);
  const lock = readJson<Lock>(LOCK_PATH, {});

  if (!args['dry-run']) {
    try {
      process.loadEnvFile(fileURLToPath(new URL('../.env.local', import.meta.url)));
    } catch {
      // No .env.local — the key may come from the shell environment instead.
    }
  }

  const client = args['dry-run'] ? null : new Anthropic();

  for (const locale of locales) {
    const existing = flattenMessages(readJson<MessageTree>(messagesPath(locale), {}));
    const locked = lock[locale] ?? {};
    const pending: Entry[] = [...source]
      .filter(([key, text]) => args.force || !existing.has(key) || locked[key] !== hash(text))
      .map(([key, text]) => ({ key, text }));

    console.log(`${locale}: ${pending.length} of ${source.size} strings to translate`);

    if (pending.length === 0) continue;

    if (!client) {
      for (const { key } of pending) console.log(`  ${key}`);
      continue;
    }

    const translated = await translateEntries(client, locale, pending);
    const values = new Map(
      [...source.keys()].map((key) => [key, translated.get(key) ?? existing.get(key) ?? ''])
    );

    writeJson(messagesPath(locale), buildLike(sourceTree, values));
    lock[locale] = Object.fromEntries([...source].map(([key, text]) => [key, hash(text)]));
    writeJson(LOCK_PATH, lock);
    console.log(`${locale}: wrote messages/${locale}.json`);
  }

  if (client) {
    console.log(`Tokens used — input: ${usage.input}, output: ${usage.output}`);
  }
}

main().catch((error: unknown) => {
  if (error instanceof Anthropic.AuthenticationError) {
    console.error('Invalid or missing ANTHROPIC_API_KEY — add it to apps/user-web/.env.local.');
  } else if (error instanceof Anthropic.RateLimitError) {
    console.error('Rate limited by the Claude API — wait a minute and run the script again.');
  } else {
    console.error(error instanceof Error ? error.message : error);
  }

  process.exitCode = 1;
});
