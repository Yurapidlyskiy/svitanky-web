import { Section } from '@/shared/ui';

import { FriendsProgress } from './FriendsProgress';
import { TogetherList } from './TogetherList';

export function FriendsSection() {
  return (
    <Section aria-label="Друзі Світанків" className="pb-16 lg:pb-20">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-16">
        <TogetherList />
        <FriendsProgress />
      </div>
    </Section>
  );
}
