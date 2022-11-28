
import MyDevices from '../mydevices';
import React, { useState, useRef, useEffect } from 'react';
import {
  getImage,
  getColorOnly
} from '../../utils/helperFunctions';
import '../../styling/player4.css';
import PlayerSlider4 from '../nowPlayingSlider/player-slider-4';
import { useDispatch, useSelector } from 'react-redux';
import SwapHorizontalCircleTwoTone from '@material-ui/icons/SwapHorizontalCircleTwoTone';
import { toggleHandedness } from '../../store/actions/app-actions';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';

function MaxPlayer4({
  skipNext,
  skipPrevious,
  handlePlayPause,
  volume,
  changeVolume,
  setVolume,
  mutePlayer,
}) {
  const { current, lyrics } = useSelector(
    (state) => state.player
  );
  const { colorpalette } = useSelector(
    (state) => state.app
  );
  const { handedness } = useSelector((state) => state.app);
  const imgRef = useRef();
  const handle = useFullScreenHandle();
  const [showLyrics, setShowLyrics] = useState(false);
  const [fullS, setFullS] = useState(false);
  const dispatch = useDispatch();

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

  //toggle handedness
  const handleHandedness = () => {
    dispatch(toggleHandedness(!handedness));
  }

  //get colors
  const loadColors = () => {
    if (!colorpalette) {
      document.documentElement.style.setProperty(
        '--col-thief',
        `var(--main-theme)`
      );
      document.documentElement.style.setProperty(
        '--col-thief-bg-lite',
        `var(--main-theme-bg-lite)`
      );
    } else {
      let col = getColorOnly(imgRef);
      document.documentElement.style.setProperty(
        '--col-thief',
        `rgb(${col[0]},${col[1]},${col[2]})`
      );
      document.documentElement.style.setProperty(
        '--col-thief-bg-lite',
        `rgba(${col[0]},${col[1]},${col[2]},0.3)`
      );
    }
  };



  return (
    <FullScreen handle={handle}>
      <div
        id="max-player-1"
        className="max-player-1"
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
        <div className={"fullscreen-btns-p-4 " + (handedness ? 'left' : 'right')}>

          <button
            className="t-btn fs-btn"
            onClick={handleFullScreen}
            style={{ color: fullS ? 'var(--main-theme)' : 'white' }}
          >
            <ion-icon name="expand-outline"></ion-icon>
          </button>

          <MyDevices handedness={handedness} />
          <button className='t-btn' onClick={handleHandedness}>
            <SwapHorizontalCircleTwoTone
              style={{ color: 'var(--main-theme)' }}
            />
          </button>
        </div>
        {current ? (
          <div className={'album-art-p-4'}>
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
              <div className={'default-art'}>
                <img
                  src={getImage(current?.album?.images, 'md')}
                  alt="default-art"
                  crossOrigin="anonymous"
                  className='album-sm-4'
                />
              </div>
            )}
          </div>
        ) : (
          <div className={'default-art'}>
            <div className="default-art-outer">
              <img src={'/bg3.png'} alt="default-art" />
            </div>
          </div>
        )}
        <PlayerSlider4
          skipNext={skipNext}
          skipPrevious={skipPrevious}
          handlePlayPause={handlePlayPause}
          handedness={handedness} />
      </div>
    </FullScreen>
  );
}
export default MaxPlayer4;
