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
import ShuffleBtn from '../utils/shuffle';
import RepeatBtn from '../utils/repeat';
import VolumeOff from '@material-ui/icons/VolumeOff';
import MaxPlayer1 from './maxplayertypes/player1';
import MaxPlayer2 from './maxplayertypes/player2';

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
  skipNext,
  skipPrevious,
  handlePlayPause,

  minPlayer,
}) {
  const classes = useStyles();
  const canvas = useRef();
  const [volume, setVolume] = useState(20);
  const [{ isMuted, maxplayertype, token }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;

  spotify.setAccessToken(accessToken);

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
    spotify
      .setVolume(!isMuted ? 0 : volume)
      .then(function () {
        dispatch({
          type: 'SET_MUTED',
          isMuted: !isMuted,
        });
        console.log(isMuted ? 'Muted..' : 'Unmute');
      })
      .catch((err) => console.log(err));
  };
  /*document.body.style.background = `black url(${item?.album?.images?.[2].url}) no-repeat  center center `;
  document.body.style.backgroundSize = 'cover';*/
  const maxType = () => {
    switch (maxplayertype) {
      case 0:
        return (
          <MaxPlayer1
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            volume={volume}
            setVolume={setVolume}
            changeVolume={changeVolume}
            mutePlayer={mutePlayer}
            classes={classes}
            PrettoSlider={PrettoSlider}
          />
        );
        break;
      case 1:
        return (
          <MaxPlayer2
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            volume={volume}
            setVolume={setVolume}
            changeVolume={changeVolume}
            mutePlayer={mutePlayer}
            classes={classes}
            PrettoSlider={PrettoSlider}
          />
        );
        break;

      default:
        console.log('Error');
        break;
    }
  };
  return <div hidden={minPlayer}>{maxType()}</div>;
}
export default MaxPlayer;
