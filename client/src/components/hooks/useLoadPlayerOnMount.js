import Cookies from 'js-cookie';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getNewAccessToken } from '../store/actions/spotify-actions';

export function useLoadPlayerOnMount() {
  const dispatch = useDispatch();
  useEffect(() => {
    window.addEventListener('beforeunload', setCookieOnUnload);
    return () => {
      window.removeEventListener('beforeunload', setCookieOnUnload);
    };
  }, []);
  const setCookieOnUnload = (e) => {
    Cookies.set('userBackInOneHour', 'true', {
      expires: 1 / 24,
    });
  };

  useEffect(() => {
    const userBackInOneHour = Cookies.get('userBackInOneHour');
    if (!userBackInOneHour) {
      dispatch(getNewAccessToken());
    }
  }, []);
}
