import React from 'react';
import ThemeProvider from 'theme/ThemeProvider';
import { RouterProvider } from 'react-router-dom';
import { router } from 'router';

const App = () => (
  <ThemeProvider>
    <RouterProvider router={router} />
  </ThemeProvider>
);

export default App;
