import { useDataHandlerValue } from '../contextapi/DataHandler';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import { useRef, useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
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

function MaxPlayer({ skipNext, skipPrevious, handlePlayPause, minPlayer }) {
  const classes = useStyles();
  const [volume, setVolume] = useState(20);
  const [{ isMuted, maxplayertype, token, settings }, dispatch] =
    useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');

  spotify.setAccessToken(accessToken);

  useEffect(() => {
    const listener = (event) => {
      if (event.target.classList.contains('escapeEvent')) return;

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
      if (event.code === 'ArrowUp') {
        increaseVolume();
      }
      if (event.code === 'ArrowDown') {
        decreaseVolume();
      }
      if (event.code === 'KeyH') {
        dispatch({
          type: 'TOGGLE_KEYBOARD',
          show: !settings.isKeyboard,
        });
      }
      if (event.code === 'KeyQ') {
        dispatch({
          type: 'TOGGLE_QUEUE',
          show: !settings.isQueue,
        });
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
        //console.log('changing value');
      })
      .catch((err) => console.log(err));
  };
  const increaseVolume = () => {
    if (volume < 90) {
      setVolume(volume + 10);
      spotify
        .setVolume(volume + 10)
        .then(function () {
          //console.log('changing value');
        })
        .catch((err) => console.log(err));
    }
  };
  const decreaseVolume = () => {
    if (volume > 10) {
      setVolume(volume - 10);
      spotify
        .setVolume(volume - 10)
        .then(function () {
          console.log('changing value');
        })
        .catch((err) => console.log(err));
    }
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

      default:
        console.log('Error');
        break;
    }
  };
  return <div hidden={minPlayer}>{maxType()}</div>;
}
export default MaxPlayer;
