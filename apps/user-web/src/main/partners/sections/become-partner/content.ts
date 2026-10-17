// Labels live in the messages under `partners.becomePartner.cooperationTypes.<id>`.
// The form submits the id, and the Server Action accepts only ids from this list.
export const COOPERATION_TYPES = [
  'financial',
  'volunteering',
  'business',
  'media',
  'other',
] as const;

export type CooperationType = (typeof COOPERATION_TYPES)[number];
