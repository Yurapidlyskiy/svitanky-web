/**
 * Pure helpers over the messages JSON, shared by `scripts/i18n-translate.ts` and the
 * catalog test (`messages.test.ts`). No Next.js or next-intl imports — the translate
 * script runs them in plain Node.
 */

export type MessageTree = { [key: string]: string | MessageTree };

/** `{ home: { hero: { title: 'x' } } }` → `Map { 'home.hero.title' => 'x' }`, in file order. */
export function flattenMessages(tree: MessageTree, prefix = ''): Map<string, string> {
  const flat = new Map<string, string>();

  for (const [key, value] of Object.entries(tree)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value === 'string') flat.set(path, value);
    else for (const [nested, text] of flattenMessages(value, path)) flat.set(nested, text);
  }

  return flat;
}

/** Rebuilds a tree with the source's shape and key order, taking each string from `values`. */
export function buildLike(
  source: MessageTree,
  values: Map<string, string>,
  prefix = ''
): MessageTree {
  const tree: MessageTree = {};

  for (const [key, value] of Object.entries(source)) {
    const path = prefix ? `${prefix}.${key}` : key;

    if (typeof value !== 'string') {
      tree[key] = buildLike(value, values, path);
      continue;
    }

    const text = values.get(path);

    if (text === undefined) throw new Error(`No value for "${path}"`);

    tree[key] = text;
  }

  return tree;
}

const ARGUMENT = /\{\s*([A-Za-z_]\w*)\s*[,}]/g;
const TAG = /<\/?([A-Za-z][\w-]*)\s*>/g;

function uniqueSorted(text: string, pattern: RegExp): string[] {
  return [...new Set(Array.from(text.matchAll(pattern), (match) => match[1] as string))].sort();
}

/**
 * Describes what a translation must keep from its source: the ICU arguments (`{city}`,
 * `{remaining, plural, …}`) and the rich-text tags (`<mark>`, `<br>`). Returns a
 * human-readable problem, or `null` when the translation keeps both.
 */
export function compareMessageShape(source: string, translation: string): string | null {
  const problems: string[] = [];
  const expected = { args: uniqueSorted(source, ARGUMENT), tags: uniqueSorted(source, TAG) };
  const actual = {
    args: uniqueSorted(translation, ARGUMENT),
    tags: uniqueSorted(translation, TAG),
  };

  if (expected.args.join() !== actual.args.join()) {
    problems.push(`arguments {${expected.args.join(', ')}} became {${actual.args.join(', ')}}`);
  }

  if (expected.tags.join() !== actual.tags.join()) {
    problems.push(`tags <${expected.tags.join(', ')}> became <${actual.tags.join(', ')}>`);
  }

  return problems.length > 0 ? problems.join('; ') : null;
}
