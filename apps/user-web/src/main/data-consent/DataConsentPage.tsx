import { useTranslations } from 'next-intl';

import { useLegalRichText } from '@/shared/hooks';
import { LegalPage, LegalSection } from '@/shared/ui';

import { DATA_CONSENT_SECTIONS } from './content';

export function DataConsentPage() {
  const t = useTranslations('dataConsent');
  const tLegal = useTranslations('legal');
  const richText = useLegalRichText();

  return (
    <LegalPage
      id="data-consent"
      revision={tLegal('revision', { date: tLegal('revisionDate') })}
      title={t('title')}
    >
      {DATA_CONSENT_SECTIONS.map((id) => (
        <LegalSection
          body={t.rich(`sections.${id}.body`, richText)}
          key={id}
          title={t(`sections.${id}.title`)}
        />
      ))}
    </LegalPage>
  );
}
