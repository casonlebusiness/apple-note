/* eslint-disable react/prop-types */
import 'aos/dist/aos.css';
import { getNotesByUid, subscribeNotes } from 'api/notes/get-notes';
import Page from 'components/Page';
import { auth } from 'lib/firebase';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import 'react-image-lightbox/style.css';
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-quill/dist/quill.snow.css';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import { appSlice } from 'store/slices/appSlice';
import { persistor, store } from 'store/store';
import 'styles/globals.css';

const buildMode = process.env.NEXT_PUBLIC_ALLOW_DESKTOP_VIEW || 'development';
export default function App({ Component, pageProps }): JSX.Element {
  const router = useRouter();
  useEffect(() => {
    const pathname = router.pathname;
    if (pathname === '/login') return;
    let unsubscribe;
    auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace('/login');
      } else {
        unsubscribe = subscribeNotes(user.uid)
      }
    })
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    // Calls onFocus when the window first loads
    onFocus();
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
      unsubscribe()
    };
  }, []);

  const onFocus = () => {
    checkAuthentication()
  };

  const checkAuthentication = () => {
    auth.onAuthStateChanged(user => {
      if (!user) {
        router.replace('/login');
      } else {
        getNotesByUid(user.uid).then(snap => {
          const data = snap.sort((a: any, b: any) => {
            return b.data().updatedDate - a.data().updatedDate
          })
          store.dispatch(appSlice.actions.setNotes(data))
        })
      }
    })
  }

  const onBlur = () => {
    console.log("Tab is blurred");
  };

  return (
    <Provider store={store}>
      {/* <PersistGate loading={null} persistor={persistor}> */}
        <React.Fragment>
          <Head>
            <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
            <title>Apple Note</title>
          </Head>
          <Page>
            <Component {...pageProps} />
          </Page>
        </React.Fragment>
      {/* </PersistGate> */}
    </Provider>
  );
}
