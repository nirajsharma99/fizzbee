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
import '../../styling/player.css';
import useSpotify from '../../hooks/useSpotify';
//Custom Circular slider build by Me
function MaxPlayer3Test({
  skipNext,
  skipPrevious,
  handlePlayPause,
  volume,
  changeVolume,
  setVolume,
  mutePlayer,
}) {
  const dispatch = useDispatch();
  const { current, playing, position_ms, lyrics, isMuted } = useSelector(
    (state) => state.player
  );
  const { settings } = useSelector((state) => state.app);

  const spotify = useSpotify();

  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const imgRef = useRef();

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

  const handleKeyboard = () => {
    dispatch(toggleKeyboard(!settings.isKeyboard));
  };
  const handleQueue = () => {
    dispatch(toggleQueue(!settings.isQueue));
  };

  const [dragging, setDragging] = useState(false);
  var angle;

  const start = function (e) {
    setDragging(true);
  };

  const move = (e) => {
    if (e.buttons === 0) return;
    const target = document.getElementById('dot').getBoundingClientRect();
    let centerX = target.width / 2 + target.left;
    let centerY = target.height / 2 + target.top;
    let posX = e.pageX;
    let posY = e.pageY;
    let deltaY = centerY - posY;
    let deltaX = centerX - posX;
    angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle -= 90;
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = Math.round(angle);

    if (dragging) {
      document.getElementById(
        'dot-seeker'
      ).style.transform = `rotate(${+angle}deg)`;
      setInstance(angle / 360);
    }
    setDragging(true);
  };
  const stop = function () {
    setDragging(false);
    if (dragging) {
      console.log('dragging', dragging);

      let seekTo = angle / 360;
      setInstance(seekTo);
      handleSeeker(seekTo);
    }
  };

  return (
    <div id="max-player-1" className="max-player-1">
      <div className="music-info-player-3">
        <div className="s-info py-2">
          <div
            className={
              's-info-text ' + (current?.name.length > 30 && 'text-anim')
            }
          >
            <span className="np-name-p-3 ">
              {current ? current.name : 'Music track'}
            </span>
            <div className="np-by-outer">
              <span className="np-by-p-3">
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

        <div className="circular-slider-cont">
          <div className="circling">
            {current && (
              <img
                className="player-3-album"
                src={getImage(current?.album?.images, 'lg')}
                alt="default-art"
                ref={imgRef}
                crossOrigin="anonymous"
                onLoad={() => {
                  let col = getColorOnly(imgRef);
                  document.documentElement.style.setProperty(
                    '--col-thief',
                    `rgb(${col[0]},${col[1]},${col[2]})`
                  );
                }}
              />
            )}
            <div
              className="dots dot"
              id="dot"
              onMouseDown={start}
              onTouchStart={start}
              onMouseMove={move}
              onMouseUp={stop}
              onTouchMove={move}
              onTouchEnd={stop}
            >
              <div
                className="dot-seeker"
                id="dot-seeker"
                style={{ transform: `rotate(${instance * 360}deg)` }}
              ></div>
            </div>
            <div className="p-3-dur">
              {current ? (
                <>
                  <span className="h1" style={{ width: '75px' }}>
                    {millisToMinutesAndSeconds(
                      ((instance * 100 * current?.duration_ms) / 100).toFixed(0)
                    )}
                  </span>
                  <span className="h5">
                    {'/' + millisToMinutesAndSeconds(current.duration_ms)}
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
            <svg width="200" height="200" viewBox="0 0 200 200">
              <circle cx="100" cy="100" r="100"></circle>
              <circle
                cx="100"
                cy="100"
                r="100"
                style={{
                  strokeDasharray: 6.2831 * 100,
                  strokeDashoffset:
                    6.2831 * 100 - (6.2831 * 100 * instance * 100) / 100,
                }}
              ></circle>
            </svg>
          </div>
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
        <div className="d-lg-none d-flex justify-content-between">
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
      </div>
    </div>
  );
}
export default MaxPlayer3Test;
