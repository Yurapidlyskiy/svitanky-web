import { NewsPage } from '@/main/news';

type RouteProps = {
  searchParams: Promise<Record<string, string | string[] | undefined>>;
};

export default async function Route({ searchParams }: RouteProps) {
  return <NewsPage searchParams={await searchParams} />;
}
