import { Stack, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import useMediaQuery from '@mui/material/useMediaQuery';
import Container from 'components/container';
import { auth } from 'lib/firebase';
import Router from 'next/router';
import { useEffect, useState } from 'react';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { emailValidate } from 'utils/common';

const FourOFourPage = (): JSX.Element => {
  const theme = useTheme();
  const isMd = useMediaQuery(theme.breakpoints.up('md'), {
    defaultMatches: true,
  });
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const usernameChange = (event) => {
    setUsername(event.target.value)
  }

  const passwordChange = (event) => {
    setPassword(event.target.value)
  }

  useEffect(() => {

  }, [])

  const handleLogin = () => {
    if (emailValidate(username) && password.length > 5) {
      window.localStorage.setItem("username", username)
      auth.signInWithEmailAndPassword(username, password).then(data => {
        Router.replace("/")
      })
        .catch(error => {
          auth.createUserWithEmailAndPassword(username, password).then(data => {
            console.log(data);
            Router.replace("/")
          })
            .catch(error => {
              alert("Password is incorrect!")
            })
        })
    } else {
      alert("Please fill right email format and password is more than 5 characters!")
    }
  }

  return (
    // <MainColes>
    <Box
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <Container paddingX={0} paddingY={0} maxWidth={{ sm: 1, md: 1236 }}>
        <Box display="flex" flexDirection={{ xs: 'column', md: 'row' }} position="relative">
          <Box width={1} order={{ xs: 2, md: 1 }} display="flex" alignItems="center">
            <Container>
              <Box>
                <Stack direction={"column"} spacing={3}>
                  <Typography variant="h5">
                    {`Login (to simlify, if account not exist, it will automatically create new one for you)`}
                  </Typography>
                  <TextField onChange={usernameChange} value={username} color="info" variant="outlined" label="Email" placeholder='Email'></TextField>
                  <TextField onChange={passwordChange} value={password} type="password" color="info" variant="outlined" label="Password" placeholder='Password'></TextField>
                  <Button onClick={handleLogin} variant="contained" color="secondary">Login/Signup</Button>
                </Stack>
              </Box>
            </Container>
          </Box>
          <Box
            sx={{
              flex: { xs: '0 0 100%', md: '0 0 50%' },
              position: 'relative',
              maxWidth: { xs: '100%', md: '50%' },
              order: { xs: 1, md: 2 },
              minHeight: { xs: 'auto', md: 'calc(100vh)' },
            }}
          >
            <Box
              sx={{
                width: { xs: 1, md: '50vw' },
                height: '100%',
                position: 'relative',
              }}
            >
              <Box
                sx={{
                  width: '100%',
                  height: '100%',
                  overflow: 'hidden',
                }}
              >
                <Box
                  sx={{
                    overflow: 'hidden',
                    left: '0%',
                    width: 1,
                    height: 1,
                    position: { xs: 'relative', md: 'absolute' },
                    clipPath: {
                      xs: 'none',
                      md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                    },
                    shapeOutside: {
                      xs: 'none',
                      md: 'polygon(10% 0%, 100% 0, 100% 100%, 0% 100%)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      height: { xs: 'auto', md: 1 },
                      '& img': {
                        objectFit: 'cover',
                      },
                      '& .lazy-load-image-loaded': {
                        height: 1,
                        width: 1,
                      },
                    }}
                  >
                    <Box
                      component={LazyLoadImage}
                      effect="blur"
                      src="https://assets.maccarianagency.com/backgrounds/img23.jpg"
                      height={{ xs: 'auto', md: 1 }}
                      maxHeight={{ xs: 300, md: 1 }}
                      width={1}
                      maxWidth={1}
                      sx={{
                        filter: theme.palette.mode === 'dark' ? 'brightness(0.7)' : 'none',
                      }}
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
    // </MainColes>
  );
};

export default FourOFourPage;
