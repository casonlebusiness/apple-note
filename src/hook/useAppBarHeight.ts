import { useSelector } from 'react-redux';
import { RootState } from 'store/store';

export function useAppBarHeight() {
  const appBarHeight = useSelector((state: RootState) => state.app.appBarHeight);

  return appBarHeight;
}
