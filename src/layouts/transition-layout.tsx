import React, { FC, useCallback, useEffect, useState } from 'react';
import { animated, useTrail } from '@react-spring/web';
import { useRouter } from 'next/router';
import debounce from 'lodash/debounce';

interface Props {
  children: React.ReactNode;
}

const TransitionLayout: FC<Props> = (props) => {
  const { children } = props;
  const router = useRouter();
  const allowUrls = ['/','/recycle', '/recycle/barcode', '/onboarding/bin-setup', '/search'];
  const ITEMS = [
    {
      backgroundColor: 'hsl(358,79%,79%)',
    },
    {
      backgroundColor: 'hsl(358,79%,69%)',
    },
    {
      backgroundColor: 'hsl(358,79%,59%)',
    },
    {
      backgroundColor: 'hsl(358,79%,49%)',
    },
  ];
  const [isShowTransition, setIsShowTransition] = useState(false);
  const [isFinishedTransition, setIsFinishedTransition] = useState(true);

  const [trail, api] = useTrail(ITEMS.length, () => ({
    xEnter: -100,
  }));

  const debounceFinishTransition = useCallback(
    debounce(() => {
      api.start({
        xEnter: -100,
        config: {
          duration: 0,
        },
      });
      setIsFinishedTransition(true);
    }, 500),
    [],
  );

  function startAnimation(nextUrl: string) {
    // Only animate if the next url is allowed
    if (!allowUrls.includes(nextUrl)) return;
    setIsFinishedTransition(false);
    api.start({
      xEnter: 0,
      config: {
        duration: 150,
      },
    });
    setIsShowTransition(true);
  }

  function endAnimation() {
    api.start({
      xEnter: 100,
      config: {
        duration: 150,
      },
      onRest: (a) => {
        debounceFinishTransition();
      },
    });
    setIsShowTransition(false);
  }

  useEffect(() => {
    router.events.on('routeChangeStart', startAnimation);
    router.events.on('routeChangeComplete', endAnimation);
    router.events.on('routeChangeError', endAnimation);

    return () => {
      router.events.off('routeChangeStart', startAnimation);
      router.events.off('routeChangeComplete', endAnimation);
      router.events.off('routeChangeError', endAnimation);
    };
  }, [router]);

  return (
    <>
      <animated.div
        style={{
          display: !isFinishedTransition ? 'flex' : 'none',
          flexDirection: 'column',
          position: 'absolute',
          width: window.innerWidth,
          height: window.innerHeight,
          overflow: 'hidden',
          zIndex: 9999,
        }}
      >
        {trail.map((style, index) => (
          <animated.div
            key={index}
            style={{
              flexGrow: 1,
              backgroundColor: ITEMS[index].backgroundColor,
              transform: style.xEnter.to((x) => `translateX(${x}%)`),
            }}
          ></animated.div>
        ))}
      </animated.div>
      {children}
    </>
  );
};

export default TransitionLayout;
