import ShuffleIcon from '@material-ui/icons/Shuffle';
import { useSelector } from 'react-redux';
import useSpotify from '../hooks/useSpotify';

function ShuffleBtn() {
  const { isShuffle } = useSelector((state) => state.player);
  const { colorpalette } = useSelector((state) => state.app);
  const spotify = useSpotify();

  function shuffleIt() {
    spotify.setShuffle(!isShuffle).then(
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
      <ShuffleIcon
        style={{
          color: isShuffle
            ? 'var(--main-theme)'
            : 'white',
        }}
      />
    </button>
  );
}
export default ShuffleBtn;
