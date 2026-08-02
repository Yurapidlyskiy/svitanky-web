import { Button } from '@project/common-ui';

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background">
      <h1 className="text-4xl font-bold text-primary">Адміністрування</h1>
      <p className="text-muted-foreground">
        Панель керування фондом «Дім Світанків»
      </p>
      <Button size="lg">Увійти</Button>
    </div>
  );
}
