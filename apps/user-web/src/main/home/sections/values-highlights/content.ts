import type { HighlightIconName } from './HighlightIcon';

type ValueHighlight = {
  icon: HighlightIconName;
  text: string;
};

export const VALUE_HIGHLIGHTS: ValueHighlight[] = [
  { icon: 'heart', text: 'Спільнота віри та любові' },
  { icon: 'community', text: 'Діти та молодь зі Сходу' },
  { icon: 'sun', text: 'Дім, де приймають і захищають' },
  { icon: 'sprout', text: 'Гідність · Турбота · Надія' },
];
