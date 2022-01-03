import { useDataHandlerValue } from '../contextapi/DataHandler';
import RepeatOne from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import useSpotify from '../hooks/useSpotify';

function RepeatBtn() {
  const [{ repeatMode }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  const repeatType = ['off', 'context', 'track'];

  function repeatIt() {
    //console.log(repeatMode, repeatType[repeatMode]);
    let type = repeatMode;
    if (type < 2) {
      dispatch({ type: 'SET_REPEAT', repeatMode: repeatMode + 1 });
      type = repeatMode + 1;
    } else {
      dispatch({ type: 'SET_REPEAT', repeatMode: 0 });
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
        return <RepeatIcon style={{ color: 'white' }} />;

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
        //console.log('Switch error');
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
