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
import React, { useState, useEffect, useRef } from 'react';
import {
  getImage,
  getColorOnly,
  millisToMinutesAndSeconds,
} from '../../utils/helperFunctions';
import FullScreenPlayer from './fullscreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../../store/actions/app-actions';
import useSpotify from '../../hooks/useSpotify';
import whyDidYouUpdate from 'why-did-you-update';

function MaxPlayer1New({
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
  const position_ms = useSelector((state) => state.player.position_ms);
  whyDidYouUpdate(React);
  const { settings } = useSelector((state) => state.app);
  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [angle, setAngle] = useState(0);
  const [showVol, setShowVol] = useState(false);
  const imgRef = useRef();
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

  const start = function (e) {
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };

  const move = (e) => {
    var posX, posY;
    if (e.buttons === 0) return;
    const target = document.getElementById('quad-1').getBoundingClientRect();
    let centerX = target.width + target.left;
    let centerY = target.height + target.top;
    if (e.type === 'touchmove') {
      posX = e.touches[0].pageX;
      posY = e.touches[0].pageY;
    } else {
      posX = e.pageX;
      posY = e.pageY;
    }
    let deltaY = centerY - posY;
    let deltaX = centerX - posX;
    setAngle(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
    if (angle > 90 || angle < 0) return;

    if (dragging) {
      document.getElementById('quad-2').style.transform = `rotate(${angle}deg)`;
      setInstance(angle / 90);
    }
    setDragging(true);
    e.stopPropagation();
    e.preventDefault();
  };
  const stop = function (e) {
    setDragging(false);
    if (dragging) {
      let seekTo = angle / 90;
      setInstance(seekTo);
      handleSeeker(seekTo);
    }
    e.stopPropagation();
    e.preventDefault();
  };

  const loadColors = () => {
    let col = getColorOnly(imgRef);
    document.documentElement.style.setProperty(
      '--col-thief',
      `rgb(${col[0]},${col[1]},${col[2]})`
    );
    document.documentElement.style.setProperty(
      '--col-thief-bg-lite',
      `rgba(${col[0]},${col[1]},${col[2]},0.2)`
    );
  };

  const toggleVol = () => {
    setShowVol(!showVol);
  };
  const hideVol = (e) => {
    const tagNames = ['svg', 'input', 'path'];
    if (!tagNames.includes(e.target.tagName)) setShowVol(false);
  };

  return (
    <div
      id="max-player-1"
      className="max-player-1"
      onClick={hideVol}
      onMouseUp={stop}
      onMouseMove={move}
      onTouchEnd={stop}
    >
      {current && (
        <img
          src={getImage(current?.album?.images, 'lg')}
          alt="default-art"
          className="album-bg"
          ref={imgRef}
          crossOrigin="anonymous"
          onLoad={loadColors}
        />
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
        </div>
      </div>
      <div className="fullscreen-btns-p1">
        <div className="right-control">
          <button className="t-btn" onClick={toggleVol}>
            {isMuted ? (
              <VolumeOff style={{ color: 'red' }} />
            ) : (
              <VolumeDown style={{ color: 'white' }} />
            )}
          </button>

          <input
            type="range"
            className="range-2"
            min="0"
            max="100"
            value={volume}
            style={{
              display: showVol ? '' : 'none',
              width: '60%',
              background: `linear-gradient(90deg, var(--main-theme) ${volume}%, #fff 60%)`,
            }}
            onChange={(e) => setVolume(e.target.value)}
            onMouseUp={changeVolume}
            onKeyUp={changeVolume}
            onTouchEnd={changeVolume}
          />
        </div>
        <MyDevices />
        <button className="t-btn fs-btn" onClick={handleFullScreen}>
          <ion-icon name="expand-outline"></ion-icon>
        </button>
      </div>
      {current ? (
        <div className={'album-art'}>
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
        <div className="quadrant">
          <div className="top-left-quarter-circle" id="quad-1"></div>
          <div
            className="top-left-quarter-circle"
            style={{ transform: `translateZ(1px) rotate(${instance * 90}deg)` }}
            id="quad-2"
            onMouseDown={start}
            onTouchStart={start}
            onMouseMove={move}
            onMouseUp={stop}
            onTouchMove={move}
            onTouchEnd={stop}
          >
            <div className="quad-seeker" id="quad-seeker"></div>
          </div>
          <div className="top-left-quarter-circle">
            <div className="quad-pp">
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
              <button className="quad-btn-l1 t-btn">
                <SkipNextTwoToneIcon
                  onClick={skipNext}
                  className="controls-icon"
                  fontSize="large"
                  style={{ color: 'var(--text-primary)' }}
                />
              </button>
              <button className="quad-btn-l1 t-btn">
                <SkipPreviousTwoToneIcon
                  onClick={skipPrevious}
                  className="controls-icon"
                  fontSize="large"
                  style={{ color: 'var(--text-primary)' }}
                />
              </button>
              <button className="quad-btn-l2 t-btn" onClick={handleQueue}>
                <QueueMusicIcon
                  style={{
                    color: settings.isQueue
                      ? 'var(--main-theme)'
                      : 'var(--text-primary)',
                  }}
                />
              </button>
              <div className="quad-btn-l2">
                <ShuffleBtn />
              </div>
              <div className="quad-btn-l2">
                <RepeatBtn />
              </div>
              <p className="text-timer timer-f">
                {current
                  ? millisToMinutesAndSeconds(
                      (instance * current.duration_ms).toFixed(0)
                    )
                  : '00:00'}
              </p>
              <p className="text-timer timer-t">
                {current
                  ? millisToMinutesAndSeconds(current.duration_ms)
                  : '00:00'}
              </p>
            </div>
          </div>
        </div>
        {/*<div className="extra-controls">
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
            </div>*/}
      </div>
    </div>
  );
}
export default MaxPlayer1New;
