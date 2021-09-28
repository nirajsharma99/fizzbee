import { useDataHandlerValue } from '../contextapi/DataHandler';
import RepeatOne from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';
import SpotifyWebApi from 'spotify-web-api-node';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function RepeatBtn() {
  const [{ token, repeatMode }, dispatch] = useDataHandlerValue();
  const repeatType = ['off', 'context', 'track'];
  spotify.setAccessToken(token);
  //console.log(repeatMode);
  function repeatIt() {
    var type = repeatMode === 2 ? 0 : repeatMode + 1;
    spotify.setRepeat(repeatType[type]).then(
      function () {
        console.log('Repeat track.');
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
        return <RepeatIcon />;
      case 1:
        return (
          <>
            <RepeatIcon />
            <span className="repeat-type">∞</span>
          </>
        );
      case 2:
        return <RepeatOne />;
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
