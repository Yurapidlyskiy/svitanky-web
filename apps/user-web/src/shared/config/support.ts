export const PRESET_AMOUNTS = [150, 350, 550, 1500];

/**
 * Whole hryvnias a single donation may be. The floor keeps card-testing bots (they probe
 * stolen cards with tiny charges) from finding the form attractive; the ceiling catches
 * typos such as an extra zero.
 * TODO: confirm both numbers with the fund.
 */
export const DONATION_LIMITS = { max: 100_000, min: 20 } as const;
