import UtubeApp from './youtube/components/utube-app';
import SwitchPlatform from './youtube/youtube-switch';
import MinPlayer from './player/minPlayer';
import MaxPlayer from './player/maxplayer';
import { useDataHandlerValue } from './contextapi/DataHandler';
import { useState } from 'react';
import useSpotify from './hooks/useSpotify';

function Player() {
  const [{ deviceId, playing }, dispatch] = useDataHandlerValue();
  const [minPlayer, setMinPlayer] = useState(true);
  const [utubeMode, setUtubeMode] = useState(false);
  const spotify = useSpotify();

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

  const handleSwitch = () => {
    setUtubeMode(!utubeMode);
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
    }
  };

  const skipNext = () => {
    spotify
      .skipToNext({ device_id: deviceId })
      .then(() => {
        console.log('Playing next..');
      })
      .catch((err) => console.log(err));
  };

  const skipPrevious = () => {
    spotify
      .skipToPrevious({
        device_id: deviceId,
      })
      .then(() => {
        console.log('Playing previous song..');
      })
      .catch((err) => console.log(err));
  };

  const maxPlayer = (e) => {
    const tagNames = ['svg', 'path', 'button'];
    if (!tagNames.includes(e.target.tagName)) {
      setMinPlayer(!minPlayer);
    }
  };

  return (
    <>
      {!utubeMode && (
        <div className={minPlayer ? 'min-music-player' : 'music-player'}>
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
            handlePlayPause={handlePlayPause}
            minPlayer={minPlayer}
          />
        </div>
      )}
      {utubeMode && (
        <UtubeApp handleSwitch={handleSwitch} utubeMode={utubeMode} />
      )}
      <MinPlayer
        maxPlayer={maxPlayer}
        handlePlayPause={handlePlayPause}
        skipNext={skipNext}
        skipPrevious={skipPrevious}
        minPlayer={minPlayer}
      />
    </>
  );
}
export default Player;
