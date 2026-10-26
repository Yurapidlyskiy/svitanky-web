import { useTranslations } from 'next-intl';

import { useLegalRichText } from '@/shared/hooks';
import { FundRequisites, LegalPage, LegalSection } from '@/shared/ui';

import { PRIVACY_POLICY_SECTIONS } from './content';

export function PrivacyPolicyPage() {
  const t = useTranslations('privacyPolicy');
  const tLegal = useTranslations('legal');
  const richText = useLegalRichText();

  return (
    <LegalPage
      id="privacy-policy"
      revision={tLegal('revision', { date: tLegal('revisionDate') })}
      title={t('title')}
    >
      {PRIVACY_POLICY_SECTIONS.map((id) => (
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
