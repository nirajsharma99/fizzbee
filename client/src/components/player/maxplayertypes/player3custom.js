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
import React from 'react';
import { getArtistNames } from '../../utils/helperFunctions';
import FullScreenPlayer from './fullscreen';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../../store/actions/app-actions';
import '../../styling/player.css';
import MaxPlayer3Slider from '../nowPlayingSlider/player-slider-3';
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
  const { current, playing, lyrics, isMuted } = useSelector(
    (state) => state.player
  );
  const { settings } = useSelector((state) => state.app);

  const artistNames = getArtistNames(current?.artists);

  const handleKeyboard = () => {
    dispatch(toggleKeyboard(!settings.isKeyboard));
  };
  const handleQueue = () => {
    dispatch(toggleQueue(!settings.isQueue));
  };

  return (
    <div id="max-player-1" className="max-player-1">
      <div className="music-info-player-3">
        <div className="s-info py-2">
          <div className={'s-info-text'}>
            <span
              className={
                'np-name-p-3 ' + (current?.name.length > 30 && 'text-anim')
              }
            >
              {current ? current.name : 'Music track'}
            </span>
            <div className="np-by-outer">
              <span
                className={
                  'np-by-p-3 ' + (artistNames?.length > 50 && 'text-anim')
                }
              >
                {current ? (current?.track ? 'by..' : artistNames) : 'by..'}
              </span>
            </div>
          </div>
        </div>

        <MaxPlayer3Slider />
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
