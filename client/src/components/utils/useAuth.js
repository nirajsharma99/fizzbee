import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const useAuth = (code) => {
  const [{}, dispatch] = useDataHandlerValue();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();

  useEffect(() => {
    if (code) {
      axios
        .post('http://localhost:3001/login', { code })
        .then((res) => {
          setAccessToken(res.data.accessToken);
          setRefreshToken(res.data.refreshToken);
          window.localStorage.setItem('token', res.data.accessToken);
          setExpiresIn(res.data.expiresIn);
          window.history.pushState({}, null, '/app');
        })
        .catch((err) => /*(window.location = '/')*/ console.log(err));
    }
  }, []);

  useEffect(() => {
    //console.log('refreshtoken', refreshToken);
    if (refreshToken && expiresIn) {
      const interval = setInterval(() => {
        axios
          .post('http://localhost:3001/refresh', { refreshToken })
          .then((res) => {
            //console.log('refresh', res.data);
            setAccessToken(res.data.accessToken);
            window.localStorage.setItem('token', res.data.accessToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch((err) => console.log(err));
      }, (expiresIn - 59) * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (accessToken) {
      spotify.setAccessToken(accessToken);
      dispatch({
        type: 'SET_TOKEN',
        token: accessToken,
      });

      spotify
        .getPlaylistsForCategory('bollywood', {
          country: 'IN',
          limit: 20,
          offset: 0,
        })
        .then(
          function (data) {
            console.log(
              'bolly categories',
              data.body.playlists.items.map((x) => x.name + ',')
            );
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
  }, [accessToken]);

  return accessToken;
};
export default useAuth;
