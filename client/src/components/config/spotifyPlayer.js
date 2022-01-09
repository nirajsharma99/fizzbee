import { useDataHandlerValue } from '../contextapi/DataHandler';
import { useEffect, useRef } from 'react';
import axios from 'axios';
import { getImage } from '../utils/helperFunctions';
import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;

const UseSpotifyPlayer = () => {
  const [{ current, albumBackground, token }, dispatch] = useDataHandlerValue();
  const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';

  const player = useRef(null);

  useSpotifyWebPlaybackSdkScript();

  function useSpotifyWebPlaybackSdkScript() {
    useEffect(() => {
      if (!window.Spotify) {
        appendSpotifySdkScriptToDOM();
      }
    }, []);
  }

  function appendSpotifySdkScriptToDOM() {
    const spotifyScript = document.createElement('script');
    spotifyScript.id = 'spotify-script';
    spotifyScript.src = 'https://sdk.scdn.co/spotify-player.js';
    document.head.appendChild(spotifyScript);
  }

  useEffect(() => {
    if (!current) return;
    const track = current?.name,
      artist = current?.artists[0].name;
    document.title = `Fizzbee | ${track}`;
    axios
      .get(`${API_ENDPOINT}/lyrics`, {
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
  }, [current?.name, albumBackground]);

  /*useEffect(() => {
    let scriptTag = null;
    if (!playerReady) {
      scriptTag = document.createElement('script');
      scriptTag.src = 'https://sdk.scdn.co/spotify-player.js';
      document.head.appendChild(scriptTag);

      return () => {
        document.head.removeChild(scriptTag);
      };
    } 
  }, [playerReady, token]);*/

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      if (token) {
        player.current = new window.Spotify.Player({
          name: 'fizzbee player',
          getOAuthToken: (cb) => {
            cb(token);
          },
        });

        // Error handling
        player.current.addListener('initialization_error', ({ message }) => {
          console.error(message);
        });
        player.current.addListener('authentication_error', ({ message }) => {
          console.error(message);
        });
        player.current.addListener('account_error', ({ message }) => {
          console.error(message);
        });
        player.current.addListener('playback_error', ({ message }) => {
          console.error(message);
        });

        // Playback status updates
        player.current.addListener('player_state_changed', (state) => {
          //console.log(state);

          handleStateChange(state);
        });

        // Ready
        player.current.addListener('ready', ({ device_id }) => {
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
        player.current.addListener('not_ready', ({ device_id }) => {
          console.log('Device ID has gone offline', device_id);
        });

        // Connect to the player!
        player.current.connect().then((success) => {
          if (success) {
            console.log(
              'The Web Playback SDK successfully connected to Spotify!'
            );
          }
        });
      }
    };
  }, [current]);

  const handleStateChange = (state) => {
    const { current_track, next_tracks, previous_tracks } =
      state?.track_window || {};
    const { paused, shuffle, repeat_mode, position } = state || {};

    dispatch({
      type: 'SET_CURRENT',
      current: current_track,
    });
    dispatch({
      type: 'SET_NEXT_TRACK',
      nextTracks: next_tracks,
    });
    dispatch({
      type: 'SET_PREVIOUS_TRACK',
      previousTracks: previous_tracks,
    });

    dispatch({
      type: 'SET_PLAYING',
      playing: !paused,
    });

    dispatch({
      type: 'SET_SHUFFLE',
      shuffle: shuffle,
    });

    dispatch({
      type: 'SET_REPEAT',
      repeatMode: repeat_mode ? repeat_mode : 0,
    });

    dispatch({
      type: 'SET_POSITION',
      position: position,
    });
  };

  return null;
};
export default UseSpotifyPlayer;
