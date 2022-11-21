import React, { FC } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Image from 'next/image';
import { useRouter } from 'next/router';

interface Props {
  onSidebarOpen: () => void;
  colorInvert?: boolean;
  leftNode?: React.ReactNode;
  rightNode?: React.ReactNode;
}
const Topbar: FC<Props> = (props) => {
  const { onSidebarOpen, colorInvert = false, rightNode, leftNode } = props;
  const theme = useTheme();
  const router = useRouter();

  function onClickLogo() {
    router.push('/');
  }
  return (
    <Box
      display="flex"
      paddingX={1}
      marginY={1}
      alignItems="center"
      width={1}
      sx={{
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ display: 'flex' }} alignItems="center">
        {leftNode ?? (
          <Button
            onClick={onSidebarOpen}
            aria-label="Menu"
            sx={{
              borderRadius: 2,
              minWidth: 'auto',
              padding: 1,
              color: theme.palette.text.black,
            }}
          >
            <Image src="/assets/images/menu_icon.svg" width={18} height={18} alt="Menu icon" />
          </Button>
        )}
      </Box>
      <Box
        tabIndex={0}
        onClick={onClickLogo}
        display="flex"
        sx={{
          marginLeft: '10px',
          fontWeight: 600,
        }}
      >
        <Image src="/assets/images/coles_logo.svg" alt="Coles logo" layout="intrinsic" width={48} height={15} />
      </Box>
      {rightNode ?? <Box width={48}></Box>}
    </Box>
  );
};

export default Topbar;
