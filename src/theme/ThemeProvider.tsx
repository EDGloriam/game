import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider } from '@mui/material';

import { theme } from 'theme/theme';

const ThemeProvider = ({ children }: { children: ReactNode }) => (
  <MuiThemeProvider theme={theme}>{children}</MuiThemeProvider>
);

export default ThemeProvider;
