import { createServer } from 'node:http';
import process from 'node:process';
import { fileURLToPath } from 'node:url';

export const E2E_POSTS_API_PORT = 3200;

const row = (id, category, title, day, project = {}) => ({
  id,
  category,
  title,
  excerpt: 'Опис публікації для тесту',
  published_on: `2026-07-${day}`,
  image_path: `2026/${id}.jpg`,
  project_status: null,
  goal_amount: null,
  raised_amount: null,
  ...project,
});

// Twelve in all: more than a row or two, to show that nothing limits the grid.
const POSTS = [
  row('announcement', 'announcements', 'Анонс із бази', '20'),
  row('report', 'reports', 'Звіт із бази', '20'),
  row('project', 'projects', 'Проєкт із бази', '19', {
    project_status: 'active',
    goal_amount: 1000,
    raised_amount: 250,
  }),
  ...Array.from({ length: 9 }, (_, index) =>
    row(`news-${index + 1}`, 'news', `Новина із бази ${index + 1}`, String(index + 10))
  ),
];

// Run directly by Playwright; only imported for the port in its config.
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  createServer((request, response) => {
    response.setHeader('Content-Type', 'application/json');
    response.end(request.url?.startsWith('/rest/v1/posts') ? JSON.stringify(POSTS) : '{}');
  }).listen(E2E_POSTS_API_PORT);
}
