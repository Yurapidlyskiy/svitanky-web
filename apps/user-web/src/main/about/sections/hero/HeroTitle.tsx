import { useTranslations } from 'next-intl';

type HeroTitleProps = {
  className?: string;
};

export function HeroTitle({ className = '' }: HeroTitleProps) {
  const t = useTranslations('about.hero');

  return (
    <h1 className={`font-heading font-black leading-[1.05] text-brand-navy ${className}`}>
      {t('title')}
    </h1>
  );
}
