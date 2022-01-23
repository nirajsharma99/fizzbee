import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
import { useSelector } from 'react-redux';
dotenv.config();
const { REACT_APP_CLIENT_ID } = process.env;
const spotify = new SpotifyWebApi({
  clientId: REACT_APP_CLIENT_ID,
});

function useSpotify() {
  const token = useSelector((state) => state.player.token);
  spotify.setAccessToken(token);
  if (!token) return null;
  return spotify;
}

export default useSpotify;
