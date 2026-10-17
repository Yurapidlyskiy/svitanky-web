import { useTranslations } from 'next-intl';

type HeroLedeProps = {
  className?: string;
};

export function HeroLede({ className = '' }: HeroLedeProps) {
  const t = useTranslations('news.hero');

  return <p className={className}>{t('lede')}</p>;
}
