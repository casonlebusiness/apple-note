import CottageOutlinedIcon from '@mui/icons-material/CottageOutlined';
import QrCodeScannerOutlinedIcon from '@mui/icons-material/QrCodeScannerOutlined';
import SettingsIcon from '@mui/icons-material/Settings';
import ShoppingCartCheckoutOutlinedIcon from '@mui/icons-material/ShoppingCartCheckoutOutlined';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Paper from '@mui/material/Paper';
import { useTheme } from '@mui/material/styles';
import SvgIcon from '@mui/material/SvgIcon';
import { useRouter } from 'next/router';
import React from 'react';

const Footer = (props): JSX.Element => {
  const theme = useTheme();
  const { mode } = theme.palette;
  const router = useRouter();

  const [value, setValue] = React.useState(router.pathname);

  const onLink = (href) => {
    router.push(href);
  };

  function CustomSvgIcon(props) {
    return (
      <SvgIcon {...props} viewBox="0 0 50 50">
        <path d="M18.4 18.4 22.85 11.05 19.9 6.15Q19.3 5.15 18.175 5.15Q17.05 5.15 16.45 6.15L11.55 14.3ZM37.75 32 33.3 24.6 40.25 20.6 43.45 25.95Q44 26.8 44.025 27.875Q44.05 28.95 43.6 29.8Q43.1 30.8 42.125 31.4Q41.15 32 40 32ZM32 46 24 38 32 30V34H41.5L38.6 39.8Q38.05 40.8 37.1 41.4Q36.15 42 35 42H32ZM12.65 42Q11.65 42 10.825 41.475Q10 40.95 9.6 40.1Q9.2 39.3 9.225 38.425Q9.25 37.55 9.7 36.8L11.4 34H20V42ZM7.7 36.3 4.45 29.8Q4 28.9 4.025 27.875Q4.05 26.85 4.6 25.95L5.4 24.6L2 22.55L12.95 19.8L15.7 30.8L12.25 28.7ZM34.7 19.2 23.75 16.45 27.2 14.4 20.95 4H28Q29.05 4 29.975 4.525Q30.9 5.05 31.45 5.95L34.05 10.3L37.45 8.2Z" />
      </SvgIcon>
    );
  }

  function BottomNavBar() {
    const pathname = window.location.pathname; // in case user visits the path directly. The BottomNavBar is able to follow suit.
    console.log(pathname);
    setValue(pathname);
  }

  return (
    <Paper sx={{ position: 'fixed', bottom: 0, left: 0, right: 0 }} elevation={3}>
      <BottomNavigation showLabels value={value} onChange={BottomNavBar}>
        <BottomNavigationAction
          sx={{ minWidth: '60px' }}
          label="Home"
          icon={<CottageOutlinedIcon />}
          value="/"
          onClick={() => onLink('/')}
        />
        <BottomNavigationAction sx={{ minWidth: '60px' }} label="Shop" icon={<ShoppingCartCheckoutOutlinedIcon />} />
        <BottomNavigationAction
          label="Barcode"
          sx={{ minWidth: '60px' }}
          icon={<QrCodeScannerOutlinedIcon />}
          value="/recycle-barcode"
          onClick={() => onLink('/recycle-barcode')}
        />
        <BottomNavigationAction
          label="Recycle"
          sx={{ minWidth: '60px' }}
          icon={<CustomSvgIcon />}
          value="/recycle"
          onClick={() => onLink('/recycle')}
        />
        <BottomNavigationAction
          label="Setting"
          sx={{ minWidth: '60px' }}
          icon={<SettingsIcon />}
          value="/setting"
          onClick={() => onLink('/setting')}
        />
      </BottomNavigation>
    </Paper>
  );
};

export default Footer;
