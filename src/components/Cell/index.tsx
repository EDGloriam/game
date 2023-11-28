import React from 'react';
import { Button, ButtonProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCell = styled(Button)<ButtonProps>(({ theme }) => ({
  width: 70,
  height: 70,
  backgroundColor: theme.palette.secondary.main,
  transition: 'opacity 200ms linear',
  '&:hover': {
    backgroundColor: theme.palette.secondary.main,
    opacity: 0.9,
  },
}));

const Cell = () => <StyledCell />;

export default Cell;
