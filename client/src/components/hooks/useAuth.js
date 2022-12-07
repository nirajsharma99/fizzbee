import { useEffect, useState } from 'react';
import axios from 'axios';
import dotenv from 'dotenv';
import { useDispatch, useSelector } from 'react-redux';
import { setSpotifyAccessToken } from '../store/actions/spotify-actions';
import { setExpiresIn } from '../store/actions/player-actions';
dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;
const PORT = process.env.PORT;
const endpoint = 'http://localhost:' + (PORT ? PORT : '3001');
export const useAuth = (code) => {
  const dispatch = useDispatch();
  const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';
  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const expiresIn = useSelector((state) => state.player.expiresIn);
  //console.log('useAuth');
  useEffect(() => {
    if (code) {
      axios
        .post(`${endpoint}/login`, { code })
        .then((res) => {
          const { accessToken, refreshToken, expiresIn } = res.data;
          setAccessToken(accessToken);
          setRefreshToken(refreshToken);
          dispatch(setExpiresIn(expiresIn));
          dispatch(setSpotifyAccessToken(accessToken));
          window.localStorage.setItem('token', accessToken);
          window.localStorage.setItem('refreshToken', refreshToken);
          window.history.pushState({}, null, '/app');
        })
        .catch((err) => /*(window.location = '/')*/ console.log(err));
    }
  }, [code]);

  useEffect(() => {
    if (!refreshToken && !expiresIn) return;
    const interval = setInterval(() => {
      axios
        .post(`${endpoint}/refresh`, { refreshToken })
        .then((res) => {
          //console.log('refresh', res.data);
          const { access_token, expiresIn } = res.data;
          setAccessToken(access_token);
          dispatch(setSpotifyAccessToken(access_token));
          window.localStorage.setItem('token', access_token);
          dispatch(setExpiresIn(expiresIn));
        })
        .catch((err) => console.log(err));
    }, (expiresIn - 60) * 1000);
    return () => clearInterval(interval);
  }, [refreshToken, expiresIn]);

  return null;
};
