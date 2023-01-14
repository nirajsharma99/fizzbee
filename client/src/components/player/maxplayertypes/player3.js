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
import React, { useEffect, useState } from 'react';
import { getArtistNames, getImage } from '../../utils/helperFunctions';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { useDispatch, useSelector } from 'react-redux';
import { toggleKeyboard, toggleQueue } from '../../store/actions/app-actions';
import '../../styling/player.css';
import MaxPlayer3Slider from '../nowPlayingSlider/player-slider-3';
//Custom Circular slider build by Me
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
  const { current, playing, lyrics, isMuted } = useSelector(
    (state) => state.player
  );
  const { settings, colorpalette } = useSelector((state) => state.app);
  const artistNames = getArtistNames(current?.artists);
  const handle = useFullScreenHandle();
  const [fullS, setFullS] = useState(false);

  const handleKeyboard = () => {
    dispatch(toggleKeyboard(!settings.isKeyboard));
  };
  const handleQueue = () => {
    dispatch(toggleQueue(!settings.isQueue));
  };

  //fullscreen handle
  const handleFullScreen = () => {
    if (fullS) {
      setFullS(false);
      handle.exit();
    } else {
      setFullS(true);
      handle.enter();
    }
  };
  useEffect(() => {
    const listener = () => {
      if (!document.webkitIsFullScreen) {
        // Run code on exit
        setFullS(false);
      }
    };
    const shortcutListener = (e) => {
      //prevent eventlistener where not needed
      if (e.target.classList.contains('escapeEvent')) return;

      if (e.code === 'KeyF') {
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
    <FullScreen handle={handle}>
      <div id="max-player-1" className="max-player-1">
        {current && (
          <img
            src={getImage(current?.album?.images, 'lg')}
            alt="default-art"
            className="album-bg"
          />
        )}
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

          <MaxPlayer3Slider fullS={fullS} handleFullScreen={handleFullScreen} />
          <div className="controls d-flex justify-content-center pb-4">
            <div className="left-control">
              <MyDevices playerType={'maxPlayer3'} />
              <button className="t-btn" onClick={handleKeyboard}>
                <KeyboardOutlinedIcon
                  style={{
                    color: settings.isKeyboard
                      ? (colorpalette ? 'var(--col-thief)' : 'var(--main-theme)')
                      : 'white',
                  }}
                />
              </button>
            </div>
            <div className="mid-control">
              <ShuffleBtn playerType={'maxPlayer3'} />
              <button className="bg-transparent border-0">
                <SkipPreviousTwoToneIcon
                  onClick={skipPrevious}
                  className="controls-icon"
                  fontSize="large"
                  style={{ color: 'white' }}
                />
              </button>
              <button className="main-play-container"
                onClick={handlePlayPause}
                style={{
                  background: colorpalette ? 'var(--col-thief)' : '',
                  boxShadow: colorpalette ? 'none' : ''
                }}
              >
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
              <RepeatBtn playerType={'maxPlayer3'} />
            </div>
            <div className="right-control d-lg-flex d-none">
              <button className="t-btn me-2" onClick={mutePlayer}>
                {isMuted ? (
                  <VolumeOff style={{ color: 'red' }} />
                ) : (
                  <VolumeDown style={{ color: 'grey' }} />
                )}
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
    </FullScreen>

  );
}
export default MaxPlayer3;
