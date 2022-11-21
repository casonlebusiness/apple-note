import React, { Fragment } from 'react';
import Box from '@mui/material/Box';
import { Button, Divider, Drawer, Typography } from '@mui/material';
import Image from 'next/image';
import CloseIconButton from 'components/buttons/close-icon-button';
import { useTheme } from '@mui/material/styles';
import { useRouter } from 'next/router';

interface Props {
  onClose: () => void;
  open: boolean;
  variant: 'permanent' | 'persistent' | 'temporary' | undefined;
}

const DrawerNav = ({ open, variant, onClose }: Props): JSX.Element => {
  const theme = useTheme();
  const router = useRouter();
  const items = [
    {
      title: 'Submit Product Images',
      icon: <Image src="/assets/images/recycling_icon.svg" height={25} width={25} alt="Recycling codes icon" />,
      link: '/',
    },
    {
      title: 'Products Management',
      icon: <Image src="/assets/images/recycling_icon.svg" height={25} width={25} alt="Recycling codes icon" />,
      link: '/products',
    }
  ];

  function onClickMenuItem(item: typeof items[0]) {
    router.push(item.link);
  }

  function _renderMenuItem(item: typeof items[0]) {
    return (
      <Fragment key={item.link}>
        <Button
          onClick={() => onClickMenuItem(item)}
          fullWidth
          sx={{ justifyContent: 'start', borderRadius: 0, paddingBottom: 0.25 }}
        >
          <Box sx={{ display: 'flex' }} paddingX={3} paddingY={2}>
            <Box>{item.icon}</Box>
            <Typography sx={{ fontWeight: 600, marginLeft: 4, color: '#303840' }}>{item.title}</Typography>
          </Box>
        </Button>
        <Divider />
      </Fragment>
    );
  }

  return (
    <Drawer
      anchor="bottom"
      onClose={onClose}
      open={open}
      variant={variant}
      sx={{
        '& .MuiDrawer-paper': {
          width: '100%',
          height: '100%',
          backgroundColor: theme.palette.background.paper,
        },
      }}
    >
      <Box>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', paddingTop: 1, paddingBottom: 1 }} paddingX={1}>
          <Box sx={{ width: 40 }} />
          <Box
            display="flex"
            sx={{
              marginLeft: '10px',
              fontWeight: 600,
            }}
          >
            <Image src="/assets/images/coles_logo.svg" alt="Coles logo" layout="intrinsic" width={48} height={15} />
          </Box>
          <Box>
            <CloseIconButton onClick={onClose} />
          </Box>
        </Box>
        <Divider />
        {items.map(_renderMenuItem)}
      </Box>
    </Drawer>
  );
};

export default DrawerNav;
