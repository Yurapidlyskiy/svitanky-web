import { YouTubePlayer } from './YouTubePlayer';

const VIDEO_ID = '2FYXWVmaa4M';
const VIDEO_TITLE = 'Світанки України';

export function VideoSection() {
  return (
    <section
      aria-label="Відео про Світанки України"
      className="bg-[#fdf1d6] px-5 py-16 sm:px-8 lg:px-12 lg:py-20 xl:px-[12vw]"
    >
      <div className="mx-auto w-full max-w-5xl rounded-[36px] bg-white p-4 pb-8 pr-8 shadow-sm sm:p-8 sm:pb-10 sm:pr-10">
        <YouTubePlayer title={VIDEO_TITLE} videoId={VIDEO_ID} />
      </div>
    </section>
  );
}
