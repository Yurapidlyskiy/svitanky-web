import { useTranslations } from 'next-intl';

type HeroSubtitleProps = {
  className?: string;
};

export function HeroSubtitle({ className = '' }: HeroSubtitleProps) {
  const t = useTranslations('support.hero');

  return <p className={className}>{t('subtitle')}</p>;
}
