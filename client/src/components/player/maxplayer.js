import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { useRef, useEffect, useState } from 'react';
import NowPlayingSlider from './nowplayingslider';
import SpotifyWebApi from 'spotify-web-api-node';
import ShuffleBtn from '../utlil/shuffle';
import RepeatBtn from '../utlil/repeat';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const token = window.localStorage.getItem('token');
const useStyles = makeStyles((theme) => ({
  root: {
    width: 120 + theme.spacing(3) * 2,
  },
  margin: {
    height: theme.spacing(3),
  },
}));
const PrettoSlider = withStyles({
  root: {
    color: '#52af77',
    height: 8,
  },
  thumb: {
    height: 18,
    width: 18,
    backgroundColor: '#fff',
    border: '2px solid currentColor',
    marginTop: -5,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% - 2px)',
  },
  track: {
    height: 8,
    borderRadius: 4,
  },
  rail: {
    height: 8,
    borderRadius: 4,
  },
})(Slider);

function MaxPlayer({
  bg,
  skipNext,
  skipPrevious,
  handlePlayPause,

  minPlayer,
}) {
  const classes = useStyles();
  const canvas = useRef();
  const [volume, setVolume] = useState(20);
  const [{ item, playing, isMuted }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);

  useEffect(() => {
    const listener = (event) => {
      if (event.code === 'KeyP') {
        handlePlayPause();
      }
      if (event.code === 'KeyX') {
        skipNext();
      }
      if (event.code === 'KeyZ') {
        skipPrevious();
      }
      if (event.code === 'KeyM') {
        mutePlayer();
      }
    };
    document.addEventListener('keydown', listener);
    return () => {
      document.removeEventListener('keydown', listener);
    };
  });
  const changeVolume = (newvalue) => {
    setVolume(newvalue);
    spotify
      .setVolume(newvalue)
      .then(function () {
        console.log('changing value');
      })
      .catch((err) => console.log(err));
  };
  const mutePlayer = () => {
    dispatch({
      type: 'SET_MUTED',
      isMuted: !isMuted,
    });
    spotify
      .setVolume(isMuted ? 0 : volume)
      .then(function () {
        console.log(isMuted ? 'Muted..' : 'Unmute');
      })
      .catch((err) => console.log(err));
  };
  /*document.body.style.background = `black url(${item?.album?.images?.[2].url}) no-repeat  center center `;
  document.body.style.backgroundSize = 'cover';*/
  return (
    <div hidden={minPlayer}>
      {item ? (
        <div className={'album-art'}>
          <div className="w-100">
            <img
              src={item ? item?.album?.images?.[2].url : bg}
              alt="default-art"
              className="album-bg"
            />
            <img
              src={item ? item?.album?.images?.[0].url : bg}
              alt="default-art"
              className="album-sm"
            />
          </div>
        </div>
      ) : (
        <div className={'default-art'}>
          <div className="default-art-outer">
            <img
              src={item ? item?.album?.images?.[1].url : bg}
              alt="default-art"
            />

            {/*<div className="vz-wrapper">
            <div className="vz-wrapper -canvas">
              <canvas
                ref={canvas}
                id="myCanvas"
                width="500"
                height="200"
              ></canvas>
            </div>
          </div>*/}
          </div>
        </div>
      )}

      <div className="music-info">
        <div className="s-info">
          {item ? <span className="np-name"> {item.name}</span> : 'Music track'}
          <div className="np-by-outer">
            <span className="np-by">
              {item
                ? item?.track
                  ? 'by..'
                  : item?.artists.map(
                      (item, index) => (index ? ', ' : '') + item.name
                    )
                : 'by..'}
            </span>
          </div>
        </div>

        <NowPlayingSlider />
      </div>
      <div className="controls d-flex justify-content-center mb-4">
        <div className="left-control d-lg-flex d-none"></div>
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
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
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
                <VolumeDown />
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
              <Grid item>
                <VolumeUp />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
}
export default MaxPlayer;
