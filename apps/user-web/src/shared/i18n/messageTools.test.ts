import { describe, expect, it } from 'vitest';

import { buildLike, compareMessageShape, flattenMessages } from './messageTools';

const TREE = { home: { hero: { title: 'Світанки', lede: 'Текст' } }, site: { name: 'Назва' } };

describe('flattenMessages / buildLike', () => {
  it('flattens nested keys in file order', () => {
    expect([...flattenMessages(TREE)]).toEqual([
      ['home.hero.title', 'Світанки'],
      ['home.hero.lede', 'Текст'],
      ['site.name', 'Назва'],
    ]);
  });

  it('rebuilds the source shape from flat values', () => {
    const values = new Map([
      ['site.name', 'Name'],
      ['home.hero.lede', 'Text'],
      ['home.hero.title', 'Svitanky'],
    ]);

    expect(buildLike(TREE, values)).toEqual({
      home: { hero: { title: 'Svitanky', lede: 'Text' } },
      site: { name: 'Name' },
    });
  });

  it('refuses to build with a missing value', () => {
    expect(() => buildLike(TREE, new Map([['site.name', 'Name']]))).toThrow('home.hero.title');
  });
});

describe('compareMessageShape', () => {
  it.each([
    ['Карта з містом {city}', 'Map with {city}'],
    [
      '<first>Світанки</first> <mark>ти</mark>',
      '<mark>You</mark> light up <first>Svitanky</first>',
    ],
    [
      'Ще <strong>{remaining, plural, one {# людина} few {# людини} many {# людей} other {# людини}}</strong>',
      '<strong>{remaining, plural, one {# more person} other {# more people}}</strong> to go',
    ],
    ['Разом,<br></br> віру', 'Together,<br></br> faith'],
  ])('accepts %j → %j', (source, translation) => {
    expect(compareMessageShape(source, translation)).toBeNull();
  });

  it.each([
    ['Карта з містом {city}', 'Map with {місто}', 'arguments'],
    ['Карта з містом {city}', 'Map with the city', 'arguments'],
    ['<mark>ти</mark>', 'you', 'tags'],
    ['<law>Закону</law>', '<a>Law</a>', 'tags'],
  ])('rejects %j → %j', (source, translation, problem) => {
    expect(compareMessageShape(source, translation)).toContain(problem);
  });
});
