import { createTheme } from '@mui/material/styles';

import 'assets/fonts/Montserrat/style.scss';

import palette from 'theme/palette.scss';

interface CustomColor {
  white: string;
}

declare module '@mui/material/styles' {
  interface Palette {
    color: CustomColor;
  }
  interface PaletteOptions {
    color: CustomColor;
  }
}

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.main,
    },
    secondary: {
      main: palette.secondary,
    },
    warning: {
      main: palette.warning,
    },
    error: {
      main: palette.error,
    },
    color: {
      white: palette.white,
    },
  },
  typography: {
    fontFamily: 'Montserrat',
    fontSize: 14,
    h1: {
      fontWeight: 700,
      fontSize: 32,
    },
    h2: {
      fontWeight: 700,
      fontSize: 28,
    },
    h3: {
      fontWeight: 700,
      fontSize: 24,
    },
    // TODO If it were a real project, I would add the rest of the styles for typography according to the design."
  },
  components: {
    MuiIconButton: {
      styleOverrides: {
        root: {
          color: palette.main,
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        containedPrimary: {
          color: palette.white,
          backgroundColor: palette.main,
          '&:hover': {
            backgroundColor: palette.mainHover,
          },
          '&:active': {
            backgroundColor: palette.mainHover,
          },
        },
      },
    },
  },
});
