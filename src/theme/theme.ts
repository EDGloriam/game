import { createTheme } from '@mui/material/styles';

import 'assets/fonts/Montserrat/style.scss';
// @ts-ignore
import palette from 'theme/palette.module.scss';

export const theme = createTheme({
  palette: {
    primary: {
      main: palette.main,
    },
    secondary: {
      main: palette.secondary,
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
          // Customize the icon color, size, etc.
          color: palette.secondary,
        },
      },
    },
  },
});
