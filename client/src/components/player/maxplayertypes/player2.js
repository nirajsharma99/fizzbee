import './player2.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import VolumeDown from '@material-ui/icons/VolumeDown';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import KeyboardTwoToneIcon from '@material-ui/icons/KeyboardTwoTone';
import Grid from '@material-ui/core/Grid';
import { getColor } from '../../utils/helperFunctions';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import NowPlayingSlider from '../nowplayingslider';
import ShuffleBtn from '../../utils/shuffle';
import RepeatBtn from '../../utils/repeat';
import VolumeOff from '@material-ui/icons/VolumeOff';
import { useRef, useState } from 'react';
import MyDevices from '../mydevices';
function MaxPlayer2({
  skipNext,
  skipPrevious,
  handlePlayPause,
  volume,
  changeVolume,
  setVolume,
  classes,
  mutePlayer,
  PrettoSlider,
}) {
  const [{ current, playing, lyrics, settings, isMuted }, dispatch] =
    useDataHandlerValue();
  const [showLyrics, setShowLyrics] = useState(false);
  const imgRef = useRef();

  const handleKeyboard = () => {
    dispatch({
      type: 'TOGGLE_KEYBOARD',
      show: !settings.isKeyboard,
    });
  };

  const handleQueue = () => {
    dispatch({
      type: 'TOGGLE_QUEUE',
      show: !settings.isQueue,
    });
  };

  return (
    <div className="max-player-2" id="max-player-2">
      {current ? (
        <div className={'mp2-album-art'}>
          {showLyrics ? (
            <div className="mp2-lyric-div-outer">
              <img
                src={current ? current?.album?.images?.[0].url : 'bg3.png'}
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
              src={current ? current?.album?.images?.[0].url : 'bg3.png'}
              alt="default-art"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => getColor(current?.id, imgRef, 'max-player-2')}
            />
          )}
        </div>
      ) : (
        <div className={'default-art'}>
          <div className="default-art-outer">
            <img
              src={current ? current?.album?.images?.[1].url : 'bg3.png'}
              alt="default-art"
            />
          </div>
        </div>
      )}

      <div className="mp2-controls">
        <div className="music-info">
          <div className="s-info">
            <div>
              <span className="np-name">
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

          <NowPlayingSlider />
        </div>
        <div className="d-lg-none d-flex justify-content-between">
          <MyDevices />
          <button className="t-btn me-4" onClick={handleQueue}>
            <QueueMusicIcon
              style={{
                color: settings.isQueue ? 'rgb(0, 255, 127)' : 'white',
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
                  color: settings.isKeyboard ? 'rgb(0, 255, 127)' : 'white',
                }}
              />
            </button>
            <button className="t-btn">
              <QueueMusicIcon
                style={{
                  color: settings.isQueue ? 'rgb(0, 255, 127)' : 'white',
                }}
                onClick={handleQueue}
              />
            </button>
          </div>
          <div className="mid-control">
            <ShuffleBtn />
            <button className="t-btn">
              <NavigateBeforeIcon
                onClick={skipPrevious}
                className="controls-icon"
                fontSize="large"
              />
            </button>
            <button className="play-container" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon fontSize="large" style={{ color: 'white' }} />
              ) : (
                <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
              )}
            </button>
            <button className="t-btn">
              <NavigateNextIcon
                onClick={skipNext}
                className="controls-icon"
                fontSize="large"
              />
            </button>
            <RepeatBtn />
          </div>
          <div className="right-control d-lg-flex d-none">
            <div className={classes.root}>
              <Grid container spacing={1} alignItems="center">
                <Grid item>
                  <button className="t-btn" onClick={mutePlayer}>
                    {isMuted ? (
                      <VolumeOff style={{ color: 'red' }} />
                    ) : (
                      <VolumeDown style={{ color: 'white' }} />
                    )}
                  </button>
                </Grid>
                <Grid item xs>
                  <PrettoSlider
                    value={volume}
                    onChange={(e, newvalue) => setVolume(newvalue)}
                    onChangeCommitted={(e, newvalue) => changeVolume(newvalue)}
                    valueLabelDisplay="auto"
                    aria-label="pretto slider"
                  />
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MaxPlayer2;
