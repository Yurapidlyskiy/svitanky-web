import { Section } from '@/shared/ui';

import { YouTubePlayer } from './YouTubePlayer';

import { VIDEO_ID, VIDEO_TITLE } from './content';

export function VideoSection() {
  return (
    <Section aria-label="Відео про Світанки України" className="py-16 lg:py-20" tone="sand">
      <div className="mx-auto w-full max-w-5xl rounded-[36px] bg-white p-4 pb-8 pr-8 shadow-sm sm:p-8 sm:pb-10 sm:pr-10">
        <YouTubePlayer title={VIDEO_TITLE} videoId={VIDEO_ID} />
      </div>
    </Section>
  );
}
