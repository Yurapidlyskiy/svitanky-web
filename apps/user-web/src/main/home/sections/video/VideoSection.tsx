import { useTranslations } from 'next-intl';

import { Section } from '@/shared/ui';

import { VIDEO_ID } from './content';
import { YouTubePlayer } from './YouTubePlayer';

export function VideoSection() {
  const t = useTranslations('home.video');

  return (
    <Section aria-label={t('label')} className="py-16 lg:py-20" tone="sand">
      <div className="mx-auto w-full max-w-5xl rounded-[36px] bg-white p-4 pb-8 pr-8 shadow-sm sm:p-8 sm:pb-10 sm:pr-10">
        <YouTubePlayer
          playLabel={t('play', { title: t('title') })}
          title={t('title')}
          videoId={VIDEO_ID}
        />
      </div>
    </Section>
  );
}
