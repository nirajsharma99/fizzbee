import { useDataHandlerValue } from '../contextapi/DataHandler';
import { useEffect } from 'react';
import axios from 'axios';
import { getImage } from '../utils/helperFunctions';

const UseSpotifyPlayer = () => {
  const [{ playerReady, current, albumBackground, token }, dispatch] =
    useDataHandlerValue();

  useEffect(() => {
    if (!current) return;
    const track = current?.name,
      artist = current?.artists[0].name;
    document.title = `Fizzbee | ${track}`;
    axios
      .get('/lyrics', {
        params: {
          track: track,
          artist: artist,
        },
      })
      .then((res) => {
        dispatch({ type: 'SET_LYRICS', lyrics: res.data.lyrics });
      })
      .catch(() => console.log('error catching lyrics'));
  }, [current?.name]);

  useEffect(() => {
    if (!current) return;
    if (albumBackground) {
      document.body.style.background = `black url(${getImage(
        current.album.images,
        'lg'
      )}) no-repeat center`;
      document.body.style.backgroundSize = 'contain';
    } else {
      document.body.style.background = `black`;
    }
  }, [current, albumBackground]);

  useEffect(() => {
    if (!playerReady) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);
    } /*else {
      //console.log('hi');This parts need to be checked the window.Spotify part
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);
    }*/
  }, [playerReady, token]);

  window.onSpotifyWebPlaybackSDKReady = () => {
    if (token) {
      const player = new window.Spotify.Player({
        name: 'fizzbee player',
        getOAuthToken: (cb) => {
          cb(token);
        },
      });

      // Error handling
      player.addListener('initialization_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('authentication_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('account_error', ({ message }) => {
        console.error(message);
      });
      player.addListener('playback_error', ({ message }) => {
        console.error(message);
      });

      // Playback status updates
      player.addListener('player_state_changed', (state) => {
        //console.log(state);
        dispatch({
          type: 'SET_CURRENT',
          current: state?.track_window?.current_track,
        });
        dispatch({
          type: 'SET_NEXT_TRACK',
          nextTracks: state?.track_window?.next_tracks,
        });
        dispatch({
          type: 'SET_PREVIOUS_TRACK',
          previousTracks: state?.track_window?.previous_tracks,
        });
        dispatch({
          type: 'SET_PLAYING',
          playing: !state?.paused,
        });
        dispatch({
          type: 'SET_POSITION',
          position: state?.position,
        });
        dispatch({
          type: 'SET_SHUFFLE',
          shuffle: state?.shuffle,
        });
        dispatch({
          type: 'SET_REPEAT',
          repeatMode: state?.repeat_mode ? state.repeat_mode : 0,
        });
      });

      // Ready
      player.addListener('ready', ({ device_id }) => {
        console.log('Ready with Device ID', device_id);
        dispatch({
          type: 'SET_DEVICE_ID',
          deviceId: device_id,
        });
        dispatch({
          type: 'PLAYER_READY',
          playerReady: true,
        });
      });

      // Not Ready
      player.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
      });

      // Connect to the player!
      player.connect().then((success) => {
        if (success) {
          console.log(
            'The Web Playback SDK successfully connected to Spotify!'
          );
        }
      });
    }
  };
  return null;
};
export default UseSpotifyPlayer;
