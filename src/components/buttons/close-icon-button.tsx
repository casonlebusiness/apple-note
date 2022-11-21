import React, { FC } from 'react';
import { Box, IconButton, IconButtonProps } from '@mui/material';
import Image from 'next/image';

interface Props extends IconButtonProps {}

const CloseIconButton: FC<Props> = (props) => {
  const {} = props;
  return (
    <Box sx={{ paddingLeft: 2, textAlign: 'end' }}>
      <IconButton {...props}>
        <Image src="/assets/images/exit_icon.svg" width={16} height={16} alt="Close" />
      </IconButton>
    </Box>
  );
};

export default CloseIconButton;
