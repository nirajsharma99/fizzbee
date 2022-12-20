import RepeatOne from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setRepeat } from '../store/actions/player-actions';

function RepeatBtn({ color }) {
  const dispatch = useDispatch();
  const { repeatMode } = useSelector((state) => state.player);
  const spotify = useSpotify();

  const repeatType = ['off', 'track', 'context',];

  function repeatIt() {
    //console.log(repeatMode, repeatType[repeatMode]);
    let type = repeatMode;
    if (type < 2) {
      dispatch(setRepeat(repeatMode + 1));
      type = repeatMode + 1;
    } else {
      dispatch(setRepeat(0));
      type = 0;
    }
    spotify.setRepeat(repeatType[type]).then(
      function () {
        //console.log('Repeat track.');
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  }

  function renderSwitch(repeatMode) {
    switch (repeatMode) {
      case 0:
        return (
          <RepeatIcon
            style={{
              color: color ? color : 'white',
            }}
          />
        );

      case 1:
        return <RepeatOne style={{ color: 'var(--main-theme)' }} />;

      case 2:
        return (
          <>
            <RepeatIcon style={{ color: 'var(--main-theme)' }} />
            <span className="repeat-type">∞</span>
          </>
        );



      default:
        console.log('Switch error');
        break;
    }
  }

  return (
    <button
      className={
        't-btn position-relative ' +
        (repeatMode !== 0 ? 'text-light' : 'text-secondary')
      }
      onClick={repeatIt}
    >
      {renderSwitch(repeatMode)}
    </button>
  );
}
export default RepeatBtn;
