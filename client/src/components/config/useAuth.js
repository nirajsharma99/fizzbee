import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataHandlerValue } from '../contextapi/DataHandler';

export const useAuth = (code) => {
  const [{}, dispatch] = useDataHandlerValue();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  //console.log(expiresIn);
  useEffect(() => {
    if (code) {
      axios
        .post('/login', { code })
        .then((res) => {
          const { accessToken, refreshToken, expiresIn } = res.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          setExpiresIn(expiresIn);
          window.localStorage.setItem('token', accessToken);
          window.history.pushState({}, null, '/app');
        })
        .catch((err) => /*(window.location = '/')*/ console.log(err));
    }
  }, [code]);

  useEffect(() => {
    //console.log('refreshtoken', refreshToken);
    if (!refreshToken && !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post('/refresh', { refreshToken })
        .then((res) => {
          //console.log('refresh', res.data);
          const { access_token, expiresIn } = res.data;
          setAccessToken(accessToken);
          dispatch({ type: 'SET_TOKEN', token: access_token });
          window.localStorage.setItem('token', access_token);
          setExpiresIn(expiresIn);
        })
        .catch((err) => console.log(err));
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (!accessToken) return;
    dispatch({ type: 'SET_TOKEN', token: accessToken });
  }, [accessToken]);

  return accessToken;
};
