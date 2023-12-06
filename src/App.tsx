import React from 'react';
import { Provider } from 'react-redux';

import ThemeProvider from 'theme/ThemeProvider';
import { Routes } from 'router';

import { store } from 'app/store';

const App = () => (
  <Provider store={store}>
    <ThemeProvider>
      <Routes />
    </ThemeProvider>
  </Provider>
);

export default App;
