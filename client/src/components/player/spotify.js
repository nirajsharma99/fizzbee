export const authEndpoint = 'https://accounts.spotify.com/authorize';
const redirectUri = 'http://localhost:3000/app';
const clientId = 'cbb93bd5565e430a855458433142789f';

const scopes = [
  'user-read-currently-playing',
  'user-read-recently-played',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-playback-position',
  'user-top-read',
  'user-library-read',
  'user-library-modify',
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
