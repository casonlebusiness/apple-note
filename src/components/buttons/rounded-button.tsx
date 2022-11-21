import React, { FC, ReactNode } from 'react';
import { Button, ButtonProps } from '@mui/material';

interface Props extends ButtonProps {
  children: ReactNode;
}

const RoundedButton: FC<Props> = (props) => {
  const { children, sx = {}, ...rest } = props;
  return (
    <Button
      color="primary"
      variant="contained"
      sx={{ borderRadius: 10, paddingLeft: 10, paddingRight: 10, fontWeight: 600, ...sx }}
      {...rest}
    >
      {children}
    </Button>
  );
};

export default RoundedButton;
