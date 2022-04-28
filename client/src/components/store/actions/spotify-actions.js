import axios from 'axios';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
import { setCurrentPlaylist } from './library-actions';
import { setExpiresIn, setPlaying } from './player-actions';
import { setNotibar } from './app-actions';
import {
  SET_MY_DEVICES,
  NEW_RELEASES,
  MY_TOP_TRACKS,
  SET_FEATURED_PLAYLIST,
  SET_BOLLYWOOD_HITS,
  SET_BOLLYWOOD_NEW,
  SET_CATEGORIES,
  SET_MY_TOP_ARTISTS,
  SET_ARTISTS,
  SET_TOKEN,
  SET_MUTED,
} from '../actions/types';

dotenv.config();
const { REACT_APP_CLIENT_ID, REACT_APP_API_ENDPOINT } = process.env;
const spotify = new SpotifyWebApi({
  clientId: REACT_APP_CLIENT_ID,
});
const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';

export const setSpotifyAccessToken = (token) => (dispatch) => {
  dispatch({ type: SET_TOKEN, token: token });
  spotify.setAccessToken(token);
};

export const getNewAccessToken = () => (dispatch) => {
  const refreshToken = window.localStorage.getItem('refreshToken');
  if (!refreshToken) return;
  return axios
    .post(`${API_ENDPOINT}/refresh`, { refreshToken })
    .then((res) => {
      //console.log('refresh', res.data);
      const { access_token, expiresIn } = res.data;
      dispatch(setSpotifyAccessToken(access_token));
      window.localStorage.setItem('token', access_token);
      setExpiresIn(expiresIn);
      return access_token;
    })
    .catch((err) => console.log(err));
};

