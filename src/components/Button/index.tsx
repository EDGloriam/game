import React, { FC } from 'react';
import {
  Button as MuiButton,
  ButtonProps as MuiButtonProps,
} from '@mui/material';

interface ButtonProps extends MuiButtonProps {}

const Button: FC<ButtonProps> = (props) => {
  const { children, variant = 'contained' } = props;
  return (
    <MuiButton variant={variant} {...props}>
      {children}
    </MuiButton>
  );
};

export default Button;
