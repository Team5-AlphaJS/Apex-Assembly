import { extendTheme } from '@chakra-ui/react';

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