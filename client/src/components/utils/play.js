import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import { buttontype } from './buttontype';
import React from 'react';
import useSpotify from '../hooks/useSpotify';

function Play({ uri, item, type }) {
  const [{ deviceId, current, playing }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  const isCurrent = current?.uri === uri;

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
          list: [item],
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
          onClick={handlePlayPause}
        >
          {playing ? (
            <PauseIcon fontSize="large" style={{ color: 'white' }} />
          ) : (
            <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
          )}
        </button>
      ) : (
        <button
          className={buttontype[type].className}
          onClick={() => {
            play(uri);
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
export default Play;
