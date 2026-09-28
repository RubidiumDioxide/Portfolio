export interface ThemePalette {
  primary: string;
  dark: string;
  glow: string;
}

export type ThemeName = 'red' | 'blue' | 'cyan' | 'purple' | 'yellow' | 'orange';

export const PALETTES: Record<ThemeName, ThemePalette> = {
  red: {
    primary: '#cb0b0b',
    dark: '#220011',
    glow: 'rgba(226, 43, 43, 0.4)',
  },
  blue: {
    primary: '#0b5a9e',
    dark: '#001a33',
    glow: 'rgba(11, 90, 158, 0.4)',
  },
  cyan: {
    primary: '#00b4d8',
    dark: '#001f33',
    glow: 'rgba(0, 180, 216, 0.4)',
  },
  purple: {
    primary: '#9d00b0',
    dark: '#330033',
    glow: 'rgba(157, 0, 176, 0.4)',
  },
  yellow: {
    primary: '#d4a60d',
    dark: '#333300',
    glow: 'rgba(212, 166, 13, 0.4)',
  },
  orange: {
    primary: '#d96e1f',
    dark: '#331800',
    glow: 'rgba(217, 110, 31, 0.4)',
  },
};