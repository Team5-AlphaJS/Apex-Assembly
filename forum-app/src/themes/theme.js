import { extendTheme } from '@chakra-ui/react';

/**
 * Represents the theme configuration object.
 * @typedef {Object} Theme
 * @property {Object} colors - The color palette for the theme.
 * @property {Object} colors.light - The light color scheme.
 * @property {string} colors.light.background - The background color for the light scheme.
 * @property {string} colors.light.text - The text color for the light scheme.
 * @property {Object} colors.dark - The dark color scheme.
 * @property {string} colors.dark.background - The background color for the dark scheme.
 * @property {string} colors.dark.text - The text color for the dark scheme.
 */
const theme = extendTheme({
  colors: {
    light: {
      background: 'white',
      text: 'black',
    },
    dark: {
      background: '#1A202C',
      text: 'white',
    },
  },
});

export default theme;