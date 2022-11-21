import { useAppBarHeight } from 'hook/useAppBarHeight';

export function useRemainingViewportWithoutAppBar() {
  const appBarHeight = useAppBarHeight();
  // Unlike 100vh property, the viewport height is not affected by the notch.
  const viewportHeight = window.innerHeight;

  return viewportHeight - appBarHeight;
}
