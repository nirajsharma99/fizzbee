import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
//import useAuth from '../useAuth';
import { useEffect } from 'react';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const token = window.localStorage.getItem('token');
const useSpotifyPlayer = () => {
  const [{ playerReady }, dispatch] = useDataHandlerValue();

  spotify.setAccessToken(token);

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
  }, [playerReady]);

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
        console.log(state);
        dispatch({
          type: 'SET_ITEM',
          item: state?.track_window?.current_track,
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
          repeatMode: state?.repeat_mode,
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
};
export default useSpotifyPlayer;
