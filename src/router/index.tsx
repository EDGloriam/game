import React, { Suspense, lazy } from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { CircularProgress } from '@mui/material';
import { styled } from '@mui/material/styles';
import Layout from '../helpers/containers/Layout';

const Home = lazy(() => import('pages/Home'));
const Typography = lazy(() => import('pages/Typography'));
const NotFound = lazy(() => import('pages/NotFound'));

export const routes = {
  home: '/',
  typography: '/typography',
};

const StyledLoader = styled(CircularProgress)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  right: '50%',
  transform: 'translate(-50%, -50%)',
}));

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

export const Routes = () => (
  <Suspense fallback={<StyledLoader color="secondary" />}>
    <Layout>
      <RouterProvider router={router} />
    </Layout>
  </Suspense>
);
