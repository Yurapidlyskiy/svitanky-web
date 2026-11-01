import { FormField } from '@/shared/ui/FormField';

import { PROJECT_STATUS_LABELS, PROJECT_STATUSES, type ProjectStatus } from '../categories';
import type { PostFormState } from '../types';
import { PillPicker } from './PillPicker';

type Props = {
  status: ProjectStatus;
  goal: string;
  raised: string;
  onStatusChange: (status: ProjectStatus) => void;
  onGoalChange: (value: string) => void;
  onRaisedChange: (value: string) => void;
  errors: NonNullable<PostFormState['fieldErrors']>;
};

/** What only a project asks for. Not rendered for other categories, so not submitted either. */
export function ProjectFields({
  status,
  goal,
  raised,
  onStatusChange,
  onGoalChange,
  onRaisedChange,
  errors,
}: Props) {
  return (
    <>
      <PillPicker
        name="projectStatus"
        legend="Статус проєкту"
        options={PROJECT_STATUSES}
        labels={PROJECT_STATUS_LABELS}
        value={status}
        onChange={onStatusChange}
        errors={errors.projectStatus}
      />
      <div className="grid gap-6 sm:grid-cols-2">
        <FormField
          name="goal"
          label="Ціль збору, грн"
          required
          inputMode="numeric"
          value={goal}
          onChange={(event) => onGoalChange(event.target.value)}
          placeholder="Наприклад: 1200000"
          errors={errors.goal}
        />
        <FormField
          name="raised"
          label="Зібрано, грн"
          required
          inputMode="numeric"
          value={raised}
          onChange={(event) => onRaisedChange(event.target.value)}
          errors={errors.raised}
        />
      </div>
    </>
  );
}
