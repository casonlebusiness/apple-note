import React from 'react';
import Box from '@mui/material/Box';
import { BoxProps } from '@mui/material/Box/Box';

interface Props extends BoxProps {
  children: React.ReactNode;
  // All other props
  fillViewportUnderAppbar?: boolean;
}

const Container = ({ children, fillViewportUnderAppbar, ...rest }: Props): JSX.Element => {
  return (
    <Box
      // maxWidth={{ sm: 720, md: 1236 }}
      display="flex"
      flexDirection="column"
      margin="0 auto"
      paddingX={2}
      paddingY={{ xs: 4, sm: 6, md: 8 }}
      {...rest}
    >
      {children}
    </Box>
  );
};

export default Container;
