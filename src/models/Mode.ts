import { MarkdownViewModeType } from 'obsidian';

const MODE_MAP = {
  live: 'live',
  preview: 'source',
  source: 'preview',
} as const;

export type Mode = MarkdownViewModeType;

export function toggleMode(mode: Mode): Mode {
  return MODE_MAP[mode];
}
