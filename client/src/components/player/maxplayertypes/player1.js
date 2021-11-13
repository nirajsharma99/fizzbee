import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import VolumeDown from '@material-ui/icons/VolumeDown';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import KeyboardOutlinedIcon from '@material-ui/icons/KeyboardOutlined';
import Grid from '@material-ui/core/Grid';
import NowPlayingSlider from '../nowplayingslider';
import ShuffleBtn from '../../utils/shuffle';
import RepeatBtn from '../../utils/repeat';
import VolumeOff from '@material-ui/icons/VolumeOff';
import MyDevices from '../mydevices';
import { useState } from 'react';

function MaxPlayer1({
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
  const [{ current, playing, lyrics, isMuted, settings }, dispatch] =
    useDataHandlerValue();

  const [showLyrics, setShowLyrics] = useState(false);

  //console.log(lyrics);

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
    <div id="max-player-1" className="max-player-1">
      {current ? (
        <div className={'album-art'}>
          {showLyrics ? (
            <div>
              <img
                src={current ? current?.album?.images?.[0].url : 'bg3.png'}
                alt="default-art"
                className="album-bg"
              />
              <div className="lyric-div-outer">
                <img
                  src={current ? current?.album?.images?.[1].url : 'bg3.png'}
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
            <div className="w-100">
              <img
                src={current ? current?.album?.images?.[0].url : 'bg3.png'}
                alt="default-art"
                className="album-bg"
              />
              <img
                src={current ? current?.album?.images?.[1].url : 'bg3.png'}
                alt="default-art"
                className="album-sm"
                crossOrigin="anonymous"
              />
            </div>
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

      <div className="music-info">
        <div className="s-info">
          <div className="s-info-text">
            <span className="np-name d-flex">
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
      <div className="controls d-flex justify-content-center pb-4">
        <div className="left-control d-lg-flex d-none">
          <MyDevices />
          <button className="t-btn" onClick={handleKeyboard}>
            <KeyboardOutlinedIcon
              style={{
                color: settings.isKeyboard ? 'var(--main-theme)' : 'white',
              }}
            />
          </button>
          <button className="t-btn" onClick={handleQueue}>
            <QueueMusicIcon
              style={{
                color: settings.isQueue ? 'var(--main-theme)' : 'white',
              }}
            />
          </button>
        </div>
        <div className="mid-control">
          <ShuffleBtn />
          <button className="bg-transparent border-0">
            <NavigateBeforeIcon
              onClick={skipPrevious}
              className="controls-icon"
              fontSize="large"
            />
          </button>
          <button className="play-container" onClick={handlePlayPause}>
            {playing ? (
              <PauseIcon style={{ color: 'white' }} fontSize="large" />
            ) : (
              <PlayArrowIcon style={{ color: 'white' }} fontSize="large" />
            )}
          </button>
          <button className="bg-transparent border-0">
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
                    <VolumeDown style={{ color: 'grey' }} />
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
  );
}
export default MaxPlayer1;
