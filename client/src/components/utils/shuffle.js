import ShuffleIcon from '@material-ui/icons/Shuffle';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function ShuffleBtn() {
  const [{ token, shuffle }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);

  function shuffleIt() {
    spotify.setShuffle(!shuffle).then(
      function () {
        console.log('Shuffle is ' + !shuffle);
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  }
  return (
    <button className={'t-btn '} onClick={shuffleIt}>
      <ShuffleIcon style={{ color: shuffle ? 'rgb(0,255,127)' : 'white' }} />
    </button>
  );
}
export default ShuffleBtn;
