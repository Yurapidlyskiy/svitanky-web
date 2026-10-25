export const DONATION_FREQUENCIES = ['monthly', 'one-time'] as const;

export type DonationFrequency = (typeof DONATION_FREQUENCIES)[number];
