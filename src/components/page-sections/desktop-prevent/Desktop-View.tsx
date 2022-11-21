import React from 'react';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/container';
import { MainColes } from 'layouts';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import QRCode from 'react-qr-code';
const DesktopView = (): JSX.Element => {
  const theme = useTheme();

  return (
    <MainColes topBarLeftNode={<Box width={48} paddingY={2}></Box>}>
      <Container
        maxWidth={967}
        paddingY={0}
        paddingX={20}
        fillViewportUnderAppbar
        sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}
      >
        <Box sx={{ textAlign: 'center' }}>
          <Image src="/assets/images/recycle_right_logo.svg" alt="logo" layout="fixed" width={294} height={124} />
          <Typography sx={{ marginTop: 3 }}>
            Recycle right transforms you smartphone into an interactive tool to help direct recycling of household
            grocery items into the right coloured bin.
          </Typography>
          <Box
            sx={{
              borderRadius: 4,
              border: '1px solid #E2E2E2',
              padding: 5,
              paddingTop: 3,
              display: 'inline-block',
              marginTop: 6,
            }}
          >
            <Typography sx={{ fontWeight: 'bold', fontSize: 20, width: 150, marginBottom: 3 }}>
              Available on smartphone
            </Typography>
            <QRCode value="https://google.com" size={150} />
          </Box>
          <Typography sx={{ marginTop: 5 }}>
            Just take a photo on your smartphone to be redirected to be redirected.
          </Typography>
          <Box sx={{ marginTop: 4 }}>
            <Image src="/assets/images/together_to_zero_logo.svg" alt="logo" layout="fixed" width={193} height={47} />
          </Box>
        </Box>
      </Container>
    </MainColes>
  );
};

export default DesktopView;
