import type { RayFrequency, TrustPointIcon } from './types';

// All copy lives in the messages under `support.becomeRay`.
export const RAY_FREQUENCIES: RayFrequency[] = ['monthly', 'one-time'];

export const DEFAULT_FREQUENCY: RayFrequency = 'monthly';

export const DEFAULT_AMOUNT = 350;

export const TRUST_POINTS = [
  { icon: 'lock', id: 'secure' },
  { icon: 'heart', id: 'cancel' },
  { icon: 'community', id: 'friend' },
] as const satisfies { icon: TrustPointIcon; id: string }[];

export const RAYS_COUNT = 347;
export const RAYS_GOAL = 1000;
