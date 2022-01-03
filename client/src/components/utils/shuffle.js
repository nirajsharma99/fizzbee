import ShuffleIcon from '@material-ui/icons/Shuffle';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotify from '../hooks/useSpotify';

function ShuffleBtn() {
  const [{ shuffle }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  function shuffleIt() {
    spotify.setShuffle(!shuffle).then(
      function () {
        //console.log('Shuffle is ' + !shuffle);
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  }
  return (
    <button className={'t-btn '} onClick={shuffleIt}>
      <ShuffleIcon style={{ color: shuffle ? 'var(--main-theme)' : 'white' }} />
    </button>
  );
}
export default ShuffleBtn;
