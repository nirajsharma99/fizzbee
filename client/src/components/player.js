import UtubeApp from './youtube/components/utube-app';
import SwitchPlatform from './youtube/youtube-switch';
import MinPlayer from './player/minPlayer';
import MaxPlayer from './player/maxplayer';
import { useState } from 'react';
import useSpotify from './hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setPlaying } from './store/actions/player-actions';
import {
  handlePlayPause,
  handleSkipNext,
  handleSkipPrev,
} from './store/actions/spotify-actions';

function Player() {
  const dispatch = useDispatch();
  const { deviceId, playing, sideBartype } = useSelector((state) => state.player);
  const [minPlayer, setMinPlayer] = useState(true);
  const [utubeMode, setUtubeMode] = useState(false);
  const spotify = useSpotify();

  const handleSwitch = () => {
    setUtubeMode(!utubeMode);
    if (playing) {
      spotify
        .pause({ device_id: deviceId })
        .then(() => {
          dispatch(setPlaying(false));
        })
        .catch((err) => console.log(err));
    }
  };

  const skipNext = () => {
    dispatch(handleSkipNext());
  };
  const skipPrevious = () => {
    dispatch(handleSkipPrev());
  };
  const handlePlay = () => {
    dispatch(handlePlayPause());
  };

  const maxPlayer = (e) => {
    const tagNames = ['svg', 'path', 'button'];
    const classNames = ['island', 'mini-island', 'island-controls', 'dynamic-island', 'island-s-info']; //prevent dynamic island expansion
    if (!tagNames.includes(e.target.tagName) && !classNames.includes(e.target.parentNode.className)) {
      setMinPlayer(!minPlayer);
    }
  };

  return (
    <>
      {!utubeMode && (
        <div className={(minPlayer ? 'min-music-player' : 'music-player') + (minPlayer === 4 ? '' : ' min-pos')}>
          {!minPlayer && (
            <div className="switch-btns">
              <SwitchPlatform
                utubeMode={utubeMode}
                handleSwitch={handleSwitch}
              />

              <button
                className="ms-2 mp-toggle"
                onClick={() => setMinPlayer(!minPlayer)}
              >
                <ion-icon name="chevron-down-outline"></ion-icon>
              </button>
            </div>
          )}

          <MaxPlayer
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            handlePlayPause={handlePlay}
            minPlayer={minPlayer}
            setMinPlayer={setMinPlayer}
          />
        </div>
      )}
      {utubeMode && (
        <UtubeApp handleSwitch={handleSwitch} utubeMode={utubeMode} />
      )}
      <MinPlayer
        maxPlayer={maxPlayer}
        handlePlayPause={handlePlay}
        skipNext={skipNext}
        skipPrevious={skipPrevious}
        minPlayer={minPlayer}
        setMinPlayer={setMinPlayer}
      />
    </>
  );
}
export default Player;
