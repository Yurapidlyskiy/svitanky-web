import { useTranslations } from 'next-intl';

import { useLegalRichText } from '@/shared/hooks';
import { FundRequisites, LegalPage, LegalSection } from '@/shared/ui';

import { TERMS_SECTIONS } from './content';

export function TermsPage() {
  const t = useTranslations('terms');
  const tLegal = useTranslations('legal');
  const richText = useLegalRichText();

  return (
    <LegalPage
      id="terms"
      revision={tLegal('revision', { date: tLegal('revisionDate') })}
      title={t('title')}
    >
      {TERMS_SECTIONS.map((id) => (
        <LegalSection
          body={t.rich(`sections.${id}.body`, richText)}
          key={id}
          title={t(`sections.${id}.title`)}
        />
      ))}
      <FundRequisites />
    </LegalPage>
  );
}
