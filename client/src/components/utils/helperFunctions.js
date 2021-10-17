import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

export function millisToMinutesAndSeconds(millis) {
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return seconds === 60
    ? minutes + 1 + ':00'
    : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
}

export function getColor(id, imgRef, type) {
  if (!id) return;
  const colorThief = new ColorThief();
  const img = imgRef.current;
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
    switch (type) {
      case 'player':
        document.getElementById(
          id + '3'
        ).style.background = `rgba(${color[0]},${color[1]},${color[2]},0.9)`;
        break;
      case 'max-player-2':
        document.getElementById(
          'max-player-2'
        ).style.background = `rgba(${color[0]},${color[1]},${color[2]},0.7)`;
        break;
      case 'playlist':
        document.getElementById(
          id + '3'
        ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), black)`;
        break;
      case 'artistPage':
        document.getElementById(
          id + '3'
        ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
        break;
      case 'album':
        document.getElementById(
          id + '4'
        ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
        break;

      default:
        console.log('Get color switch error');
        break;
    }
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  if (!color) return;
}

export function getColorAlbumTemplate({ id, index }) {
  const colorThief = new ColorThief();
  const img = document.getElementById(id);
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id + index
  ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
}

export function getColorArtists(id, index) {
  const colorThief = new ColorThief();
  const img = document.getElementById(id);
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id + index
  ).style.boxShadow = `0 2px 10px rgb(${color[0]},${color[1]},${color[2]})`;

  document.getElementById(
    id + index
  ).style.background = `rgba(${color[0]},${color[1]},${color[2]})`;
}

export const getColorSongTemplate = (id, index, imgRef) => {
  const colorThief = new ColorThief();
  const img = imgRef.current;
  var color;
  if (img.complete) {
    color = colorThief.getColor(img);
  } else {
    img.addEventListener('load', function () {
      color = colorThief.getColor(img);
    });
  }
  document.getElementById(
    id
  ).style.boxShadow = `0 4px 15px rgb(${color[0]},${color[1]},${color[2]})`;

  document.getElementById(id + index).style.background = `linear-gradient(
      rgba(${color[0]},${color[1]},${color[2]},0.9),
      rgba(${color[0]},${color[1]},${color[2]},0.3)
    )`;
};

export function useHandlePlayPause() {
  const [{ deviceId, playing, token }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);
  if (playing) {
    spotify
      .pause({ device_id: deviceId })
      .then(() => {
        dispatch({
          type: 'SET_PLAYING',
          playing: false,
        });
      })
      .catch((err) => console.log(err));
  } else {
    spotify
      .play({ device_id: deviceId })
      .then(() => {
        dispatch({
          type: 'SET_PLAYING',
          playing: true,
        });
      })
      .catch((err) => console.log(err));
  }
}
