import { Button } from '@project/common-ui';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-4xl font-bold text-primary">Дім Світанків</h1>
      <Button size="lg">Підтримати фонд</Button>
      <Button variant="outline">Дізнатися більше</Button>
    </div>
  );
}
