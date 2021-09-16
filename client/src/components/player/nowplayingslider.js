import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotifyPlayer from './spotifyPlayer';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const accessToken = window.localStorage.getItem('token');
const useStyles = makeStyles((theme) => ({
  root: {
    width: 850 + theme.spacing(3) * 2,
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
    height: 15,
    width: 15,
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
    left: 'calc(-50% - 5px)',
  },
  track: {
    height: 6,
    borderRadius: 4,
  },
  rail: {
    height: 6,
    borderRadius: 4,
  },
})(Slider);

function NowPlayingSlider() {
  const [{ deviceId, item, position, playing }, dispatch] =
    useDataHandlerValue();
  spotify.setAccessToken(accessToken);
  //console.log(item);
  const classes = useStyles();
  const [instance, setInstance] = useState(0);
  const [seeking, setSeeking] = useState(false);
  const [pos, setPos] = useState(0);
  const countRef = useRef(null);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  useEffect(() => {
    if (!item) return;
    setInstance((pos / item.duration_ms) * 100);
  }, [pos]);
  useEffect(() => {
    setPos(position);
  }, [position]);

  useEffect(() => {
    if (playing) {
      countRef.current = setInterval(() => {
        setPos((pos) => pos + 1000);
      }, 1000);
    } else {
      clearInterval(countRef.current);
    }
  }, [playing]);
  //console.log(pos);
  const handleSeeker = (seekTo) => {
    setInstance(seekTo);
    var seekms = ((seekTo * item.duration_ms) / 100).toFixed(0);
    spotify
      .seek(seekms)
      .then(function () {
        console.log('Seek to ' + seekTo);
      })
      .catch(function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  };

  return (
    <div className="justify-content-center align-items-center d-flex">
      <div className={classes.root}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <p
              className="m-0 text-center"
              style={{ width: '45px', color: 'rgba(255,255,255,0.7)' }}
            >
              {item
                ? millisToMinutesAndSeconds(
                    ((instance * item.duration_ms) / 100).toFixed(0)
                  )
                : '00:00'}
            </p>
          </Grid>
          <Grid item xs>
            <PrettoSlider
              value={instance}
              onChange={(e, newvalue) => setInstance(newvalue)}
              onChangeCommitted={(e, newvalue) => handleSeeker(newvalue)}
              valueLabelDisplay="off"
              aria-label="pretto slider"
            />
          </Grid>
          <Grid item>
            <p
              className="m-0 text-center"
              style={{ width: '45px', color: 'rgba(255,255,255,0.7)' }}
            >
              {item ? millisToMinutesAndSeconds(item.duration_ms) : '00:00'}
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default NowPlayingSlider;
