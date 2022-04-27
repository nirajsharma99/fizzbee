import { useEffect, useState } from 'react';
import MaxPlayer1 from './maxplayertypes/player1';
import MaxPlayer2 from './maxplayertypes/player2';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../store/actions/app-actions';
import { handleVolume, setMute } from '../store/actions/spotify-actions';
import MaxPlayer3 from './maxplayertypes/player3';
import MaxPlayer3Test from './maxplayertypes/player3custom';

function MaxPlayer({ skipNext, skipPrevious, handlePlayPause, minPlayer }) {
  const [volume, setVolume] = useState(100);
  const dispatch = useDispatch();
  const { isMuted, maxplayertype } = useSelector((state) => state.player);
  const { settings } = useSelector((state) => state.app);

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
        navigateVolume(10);
      }
      if (event.code === 'ArrowDown') {
        navigateVolume(-10);
      }
      if (event.code === 'KeyH') {
        dispatch(toggleKeyboard(!settings.isKeyboard));
      }
      if (event.code === 'KeyQ') {
        dispatch(toggleQueue(!settings.isQueue));
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });

  const changeVolume = () => {
    handleVolume(volume);
  };
  const navigateVolume = (change) => {
    if (change > 0) {
      if (volume <= 90) {
        let newVolume = parseInt(volume) + parseInt(change);
        setVolume(newVolume);
        handleVolume(newVolume);
      } else {
        setVolume(100);
        handleVolume(100);
      }
    } else {
      if (volume > 10) {
        let newVolume = parseInt(volume) + parseInt(change);
        setVolume(newVolume);
        handleVolume(newVolume);
      } else {
        setVolume(0);
        handleVolume(0);
      }
    }
  };

  const mutePlayer = () => {
    dispatch(setMute(isMuted, volume));
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
          <MaxPlayer3Test
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
