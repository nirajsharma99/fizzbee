import { useDataHandlerValue } from '../contextapi/DataHandler';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import MaxPlayer1 from './maxplayertypes/player1';
import MaxPlayer2 from './maxplayertypes/player2';
import MaxPlayer3 from './maxplayertypes/player3';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function MaxPlayer({ skipNext, skipPrevious, handlePlayPause, minPlayer }) {
  const [volume, setVolume] = useState(100);
  const [{ isMuted, maxplayertype, token, settings }, dispatch] =
    useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');

  spotify.setAccessToken(accessToken);

  useEffect(() => {
    const listener = (event) => {
      if (event.target.classList.contains('escapeEvent')) return;

      if (event.code === 'KeyP') {
        handlePlayPause();
      }
      if (event.code === 'KeyX') {
        skipNext();
      }
      if (event.code === 'KeyZ') {
        skipPrevious();
      }
      if (event.code === 'KeyM') {
        mutePlayer();
      }
      if (event.code === 'ArrowUp') {
        increaseVolume();
      }
      if (event.code === 'ArrowDown') {
        decreaseVolume();
      }
      if (event.code === 'KeyH') {
        dispatch({
          type: 'TOGGLE_KEYBOARD',
          show: !settings.isKeyboard,
        });
      }
      if (event.code === 'KeyQ') {
        dispatch({
          type: 'TOGGLE_QUEUE',
          show: !settings.isQueue,
        });
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });
  const changeVolume = () => {
    spotify
      .setVolume(volume)
      .then(function () {
        //console.log('changing value');
      })
      .catch((err) => console.log(err));
  };
  const increaseVolume = () => {
    console.log('volume', volume);
    if (volume < 90) {
      setVolume(volume + 10);
      spotify
        .setVolume(volume + 10)
        .then(function () {
          //console.log('changing value');
        })
        .catch((err) => console.log(err));
    }
  };
  const decreaseVolume = () => {
    if (volume > 10) {
      setVolume(volume - 10);
      spotify
        .setVolume(volume - 10)
        .then(function () {
          console.log('changing value');
        })
        .catch((err) => console.log(err));
    }
  };
  const mutePlayer = () => {
    spotify
      .setVolume(!isMuted ? 0 : volume)
      .then(function () {
        dispatch({
          type: 'SET_MUTED',
          isMuted: !isMuted,
        });
        console.log(isMuted ? 'Muted..' : 'Unmute');
      })
      .catch((err) => console.log(err));
  };

  const maxType = () => {
    switch (maxplayertype) {
      case 0:
        return (
          <MaxPlayer1
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            volume={volume}
            setVolume={setVolume}
            changeVolume={changeVolume}
            mutePlayer={mutePlayer}
          />
        );
      case 1:
        return (
          <MaxPlayer2
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            volume={volume}
            setVolume={setVolume}
            changeVolume={changeVolume}
            mutePlayer={mutePlayer}
          />
        );
      case 2:
        return (
          <MaxPlayer3
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            volume={volume}
            setVolume={setVolume}
            changeVolume={changeVolume}
            mutePlayer={mutePlayer}
          />
        );

      default:
        console.log('Error');
        break;
    }
  };
  return <div hidden={minPlayer}>{maxType()}</div>;
}
export default MaxPlayer;
