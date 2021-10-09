import dotenv from 'dotenv';
dotenv.config();

const { REACT_APP_AUTH_ENDPOINT, REACT_APP_REDIRECT_URI, REACT_APP_CLIENT_ID } =
  process.env;

export const authEndpoint = REACT_APP_AUTH_ENDPOINT;
const redirectUri = REACT_APP_REDIRECT_URI;
const clientId = REACT_APP_CLIENT_ID;
console.log(redirectUri);
const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-playback-position',
  'user-top-read',
  'user-library-read',
  'user-library-modify',
  'ugc-image-upload',
  'user-follow-read',
  'user-follow-modify',
  'playlist-modify-public',
  'playlist-modify-private',
  'playlist-read-private',
  'playlist-read-collaborative',
  'streaming',
  'user-read-private',
];

/*export const getTokenFromUrl = () => {
  return window.location.hash
    .substring(1)
    .split('&')
    .reduce((initial, item) => {
      let parts = item.split('=');
      initial[parts[0]] = decodeURIComponent(parts[1]);
      return initial;
    }, {});
};*/

export const loginUrl = `${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
  '%20'
)}&response_type=code&show_dialog=true`;
