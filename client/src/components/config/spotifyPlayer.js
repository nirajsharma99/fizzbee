import { useEffect, useRef } from 'react';
import axios from 'axios';
import { getImage } from '../utils/helperFunctions';
import dotenv from 'dotenv';
import { useDispatch, useSelector } from 'react-redux';
import {
  handleStateChange,
  setDevice,
  setLyrics,
  setPlayerReady,
} from '../store/actions/player-actions';
import { getNewAccessToken } from '../store/actions/spotify-actions';
dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;

const UseSpotifyPlayer = () => {
  const dispatch = useDispatch();
  const { current, token } = useSelector((state) => state.player);
  const { albumBackground, darkMode } = useSelector((state) => state.app);
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
    document.title = current ? `Fizzbee | ${track}` : `Fizzbee`;
    axios
      .get(`${API_ENDPOINT}/lyrics`, {
        params: {
          track: track,
          artist: artist,
        },
      })
      .then((res) => {
        dispatch(setLyrics(res.data.lyrics));
      })
      .catch(() => console.log('error catching lyrics'));
  }, [current?.name]);

  useEffect(() => {
    if (!current) return;
    if (albumBackground) {
      document.body.style.background = `${
        darkMode ? 'black' : 'white'
      } url(${getImage(current.album.images, 'lg')}) no-repeat center`;
      document.body.style.backgroundSize = 'contain';
      document.body.style.backdropFilter = 'blur(1px)';
    } else {
      if (darkMode) {
        document.body.style.background = `black`;
      } else {
        document.body.style.background = `url('/abstract.jpg') no-repeat center`;
        document.body.style.backgroundSize = 'cover';
      }
    }
  }, [current?.name, albumBackground, darkMode]);

  useEffect(() => {
    window.onSpotifyWebPlaybackSDKReady = () => {
      const fetchToken = () => {
        return dispatch(getNewAccessToken());
      };
      if (token) {
        player.current = new window.Spotify.Player({
          name: 'fizzbee player',
          getOAuthToken: (cb) => {
            cb(fetchToken());
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
          dispatch(handleStateChange(state));
        });

        // Ready
        player.current.addListener('ready', ({ device_id }) => {
          console.log('Ready with Device ID', device_id);
          dispatch(setDevice(device_id));

          window.localStorage.setItem('deviceId', device_id);
          dispatch(setPlayerReady(true));
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
  }, []);

  return null;
};
export default UseSpotifyPlayer;
