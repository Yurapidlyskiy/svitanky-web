import type { NewsCategory, NewsItem } from './types';

const POSTERS = [
  '/assets/images/shared/poster-1.jpeg',
  '/assets/images/shared/poster-2.jpeg',
  '/assets/images/shared/poster-3.jpg',
];

type CategorySeed = {
  excerpt: string;
  titles: string[];
};

/**
 * Temporary content until the admin panel can create and remove news items.
 * Seven entries per category so every tab has more than one page.
 */
const CATEGORY_SEEDS: Record<NewsCategory, CategorySeed> = {
  news: {
    excerpt: 'Останні події та зміни в житті спільноти «Світанки України»',
    titles: [
      'Оновлення на сайті: нова сторінка проєктів',
      'Ми відкрили збір на зимовий табір',
      'Нова партнерка приєдналася до спільноти',
      'Підсумки півріччя: що вдалося зробити',
      'Оголошуємо новий склад команди',
      'Оновили правила реєстрації на табори',
      'Наша спільнота отримала відзнаку від партнерів',
    ],
  },
  announcements: {
    excerpt: 'Через спільні роздуми, молитву та навчання допомагаємо дітям',
    titles: [
      'Анонс: літній табір для дітей зі Сходу',
      'Запрошуємо на зустріч волонтерів',
      'Відкрито реєстрацію на осінній вікенд',
      'Готуємо різдвяну програму для родин',
      'Анонс майстерні для підлітків',
      'Скоро: тиждень відкритих дверей',
      'Запрошення на молитовний ранок',
    ],
  },
  reports: {
    excerpt: 'Прозоро розповідаємо, куди були спрямовані ваші пожертви',
    titles: [
      'Звіт про використання коштів за квартал',
      'Скільки дітей отримали підтримку взимку',
      'Фінансовий звіт літньої кампанії',
      'Звіт про закупівлю обладнання для табору',
      'Результати програми наставництва',
      'Звіт про гуманітарні поїздки на Схід',
      'Річний звіт спільноти «Світанки України»',
    ],
  },
  camps: {
    excerpt: 'Тиждень у горах, де діти відпочивають, вчаться та знаходять друзів',
    titles: [
      'Літній табір «Світанок» у Карпатах',
      'Як ми готуємо табір для 120 дітей',
      'Табір для підлітків: перші враження',
      'Денний табір у місті для родин',
      'Зимовий табір: тиждень тепла та ігор',
      'Волонтерська команда табору 2026',
      'Що беруть із собою діти в табір',
    ],
  },
  projects: {
    excerpt: 'Довгострокові програми, які змінюють життя дітей та молоді',
    titles: [
      'Проєкт «Дім Світанків» для родин зі Сходу',
      'Освітня програма для підлітків',
      'Проєкт психологічної підтримки дітей',
      'Майстерня ремесел як шлях до професії',
      'Програма наставництва «Поруч»',
      'Проєкт підтримки багатодітних родин',
      'Спортивний проєкт для молоді громади',
    ],
  },
};

function buildCategoryItems(
  category: NewsCategory,
  categoryIndex: number,
  seed: CategorySeed
): NewsItem[] {
  return seed.titles.map((title, index) => {
    const daysBack = index * 6 + categoryIndex;
    const publishedAt = new Date(Date.UTC(2026, 6, 20) - daysBack * 86_400_000)
      .toISOString()
      .slice(0, 10);

    return {
      id: `${category}-${index + 1}`,
      category,
      title,
      excerpt: seed.excerpt,
      publishedAt,
      image: {
        src: POSTERS[(index + categoryIndex) % POSTERS.length] as string,
        alt: title,
      },
      href: `/news/${category}-${index + 1}`,
    };
  });
}

export const NEWS_ITEMS: NewsItem[] = (Object.keys(CATEGORY_SEEDS) as NewsCategory[]).flatMap(
  (category, categoryIndex) => buildCategoryItems(category, categoryIndex, CATEGORY_SEEDS[category])
);
