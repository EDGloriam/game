import React from 'react';

import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { routes } from 'router';

const Index = () => (
  <>
    <Typography>Not found</Typography>
    <Link to={routes.home}>
      <Button>Back home</Button>
    </Link>
  </>
);

export default Index;
