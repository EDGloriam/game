import React from 'react';

import { Button, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'router';

const Index = () => (
  <Stack alignItems="center" justifyContent="center" flexGrow={1}>
    <Typography variant="h1">404 | Not found</Typography>
    <Link to={routes.home}>
      <Button>Back home</Button>
    </Link>
  </Stack>
);

export default Index;
