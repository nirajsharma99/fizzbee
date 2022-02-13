import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import VolumeDown from '@material-ui/icons/VolumeDown';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import ShuffleBtn from '../../utils/shuffle';
import RepeatBtn from '../../utils/repeat';
import VolumeOff from '@material-ui/icons/VolumeOff';
import MyDevices from '../mydevices';
import { useState, useEffect } from 'react';
import { getImage } from '../../utils/helperFunctions';
import FullScreenPlayer from './fullscreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import PlayerSlider1 from '../nowPlayingSlider/player-slider-1';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../../store/actions/app-actions';

function MaxPlayer1({
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
  const { settings } = useSelector((state) => state.app);

  const [showLyrics, setShowLyrics] = useState(false);
  const [fullS, setFullS] = useState(false);
  const handle = useFullScreenHandle();

  //console.log(lyrics);

  const handleKeyboard = () => {
    dispatch(toggleKeyboard(!settings.isKeyboard));
  };
  const handleQueue = () => {
    dispatch(toggleQueue(!settings.isQueue));
  };
  const handleFullScreen = () => {
    setFullS(true);
    handle.enter();
  };

  useEffect(() => {
    const listener = () => {
      if (!document.webkitIsFullScreen) {
        // Run code on exit
        setFullS(false);
      }
    };

    const shortcutListener = (e) => {
      if (e.target.classList.contains('escapeEvent')) return;

      if (e.code === 'KeyF' && !fullS) {
        handleFullScreen();
      }
    };

    document.addEventListener('fullscreenchange', listener, false);
    document.addEventListener('keydown', shortcutListener);

    return () => {
      document.removeEventListener('fullscreenchange', listener, false);
      document.removeEventListener('keydown', shortcutListener);
    };
  });

  return (
    <div id="max-player-1" className="max-player-1">
      {current ? (
        <div className={'album-art'}>
          <div className="fullscreen-btns">
            <button className="t-btn fs-btn" onClick={handleFullScreen}>
              <ion-icon name="expand-outline"></ion-icon>
            </button>
          </div>
          {showLyrics ? (
            <div>
              <img
                src={getImage(current?.album?.images, 'lg')}
                alt="default-art"
                className="album-bg"
              />
              <div className="lyric-div-outer">
                <img
                  src={getImage(current?.album?.images, 'md')}
                  alt="default-art"
                  className="album-lyric"
                  crossOrigin="anonymous"
                />
                <div className="lyrics-outer">
                  <p className="lyrics-txt">{lyrics}</p>
                </div>
              </div>
            </div>
          ) : (
            <FullScreen handle={handle} className="album-art w-100">
              <FullScreenPlayer
                handlePlayPause={handlePlayPause}
                skipNext={skipNext}
                skipPrevious={skipPrevious}
                fullS={fullS}
                setFullS={setFullS}
              />
            </FullScreen>
          )}
        </div>
      ) : (
        <div className={'default-art'}>
          <div className="default-art-outer">
            <img src={'/bg3.png'} alt="default-art" />
          </div>
        </div>
      )}

      <div className="music-info">
        <div className="s-info">
          <div
            className={
              's-info-text ' + (current?.name.length > 30 && 'text-anim')
            }
          >
            <span className={'np-name'}>
              {current ? current.name : 'Music track'}
            </span>
            <div className="np-by-outer">
              <span className="np-by">
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
          <div>
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
      <div className="extra-controls">
        <MyDevices />
        <button className="t-btn me-4" onClick={handleQueue}>
          <QueueMusicIcon
            style={{
              color: settings.isQueue
                ? 'var(--main-theme)'
                : 'var(--text-primary)',
            }}
          />
        </button>
      </div>
      <div className="controls d-flex justify-content-center pb-4">
        <div className="left-control">
          <MyDevices />
          <button className="t-btn" onClick={handleKeyboard}>
            <KeyboardOutlinedIcon
              style={{
                color: settings.isKeyboard
                  ? 'var(--main-theme)'
                  : 'var(--text-primary)',
              }}
            />
          </button>
          <button className="t-btn" onClick={handleQueue}>
            <QueueMusicIcon
              style={{
                color: settings.isQueue
                  ? 'var(--main-theme)'
                  : 'var(--text-primary)',
              }}
            />
          </button>
        </div>
        <div className="mid-control">
          <ShuffleBtn />
          <button className="bg-transparent border-0">
            <SkipPreviousTwoToneIcon
              onClick={skipPrevious}
              className="controls-icon"
              fontSize="large"
              style={{ color: 'var(--text-primary)' }}
            />
          </button>
          <button className="main-play-container" onClick={handlePlayPause}>
            {playing ? (
              <PauseIcon
                style={{ color: 'var(--text-primary)' }}
                fontSize="large"
              />
            ) : (
              <PlayArrowIcon
                style={{ color: 'var(--text-primary)' }}
                fontSize="large"
              />
            )}
          </button>
          <button className="bg-transparent border-0">
            <SkipNextTwoToneIcon
              onClick={skipNext}
              className="controls-icon"
              fontSize="large"
              style={{ color: 'var(--text-primary)' }}
            />
          </button>
          <RepeatBtn />
        </div>
        <div className="right-control">
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
  );
}
export default MaxPlayer1;
