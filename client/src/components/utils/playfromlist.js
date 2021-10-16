import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { buttontype } from './buttontype';
import { useEffect } from 'react';
import PauseIcon from '@material-ui/icons/Pause';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function PlayFromList({ index, list, type }) {
  const [{ deviceId, token, current, playing }, dispatch] =
    useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);
  const isCurrent =
    (list?.[index]?.id ? list?.[index]?.id : list?.[index]?.track?.id) ===
    current?.id;

  const playfromlist = (index, list) => {
    let uris = [];
    list.map((item) => uris.push(item.track ? item.track?.uri : item.uri));
    console.log(uris[index]);

    spotify
      .play({
        uris: uris,
        offset: { uri: uris[index] },
        device_id: deviceId,
      })
      .then((res) => {
        dispatch({
          type: 'SET_CURRENT_PLAYLIST',
          list: list,
        });
        spotify.getMyCurrentPlayingTrack().then((x) => {
          /*console.log('current in api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });*/
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
  const handlePlayPause = () => {
    if (playing) {
      spotify
        .pause({ device_id: deviceId })
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      spotify
        .play({ device_id: deviceId })
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        })
        .catch((err) => console.log(err));
    }
  };
  return (
    <>
      {isCurrent ? (
        <button
          className={buttontype[type].className}
          style={{ color: 'rgb(0, 255, 127)' }}
          onClick={handlePlayPause}
        >
          {playing ? (
            <PauseIcon
              fontSize="large"
              style={{ color: buttontype[type].color }}
            />
          ) : (
            <PlayArrowIcon
              fontSize="large"
              style={{ color: buttontype[type].color }}
            />
          )}
        </button>
      ) : (
        <button
          className={buttontype[type].className}
          style={{ color: 'rgb(0, 255, 127)' }}
          onClick={() => {
            playfromlist(index, list);
          }}
        >
          <PlayArrowIcon
            fontSize="large"
            style={{ color: buttontype[type].color }}
          />
        </button>
      )}
    </>
  );
}
export default PlayFromList;
