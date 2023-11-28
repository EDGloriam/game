import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

import Game from 'pages/Game';
import Typography from 'pages/Typography';
import NotFound from 'pages/NotFound';

export const routes = {
  home: '/',
  typography: '/typography',
};

export const router = createBrowserRouter([
  {
    path: routes.home,
    element: <Game />,
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
