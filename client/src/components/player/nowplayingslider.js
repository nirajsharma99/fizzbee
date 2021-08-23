import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useEffect, useRef, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotifyPlayer from './spotifyPlayer';

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

function NowPlayingSlider({ pos }) {
  const [{ deviceId, item, position, playing }, dispatch] =
    useDataHandlerValue();
  //console.log(item);
  const classes = useStyles();
  const [instance, setInstance] = useState(0);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds == 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  useEffect(() => {
    setInstance((pos / item.duration_ms) * 100);
  }, [pos]);

  return (
    <div className="justify-content-center align-items-center d-flex">
      <div className={classes.root}>
        <Grid container spacing={1} alignItems="center">
          <Grid item>
            <p className="m-0 text-center" style={{ width: '45px' }}>
              {millisToMinutesAndSeconds(pos)}
            </p>
          </Grid>
          <Grid item xs>
            <PrettoSlider
              value={instance}
              onChange={(e, newvalue) => setInstance(newvalue)}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
            />
          </Grid>
          <Grid item>
            <p className="m-0 text-center" style={{ width: '45px' }}>
              {item ? millisToMinutesAndSeconds(item.duration_ms) : '00:00'}
            </p>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}
export default NowPlayingSlider;
