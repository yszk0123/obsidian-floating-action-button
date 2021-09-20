export const MIN_MARGIN = 0;

export const MAX_MARGIN = 100;

export type Margin = number;

export function parseMargin(value: number): Margin {
  return Math.max(MIN_MARGIN, Math.min(MAX_MARGIN, value));
}
