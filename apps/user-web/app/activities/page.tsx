import { PageIntro } from '@/app/components/content/PageIntro';
import { ActivityDirectionsSection } from '@/app/activities/components';

export default function ActivitiesPage() {
  return (
    <>
      <PageIntro
        description="Тут буде представлено Світанкові вікенди, табори та облаштування дому Світанків."
        title="Напрямки діяльності"
      />

      <ActivityDirectionsSection />
    </>
  );
}
