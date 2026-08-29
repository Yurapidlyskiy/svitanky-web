import { PageIntro } from '@/shared/ui';

import { DirectionsSection } from './sections/directions';

export function ActivitiesPage() {
  return (
    <>
      <PageIntro
        description="Тут буде представлено Світанкові вікенди, табори та облаштування дому Світанків."
        title="Напрямки діяльності"
      />

      <DirectionsSection />
    </>
  );
}
