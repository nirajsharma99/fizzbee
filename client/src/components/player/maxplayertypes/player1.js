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
import { getImage, pauseEvent } from '../../utils/helperFunctions';
import FullScreenPlayer from './fullscreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import PlayerSlider1 from '../nowPlayingSlider/player-slider-1';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../../store/actions/app-actions';
import useSpotify from '../../hooks/useSpotify';

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
  const { current, playing, lyrics, position_ms, isMuted } = useSelector(
    (state) => state.player
  );
  const { settings } = useSelector((state) => state.app);
  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  var angle;
  const spotify = useSpotify();
  useEffect(() => {
    if (!current) return;
    setInstance(pos / current.duration_ms);
  }, [pos]);
  useEffect(() => {
    setPos(position_ms);
  }, [position_ms]);

  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setPos((pos) => pos + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [playing]);

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

  const start = function (e) {
    setDragging(true);
  };

  const move = (e) => {
    var touch;
    pauseEvent(e);
    if (e.buttons === 0) return;
    if (e?.touches?.[0]) touch = e?.touches[0];
    const target = document.getElementById('quad-1').getBoundingClientRect();
    let centerX = target.width + target.left;
    let centerY = target.height + target.top;
    let posX = e.pageX ? e.pageX : touch?.pageX;
    let posY = e.pageY ? e.pageY : touch?.pageY;
    let deltaY = centerY - posY;
    let deltaX = centerX - posX;
    angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    console.log(angle);
    if (angle > 90) return;

    if (dragging) {
      document.getElementById('quad-2').style.transform = `rotate(${angle}deg)`;
      //setInstance(angle / 360);
      console.log(angle);
    }
    setDragging(true);
  };
  const stop = function () {
    setDragging(false);
    if (dragging) {
      let seekTo = angle / 90;
      setInstance(seekTo);
      handleSeeker(seekTo);
    }
  };
  const handleSeeker = (seekTo) => {
    var seekms = (seekTo * current?.duration_ms).toFixed(0);
    spotify
      .seek(seekms)
      .then(function () {
        //console.log('Seek to ' + instance);
      })
      .catch(function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  };
  return (
    <div id="max-player-1" className="max-player-1">
      {current && (
        <img
          src={getImage(current?.album?.images, 'lg')}
          alt="default-art"
          className="album-bg"
        />
      )}
      {current ? (
        <div className={'album-art'}>
          <div className="fullscreen-btns">
            <button className="t-btn fs-btn" onClick={handleFullScreen}>
              <ion-icon name="expand-outline"></ion-icon>
            </button>
          </div>
          {showLyrics ? (
            <div>
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
      <div style={{ zIndex: 1 }}>
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
    </div>
  );
}
export default MaxPlayer1;
