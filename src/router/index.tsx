import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Home from 'pages/Home';
import Typography from 'pages/Typography';
import NotFound from 'pages/NotFound';

export const routes = {
  home: '/',
  typography: '/typography',
};

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Home />,
  },
  {
    path: routes.typography,
    element: <Typography />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
]);
