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
import { useState, useEffect, useRef } from 'react';
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

import {
  CircularInput,
  CircularTrack,
  CircularProgress,
  CircularThumb,
} from 'react-circular-input';
//React-circular-input circular slider
function MaxPlayer3({
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
  const [color, setColor] = useState();
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

  const handleSeeker = () => {
    var seekms = ((instance * 100 * current?.duration_ms) / 100).toFixed(0);
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

  return (
    <div id="max-player-1" className="max-player-1">
      <div className="music-info-player-3">
        <div className="s-info">
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
          <div className="circle-holder">
            <img
              src={getImage(current?.album?.images, 'lg')}
              alt="default-art"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => setColor(getColorOnly(imgRef))}
            />
            <CircularInput
              value={instance}
              onChange={setInstance}
              onChangeEnd={handleSeeker}
            >
              <CircularTrack strokeWidth={3} stroke="azure" />
              <CircularProgress
                stroke={
                  color ? `rgb(${color[0]},${color[1]},${color[2]})` : 'white'
                }
                strokeWidth={3}
              />
              <CircularThumb
                r={4}
                fill={
                  color ? `rgb(${color[0]},${color[1]},${color[2]})` : 'white'
                }
                stroke={`white`}
                strokeWidth={0.5}
              />
              <text
                x={100}
                y={194}
                textAnchor="middle"
                dy="0.1em"
                fontWeight="bolder"
                fontSize={10}
                fill="white"
                style={{ fontFamily: 'var(--font)', zIndex: 2 }}
              >
                {current
                  ? millisToMinutesAndSeconds(
                    ((instance * 100 * current?.duration_ms) / 100).toFixed(0)
                  ) +
                  '/' +
                  millisToMinutesAndSeconds(current.duration_ms)
                  : '00:00'}
              </text>
            </CircularInput>
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
                    : 'white',
                }}
              />
            </button>
            <button className="t-btn" onClick={handleQueue}>
              <QueueMusicIcon
                style={{
                  color: settings.isQueue
                    ? 'var(--main-theme)'
                    : 'white',
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
                style={{ color: 'white' }}
              />
            </button>
            <button className="main-play-container" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon
                  style={{ color: 'white' }}
                  fontSize="large"
                />
              ) : (
                <PlayArrowIcon
                  style={{ color: 'white' }}
                  fontSize="large"
                />
              )}
            </button>
            <button className="bg-transparent border-0">
              <SkipNextTwoToneIcon
                onClick={skipNext}
                className="controls-icon"
                fontSize="large"
                style={{ color: 'white' }}
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
                  : 'white',
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
}
export default MaxPlayer3;
