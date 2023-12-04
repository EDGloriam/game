import React, { FC, ReactNode } from 'react';
import {
  Box,
  Modal as MuiModal,
  ModalProps as MuiModalProps,
} from '@mui/material';
import { styled } from '@mui/material/styles';

interface FooterProps {
  children: ReactNode;
}

interface ModalProps extends Omit<MuiModalProps, 'children'> {
  children: ReactNode;
}

interface ModalComponent extends FC<ModalProps> {
  Footer: FC<FooterProps>;
}

const Content = styled(Box)(({ theme }) => ({
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  backgroundColor: theme.palette.color.white,
  padding: theme.spacing(2),
  borderRadius: 8,
}));

const Modal: ModalComponent = (props) => {
  const { children } = props;

  return (
    <MuiModal {...props}>
      <Content>{children}</Content>
    </MuiModal>
  );
};

interface StyledFooterProps {
  justifyContent?: 'flex-start' | 'center' | 'flex-end' | 'space-between';
}

const StyledFooter = styled('footer', {
  shouldForwardProp: (propName) => propName !== 'justifyContent',
})<StyledFooterProps>(({ theme, justifyContent = 'center' }) => ({
  display: 'flex',
  width: '100%',
  gap: theme.spacing(2),
  justifyContent,
  marginTop: theme.spacing(2),
}));

const Footer: FC<FooterProps> = ({ children }) => (
  <StyledFooter>{children}</StyledFooter>
);

Modal.Footer = Footer;

export default Modal;
