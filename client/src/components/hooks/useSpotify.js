import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_CLIENT_ID } = process.env;
const spotify = new SpotifyWebApi({
  clientId: REACT_APP_CLIENT_ID,
});

function useSpotify() {
  const [{ token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  if (!token) return null;
  return spotify;
}
export default useSpotify;
