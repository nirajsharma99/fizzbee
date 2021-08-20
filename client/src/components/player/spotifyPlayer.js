import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
import useAuth from '../useAuth';
import { useEffect, useState } from 'react';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const useSpotifyPlayer = (accessToken) => {
  const [{}, dispatch] = useDataHandlerValue();

  spotify.setAccessToken(accessToken);

  useEffect(() => {
    if (!window.Spotify) {
      const scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);
    }
  }, []);

  window.onSpotifyWebPlaybackSDKReady = () => {
    const player = new window.Spotify.Player({
      name: 'fizzbee player',
      getOAuthToken: (cb) => {
        cb(accessToken);
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
    });

    // Ready
    player.addListener('ready', ({ device_id }) => {
      console.log('Ready with Device ID', device_id);
      dispatch({
        type: 'SET_DEVICE_ID',
        deviceId: device_id,
      });
    });

    // Not Ready
    player.addListener('not_ready', ({ device_id }) => {
      console.log('Device ID has gone offline', device_id);
    });

    // Connect to the player!
    player.connect().then((success) => {
      if (success) {
        console.log('The Web Playback SDK successfully connected to Spotify!');
      }
    });
  };
};
export default useSpotifyPlayer;
