import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataHandlerValue } from '../components/contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi();
export default function useAuth(code) {
  const [{}, dispatch] = useDataHandlerValue();

  const [accessToken, setAccessToken] = useState();
  const [refreshToken, setRefreshToken] = useState();
  const [expiresIn, setExpiresIn] = useState();
  useEffect(() => {
    axios
      .post('http://localhost:3001/login', { code })
      .then((res) => {
        setAccessToken(res.data.accessToken);
        setRefreshToken(res.data.refreshToken);
        setExpiresIn(res.data.expiresIn);
        //window.history.pushState({}, null, '/home');
      })
      .catch(() => (window.location = '/'));
  }, [code]);

  useEffect(() => {
    console.log('refreshtoken', refreshToken);
    if (refreshToken && expiresIn) {
      const interval = setInterval(() => {
        axios
          .post('http://localhost:3001/refresh', { refreshToken })
          .then((res) => {
            console.log('refresh', res.data);
            setRefreshToken(res.data.refreshToken);
            setExpiresIn(res.data.expiresIn);
          })
          .catch((err) => console.log(err));
      }, (expiresIn - 60) * 1000);
      return () => clearInterval(interval);
    }
  }, [refreshToken, expiresIn]);

  useEffect(() => {
    if (accessToken) {
      spotify.setAccessToken(accessToken);

      spotify.getMe().then((user) => {
        dispatch(
          { type: 'SET_USER', user: user },
          { type: 'SET_TOKEN', token: accessToken }
        );
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });
      spotify.getNewReleases({ country: 'IN' }).then((newReleases) => {
        dispatch({
          type: 'NEW_RELEASES',
          newReleases: newReleases.body,
        });
      });
      spotify.getMyTopTracks().then((x) => {
        dispatch({
          type: 'MY_TOP_TRACKS',
          mytoptracks: x.body,
        });
      });
      spotify.getMyCurrentPlayingTrack().then((x) => {
        if (x.body) {
          dispatch({
            type: 'SET_ITEM',
            item: x.body,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: x.body.is_playing,
          });
        }
      });
      spotify.getMyDevices().then((x) => {
        console.log(x);
      });
    }
  }, [accessToken]);

  return accessToken;
}
