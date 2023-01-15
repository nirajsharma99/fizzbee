import RepeatOne from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setRepeat } from '../store/actions/player-actions';
import { playerRepeat } from '../store/actions/spotify-actions';

function RepeatBtn({ color }) {
  const dispatch = useDispatch();
  const { repeatMode } = useSelector((state) => state.player);
  const spotify = useSpotify();

  const repeatType = ['off', 'context', 'track'];

  function repeatIt() {
    //console.log(repeatMode, repeatType[repeatMode]);
    let type = repeatMode;
    if (type < 2) {
      type = repeatMode + 1;
    } else {
      type = 0;
    }
    dispatch(playerRepeat(repeatType[type], type))
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
        return (
          <>
            <RepeatIcon style={{ color: 'var(--main-theme)' }} />
            <span className="repeat-type">∞</span>
          </>
        );
      case 2:
        return <RepeatOne style={{ color: 'var(--main-theme)' }} />;

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
