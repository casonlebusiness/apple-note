import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';

interface Props {
  title: string;
  id: string;
  href: string;
  colorInvert?: boolean;
}

const NavItemSimple = ({ title, id, href, colorInvert = false }: Props): JSX.Element => {
  const theme = useTheme();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openedPopoverId, setOpenedPopoverId] = useState(null);

  const [activeLink, setActiveLink] = useState('');
  useEffect(() => {
    setActiveLink(window && window.location ? window.location.pathname : '');
  }, []);

  const hasActiveLink = () => href === activeLink;
  const linkColor = colorInvert ? 'common.white' : 'text.primary';

  return (
    <Box>
      <Box display="flex" alignItems="center" aria-describedby={id}>
        <Button component="a" href={href} fullWidth>
          <Typography fontWeight={openedPopoverId === id || hasActiveLink() ? 700 : 400} color={linkColor}>
            {title}
          </Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default NavItemSimple;
