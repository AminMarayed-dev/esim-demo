import type { CommonColors } from '@mui/material/styles/createPalette';

import type { PaletteColorNoChannels } from './core/palette';
import type { ThemeDirection, ThemeColorScheme, ThemeCssVariables } from './types';

// ----------------------------------------------------------------------

type ThemeConfig = {
  classesPrefix: string;
  modeStorageKey: string;
  direction: ThemeDirection;
  defaultMode: ThemeColorScheme;
  cssVariables: ThemeCssVariables;
  fontFamily: Record<'primary' | 'secondary', string>;
  palette: Record<
    'primary' | 'secondary' | 'info' | 'success' | 'warning' | 'error',
    PaletteColorNoChannels
  > & {
    common: Pick<CommonColors, 'black' | 'white'>;
    grey: Record<
      '50' | '100' | '200' | '300' | '400' | '500' | '600' | '700' | '800' | '900',
      string
    >;
  };
};

export const themeConfig: ThemeConfig = {
  /** **************************************
   * Base
   *************************************** */
  direction: 'ltr',
  defaultMode: 'dark',
  modeStorageKey: 'theme-mode',
  classesPrefix: 'minimal',
  /** **************************************
   * Typography
   *************************************** */
  fontFamily: {
    primary: 'Public Sans Variable',
    secondary: 'Barlow',
  },
  /** **************************************
   * Palette
   *************************************** */
palette: {
  // extracted from logo: #B944F0 → #682B9F
  primary: {
    lighter: '#F1E2FA', // very light lilac from logo
    light:   '#DDABF6', // lightened from main
    main:    '#B944F0', // dominant purple in logo
    dark:    '#8C34C4', // deeper violet in logo
    darker:  '#682B9F', // darkest purple in logo
    contrastText: '#FFFFFF',
  },

  // soft companion to primary (lilac) for accents/tabs/chips
  secondary: {
    lighter: '#ECCDFB',
    light:   '#E0ABF8',
    main:    '#D58FF6',
    dark:    '#A06BB8',
    darker:  '#6A487B',
    contrastText: '#1C252E',
  },

  // keep semantic colors as before (good accessibility defaults)
  info: {
    lighter: '#CAFDF5',
    light:   '#61F3F3',
    main:    '#00B8D9',
    dark:    '#006C9C',
    darker:  '#003768',
    contrastText: '#FFFFFF',
  },
  success: {
    lighter: '#D3FCD2',
    light:   '#77ED8B',
    main:    '#22C55E',
    dark:    '#118D57',
    darker:  '#065E49',
    contrastText: '#ffffff',
  },
  warning: {
    lighter: '#FFF5CC',
    light:   '#FFD666',
    main:    '#FFAB00',
    dark:    '#B76E00',
    darker:  '#7A4100',
    contrastText: '#1C252E',
  },
  error: {
    lighter: '#FFE9D5',
    light:   '#FFAC82',
    main:    '#FF5630',
    dark:    '#B71D18',
    darker:  '#7A0916',
    contrastText: '#FFFFFF',
  },

  // greys unchanged
  grey: {
    '50':  '#FCFDFD',
    '100': '#F9FAFB',
    '200': '#F4F6F8',
    '300': '#DFE3E8',
    '400': '#C4CDD5',
    '500': '#919EAB',
    '600': '#637381',
    '700': '#454F5B',
    '800': '#1C252E',
    '900': '#141A21',
  },

  common: { black: '#000000', white: '#FFFFFF' },
},
  /** **************************************
   * Css variables
   *************************************** */
  cssVariables: {
    cssVarPrefix: '',
    colorSchemeSelector: 'data-color-scheme',
  },
};
