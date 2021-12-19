import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function useSpotify() {
  const [{ token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  if (!token) return null;
  return spotify;
}
export default useSpotify;
