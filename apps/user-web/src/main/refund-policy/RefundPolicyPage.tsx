import { useTranslations } from 'next-intl';

import { useLegalRichText } from '@/shared/hooks';
import { FundRequisites, LegalPage, LegalSection } from '@/shared/ui';

import { REFUND_POLICY_SECTIONS } from './content';

export function RefundPolicyPage() {
  const t = useTranslations('refundPolicy');
  const tLegal = useTranslations('legal');
  const richText = useLegalRichText();

  return (
    <LegalPage
      id="refund-policy"
      revision={tLegal('revision', { date: tLegal('revisionDate') })}
      title={t('title')}
    >
      {REFUND_POLICY_SECTIONS.map((id) => (
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