export const getHome = (token) => (dispatch) => {
  //console.log(token);
  spotify.setAccessToken(token);
  spotify
    .getPlaylistTracks('37i9dQZF1DXd8cOUiye1o2', {
      offset: 1,
      limit: 50,
      fields: 'items',
    })
    .then(function (data) {
      //console.log('bolly new', data.body.items);
      dispatch({
        type: SET_BOLLYWOOD_NEW,
        bollywoodNew: data.body.items,
      });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
  spotify
    .getMyTopTracks()
    .then((x) => {
      dispatch({
        type: MY_TOP_TRACKS,
        mytoptracks: x.body.items,
      });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
  spotify
    .getFollowedArtists()
    .then((x) => {
      dispatch({
        type: SET_ARTISTS,
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
        type: SET_FEATURED_PLAYLIST,
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
        type: SET_CATEGORIES,
        categories: data.body.categories,
      });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });
  spotify
    .getPlaylistTracks('37i9dQZF1DX0XUfTFmNBRM', {
      offset: 1,
      limit: 50,
      fields: 'items',
    })
    .then(function (data) {
      //console.log('The playlist contains these tracks', data.body.items);
      dispatch({
        type: SET_BOLLYWOOD_HITS,
        bollywoodHits: data.body.items,
      });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });

  spotify
    .getNewReleases({ country: 'IN' })
    .then((newReleases) => {
      //console.log('new releases', newReleases.body);
      dispatch({
        type: NEW_RELEASES,
        newReleases: newReleases.body.albums.items,
      });
    })
    .catch((err) => console.log(err));

  spotify
    .getMyTopArtists({ limit: 50 })
    .then(function (data) {
      dispatch({
        type: SET_MY_TOP_ARTISTS,
        myTopArtists: data.body.items,
      });
    })
    .catch((err) => {
      console.log('Something went wrong!', err);
    });

  spotify.getMyDevices().then(
    function (data) {
      let availableDevices = data.body.devices;
      //console.log(availableDevices);
      dispatch({
        type: SET_MY_DEVICES,
        mydevices: availableDevices,
      });
    },
    function (err) {
      console.log('Something went wrong!', err);
    }
  );
};

export const play = (item) => (dispatch, getState) => {
  const deviceId = getState().player.deviceId;
  spotify
    .play({
      uris: [item?.uri],
      device_id: deviceId,
    })
    .then((res) => {
      dispatch(setCurrentPlaylist([item]));
    })
    .catch((err) => console.error(err));
};

export const handlePlayPause = () => (dispatch, getState) => {
  const { deviceId, playing } = getState().player;

  if (playing) {
    spotify
      .pause({ device_id: deviceId })
      .then(() => {
        dispatch(setPlaying(false));
      })
      .catch((err) => console.log(err));
  } else {
    spotify
      .play({ device_id: deviceId })
      .then(() => {
        dispatch(setPlaying(true));
      })
      .catch((err) => console.log(err));
  }
};
export const playfromlist = (index, list) => (dispatch, getState) => {
  const deviceId = getState().player.deviceId;
  let uris = [];
  list.map((item) => uris.push(item.track ? item.track?.uri : item.uri));
  //console.log(uris[index]);
  spotify
    .play({
      uris: uris,
      offset: { uri: uris[index] },
      device_id: deviceId,
    })
    .then((res) => {
      dispatch(setCurrentPlaylist(list));
    })
    .catch((err) => console.error(err));
};

export const handleVolume = (volume) => {
  spotify
    .setVolume(volume)
    .then(function () {
      //console.log('changing value');
    })
    .catch((err) => console.log(err));
};

export const setMute = (isMuted, volume) => (dispatch) => {
  spotify
    .setVolume(!isMuted ? 0 : volume)
    .then(function () {
      dispatch({
        type: SET_MUTED,
        isMuted: !isMuted,
      });
    })
    .catch((err) => console.log(err));
};

export const handleSkipNext = () => (dispatch, getState) => {
  const deviceId = getState().player.deviceId;
  spotify
    .skipToNext({ device_id: deviceId })
    .then(() => {
      console.log('Playing next..');
    })
    .catch((err) => console.log(err));
};

export const handleSkipPrev = () => (dispatch, getState) => {
  const deviceId = getState().player.deviceId;
  spotify
    .skipToPrevious({ device_id: deviceId })
    .then(() => {
      console.log('Playing previous song..');
    })
    .catch((err) => console.log(err));
};

export const getPlaylistSongs = (id) => {
  return spotify
    .getPlaylist(id)
    .then((data) => {
      let list = data?.body?.tracks?.items;
      let uris = [];
      list.map((item) => uris.push(item.track ? item.track?.uri : item.uri));
      //dispatch(setPlaylist(uris));
      return list;
    })
    .catch((err) => console.log(err));
};

export const getTrack = (id) => {
  return spotify.getTrack(id);
};

export const getMyPlaylists = (token) => {
  return axios.get('https://api.spotify.com/v1/me/playlists', {
    headers: {
      Authorization: 'Bearer ' + token,
    },
  });
};

export const isFollowingPlaylist = (token, playlist_id, user_id) => {
  return axios.get(
    `https://api.spotify.com/v1/playlists/${playlist_id}/followers/contains?ids=${user_id}`,
    {
      headers: {
        Authorization: 'Bearer ' + token,
      },
    }
  );
};

export const getAlbum = (id) => {
  return spotify.getAlbum(id);
};

export const transferMyPlayback = (id) => (dispatch) => {
  spotify.transferMyPlayback([id]).then(
    function () {
      console.log('Transfering playback to ' + id);
      dispatch(setNotibar('Transfering playback..', true));
    },
    function (err) {
      //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
      console.log('Something went wrong!', err);
    }
  );
};

export const spotifySearch = (target) => {
  return spotify.search(target, [
    'track',
    'album',
    'playlist',
    'show',
    'artist',
  ]);
};

export const searchTracksByArtist = (target) => {
  // Search tracks whose artist's name contains target
  return spotify.searchTracks(`artist:${target}`);
};

export const getArtist = (id) => {
  return spotify.getArtist(id);
};
export const getArtistAlbums = (id) => {
  return spotify.getArtistAlbums(id, { limit: 50 });
};
export const getArtistTopTracks = (id) => {
  return spotify.getArtistTopTracks(id, 'IN');
};
export const getArtistRelatedArtists = (id) => {
  return spotify.getArtistRelatedArtists(id);
};
export const isFollowingArtists = (id) => {
  return spotify.isFollowingArtists(id);
};
export const followArtists = (id) => {
  return spotify.followArtists([id]);
};
export const unfollowArtists = (id) => {
  return spotify.unfollowArtists([id]);
};
