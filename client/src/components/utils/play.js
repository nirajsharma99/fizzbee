import SpotifyWebApi from 'spotify-web-api-node';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { buttontype } from './buttontype';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Play({ uri, type }) {
  const [{ deviceId, token }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;

  spotify.setAccessToken(accessToken);

  const play = (uri) => {
    //console.log(uri);
    spotify
      .play({
        uris: [uri],
        device_id: deviceId,
      })
      .then((res) => {
        dispatch({
          type: 'SET_CURRENT_PLAYLIST',
          list: [uri],
        });
        spotify.getMyCurrentPlayingTrack().then((x) => {
          console.log('current in api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
          spotify
            .getAudioFeaturesForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio features', data.body);
            })
            .catch((err) => {
              console.log(err);
            });

          /* Get Audio Analysis for a Track */
          spotify
            .getAudioAnalysisForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio analysis', data.body);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <button
      className={buttontype[type].className}
      style={{ color: 'rgb(0, 255, 127)' }}
      onClick={() => {
        play(uri);
      }}
    >
      <PlayArrowIcon
        fontSize="large"
        style={{ color: buttontype[type].color }}
      />
    </button>
  );
}
export default Play;
