import { useEffect, useState } from 'react';
import axios from 'axios';
import { useDataHandlerValue } from '../components/contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi();
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
          window.history.pushState({}, null, '/home');
        })
        .catch(() => (window.location = '/'));
    }
  }, []);

  useEffect(() => {
    console.log('refreshtoken', refreshToken);
    if (refreshToken && expiresIn) {
      const interval = setInterval(() => {
        axios
          .post('http://localhost:3001/refresh', { refreshToken })
          .then((res) => {
            console.log('refresh', res.data);
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
        //console.log('new releases', newReleases.body);
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
          /*console.log('api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: x.body.is_playing,
          });*/
        }
      });
      spotify
        .getFollowedArtists()
        .then((x) => {
          dispatch({
            type: 'SET_ARTISTS',
            followedArtists: x.body,
          });
        })
        .catch((err) => console.log(err));

      spotify
        .getFeaturedPlaylists({
          limit: 20,
          country: 'IN',
          locale: 'en_IN',
        })
        .then(function (data) {
          dispatch({
            type: 'SET_FEATURED_PLAYLIST',
            featuredPlaylists: data.body,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      spotify
        .getCategories({
          limit: 50,
          offset: 0,
          country: 'IN',
        })
        .then(function (data) {
          /*console.log(
            'caetgories:',
            data.body.categories.items.map((x) => x.name + ',')
          );*/
          dispatch({
            type: 'SET_CATEGORIES',
            categories: data.body.categories,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
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

      spotify
        .getPlaylistTracks('37i9dQZF1DX0XUfTFmNBRM', {
          offset: 1,
          limit: 50,
          fields: 'items',
        })
        .then(function (data) {
          //console.log('The playlist contains these tracks', data.body.items);
          dispatch({
            type: 'SET_BOLLYWOOD_HITS',
            bollywoodHits: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });

      spotify
        .getPlaylistTracks('37i9dQZF1DXd8cOUiye1o2', {
          offset: 1,
          limit: 50,
          fields: 'items',
        })
        .then(function (data) {
          console.log('bolly new', data.body.items);
          dispatch({
            type: 'SET_BOLLYWOOD_NEW',
            bollywoodNew: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });

      spotify
        .getMyTopArtists()
        .then(function (data) {
          dispatch({
            type: 'SET_MY_TOP_ARTISTS',
            myTopArtists: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });

      /*spotify.getMyDevices().then((x) => {
        console.log(x);
      });*/
    }
  }, [accessToken]);

  return accessToken;
};
export default useAuth;
