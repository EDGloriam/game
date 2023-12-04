import React, { ReactNode } from 'react';
import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';

const Content = styled('div')(({ theme }) => ({
  maxWidth: 1400,
  margin: 'auto',
  overflowY: 'auto',
  height: '100vh',
}));

const Main = styled('div')(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  flexGrow: 1,
  height: '100%',
}));

const Layout = ({ children }: { children: ReactNode }) => (
  <Box sx={{ minHeight: '100vh' }}>
    <Content>
      <Main>{children}</Main>
    </Content>
  </Box>
);

export default Layout;
