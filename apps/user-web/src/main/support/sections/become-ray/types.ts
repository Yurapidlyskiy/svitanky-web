export type RayFrequency = 'monthly' | 'one-time';

export type RayAmount = number | 'custom';

export type TrustPointIcon = 'lock' | 'heart' | 'community';

export type TrustPoint = {
  icon: TrustPointIcon;
  lines: [string, string];
};
