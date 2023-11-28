import { createTheme } from '@mui/material/styles';
import 'assets/fonts/Montserrat/style.css';

export const theme = createTheme({
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
});
