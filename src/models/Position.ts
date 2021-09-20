export type Position = 'bottomLeft' | 'bottomRight';

export function parsePosition(value: string): Position {
  switch (value) {
    case 'bottomRight':
      return 'bottomRight';
    default:
      return 'bottomLeft';
  }
}
