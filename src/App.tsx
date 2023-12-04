import React from 'react';
import ThemeProvider from 'theme/ThemeProvider';
import { Routes } from 'router';

const App = () => (
  <ThemeProvider>
    <Routes />
  </ThemeProvider>
);

export default App;
