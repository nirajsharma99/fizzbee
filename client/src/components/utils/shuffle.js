import ShuffleIcon from '@material-ui/icons/Shuffle';
import { useSelector } from 'react-redux';
import useSpotify from '../hooks/useSpotify';

function ShuffleBtn({ playerType }) {
  const { isShuffle } = useSelector((state) => state.player);
  const { colorpalette } = useSelector((state) => state.app);
  const spotify = useSpotify();

  const playerTypes = ['maxPlayer3', 'maxPlayer4'];
  let colorBackground = playerTypes.includes(playerType) ? (colorpalette ? 'var(--col-thief)' : 'var(--main-theme)') : 'var(--main-theme)';

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
            ? colorBackground
            : 'white',
        }}
      />
    </button>
  );
}
export default ShuffleBtn;
