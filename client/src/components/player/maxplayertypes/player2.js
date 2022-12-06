import '../../styling/player2.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import VolumeDown from '@material-ui/icons/VolumeDown';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import KeyboardTwoToneIcon from '@material-ui/icons/KeyboardTwoTone';
import { getColor, getColorOnly, getImage } from '../../utils/helperFunctions';
import ShuffleBtn from '../../utils/shuffle';
import RepeatBtn from '../../utils/repeat';
import VolumeOff from '@material-ui/icons/VolumeOff';
import { useRef, useState } from 'react';
import MyDevices from '../mydevices';
import PlayerSlider1 from '../nowPlayingSlider/player-slider-1';
import { useDispatch, useSelector } from 'react-redux';
function MaxPlayer2({
  skipNext,
  skipPrevious,
  handlePlayPause,
  volume,
  changeVolume,
  setVolume,
  mutePlayer,
}) {
  const dispatch = useDispatch();
  const { current, playing, lyrics, isMuted } = useSelector(
    (state) => state.player
  );
  const { colorpalette } = useSelector(
    (state) => state.app
  );
  const { settings } = useSelector((state) => state.app);
  const [showLyrics, setShowLyrics] = useState(false);
  const imgRef = useRef();

  const handleKeyboard = () => {
    dispatch({
      type: 'TOGGLE_KEYBOARD',
      show: !settings.isKeyboard,
    });
  };
  const loadColors = () => {
    const max1 = document.querySelector('.max-player-2');
    if (!colorpalette) {
      max1.style.backgroundColor = `var(--max-player-1-bg)`;
    } else {
      let col = getColorOnly(imgRef);
      max1.style.backgroundColor = `rgba(${col[0]},${col[1]},${col[2]},0.7)`;
    }
  };

  const handleQueue = () => {
    dispatch({
      type: 'TOGGLE_QUEUE',
      show: !settings.isQueue,
    });
  };

  return (
    <div className="max-player-2">
      {current ? (
        <div className={'mp2-album-art'}>
          {showLyrics ? (
            <div className="mp2-lyric-div-outer">
              <img
                src={getImage(current?.album?.images, 'md')}
                alt="default-art"
                className="mp2-album-lyric"
                crossOrigin="anonymous"
              />
              <div className="mp2-lyrics-outer">
                <p className="mp2-lyrics-txt">{lyrics}</p>
              </div>
            </div>
          ) : (
            <img
              src={getImage(current?.album?.images, 'lg')}
              alt="default-art"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={loadColors}
            />
          )}
        </div>
      ) : (
        <div className={'default-art'}>
          <div className="default-art-outer">
            <img src={'/bg3.png'} alt="default-art" />
          </div>
        </div>
      )}

      <div className="mp2-controls">
        <div className="music-info">
          <div className="s-info">
            <div
              className={
                's-info-text ' + (current?.name.length > 30 && 'text-anim')
              }
            >
              <span className="np-name text-light">
                {current ? current.name : 'Music track'}
              </span>
              <div className="np-by-outer">
                <span className="np-by" style={{ color: 'wheat' }}>
                  {current
                    ? current?.track
                      ? 'by..'
                      : current?.artists.map(
                        (item, index) => (index ? ', ' : '') + item.name
                      )
                    : 'by..'}
                </span>
              </div>
            </div>
            <div className='lyric-btn-outer'>
              <button
                className={'lyrics-btn' + (showLyrics ? ' active' : '')}
                onClick={() => setShowLyrics(!showLyrics)}
              >
                LYRICS
              </button>
            </div>
          </div>

          <PlayerSlider1 />
        </div>
        <div className="d-lg-none d-flex justify-content-between">
          <MyDevices />
          <button className="t-btn me-4" onClick={handleQueue}>
            <QueueMusicIcon
              style={{
                color: settings.isQueue ? 'var(--main-theme)' : 'white',
              }}
            />
          </button>
        </div>
        <div className="controls d-flex justify-content-center mb-2 mb-lg-0">
          <div className="left-control d-lg-flex d-none">
            <MyDevices />
            <button className="t-btn" onClick={handleKeyboard}>
              <KeyboardTwoToneIcon
                style={{
                  color: settings.isKeyboard ? 'var(--main-theme)' : 'white',
                }}
              />
            </button>
            <button className="t-btn">
              <QueueMusicIcon
                style={{
                  color: settings.isQueue ? 'var(--main-theme)' : 'white',
                }}
                onClick={handleQueue}
              />
            </button>
          </div>
          <div className="mid-control">
            <ShuffleBtn />
            <button className="t-btn">
              <SkipPreviousTwoToneIcon
                onClick={skipPrevious}
                className="controls-icon"
                fontSize="large"
              />
            </button>
            <button className="main-play-container" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon fontSize="large" style={{ color: 'white' }} />
              ) : (
                <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
              )}
            </button>
            <button className="t-btn">
              <SkipNextTwoToneIcon
                onClick={skipNext}
                className="controls-icon"
                fontSize="large"
              />
            </button>
            <RepeatBtn />
          </div>
          <div className="right-control d-lg-flex d-none">
            <button className="t-btn me-2" onClick={mutePlayer}>
              {isMuted ? (
                <VolumeOff style={{ color: 'red' }} />
              ) : (
                <VolumeDown style={{ color: 'grey' }} />
              )}
            </button>

            <input
              type="range"
              className="range-2"
              min="0"
              max="100"
              value={volume}
              style={{
                width: '60%',
                background: `linear-gradient(90deg, var(--main-theme) ${volume}%, #fff 60%)`,
              }}
              onChange={(e) => setVolume(e.target.value)}
              onMouseUp={changeVolume}
              onKeyUp={changeVolume}
              onTouchEnd={changeVolume}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
export default MaxPlayer2;
