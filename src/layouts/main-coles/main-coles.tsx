import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import React, { FC, useEffect, useRef, useState } from 'react';
import { Topbar } from './components';
import { useMounted } from 'hook/useMounted';
import { appSlice } from 'store/slices/appSlice';
import { useDispatch } from 'react-redux';
import { useAppBarHeight } from 'hook/useAppBarHeight';
import DrawerNav from 'layouts/main-coles/components/drawer';

interface Props {
  children: React.ReactNode;
  colorInvert?: boolean;
  bgcolor?: string;
  shouldPaddingBelowAppBar?: boolean;
  topBarRightNode?: React.ReactNode;
  topBarLeftNode?: React.ReactNode;
}

const MainColes: FC<Props> = (props): JSX.Element => {
  const {
    children,
    colorInvert = false,
    bgcolor = 'transparent',
    shouldPaddingBelowAppBar = true,
    topBarRightNode,
    topBarLeftNode,
  } = props;
  const [openSidebar, setOpenSidebar] = useState(false);
  const appBarRef = useRef<HTMLDivElement>();
  const dispatch = useDispatch();
  const appBarHeight = useAppBarHeight();
  const mounted = useMounted();
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 38,
  });
  const handleSidebarOpen = (): void => {
    setOpenSidebar(true);
  };

  const handleSidebarClose = (): void => {
    setOpenSidebar(false);
  };

  useEffect(() => {
    if (mounted) {
      const appBarEl = appBarRef.current;
      if (appBarHeight === appBarEl.clientHeight) return;
      dispatch(appSlice.actions.setAppBarHeight(appBarEl.clientHeight));
    }
  });

  return (
    <Box
      sx={{
        // maxWidth: '375px',
        margin: 'auto',
      }}
    >
      <AppBar
        ref={appBarRef}
        position="fixed"
        sx={{
          top: 0,
          backgroundColor: theme.palette.background.paper,
          borderBottom: trigger ? 0 : 1,
          borderColor: theme.palette.divider,
          transition: 'border 0.1s ease-out',
          zIndex: 100,
        }}
        elevation={trigger ? 1 : 0}
      >
        {/* <Topbar
          onSidebarOpen={handleSidebarOpen}
          // pages={pages}
          colorInvert={trigger ? false : colorInvert}
          rightNode={topBarRightNode}
          leftNode={topBarLeftNode}
        /> */}
      </AppBar>
      <DrawerNav onClose={handleSidebarClose} open={openSidebar} variant="temporary" />
      <Box component="main" sx={{ paddingTop: shouldPaddingBelowAppBar ? `${appBarHeight}px` : 0 }}>
        {children}
      </Box>
      {/*<Footer />*/}
    </Box>
  );
};

export default MainColes;
