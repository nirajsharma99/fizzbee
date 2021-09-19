import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import ShuffleIcon from '@material-ui/icons/Shuffle';
import RepeatIcon from '@material-ui/icons/Repeat';
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { useRef, useState } from 'react';
import NowPlayingSlider from './nowplayingslider';
import SpotifyWebApi from 'spotify-web-api-node';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

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
  handlePlayPause,
  skipPrevious,
  token,
  pos,
  minPlayer,
}) {
  const classes = useStyles();
  const canvas = useRef();
  const [volume, setVolume] = useState(20);
  const [{ item, playing }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);

  const changeVolume = (newvalue) => {
    setVolume(newvalue);
    spotify
      .setVolume(newvalue)
      .then(function () {
        console.log('changing value');
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
            {item
              ? item?.artists.map((x, index) => (
                  <span key={index} className="np-by">
                    {x.name}
                    {' , '}
                  </span>
                ))
              : 'by..'}
          </div>
        </div>

        <NowPlayingSlider pos={pos} />
      </div>
      <div className="controls d-flex justify-content-center mb-4">
        <div className="left-control d-lg-flex d-none"></div>
        <div className="mid-control">
          <button className="bg-transparent border-0">
            <ShuffleIcon className="controls-icon" />
          </button>
          <button className="bg-transparent border-0">
            <NavigateBeforeIcon
              onClick={skipNext}
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
              onClick={skipPrevious}
              className="controls-icon"
              fontSize="large"
            />
          </button>
          <button className="bg-transparent border-0">
            <RepeatIcon className="controls-icon" />
          </button>
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
