import Grid from '@material-ui/core/Grid';
import Slider from '@material-ui/core/Slider';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { useState } from 'react';

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
  const classes = useStyles();
  const [instance, setInstance] = useState(0);
  return (
    <div className="justify-content-center align-items-center d-flex">
      <div className={classes.root}>
        <Grid container spacing={3} alignItems="center">
          <Grid item>00:00</Grid>
          <Grid item xs>
            <PrettoSlider
              value={instance}
              onChange={(e, newvalue) => setInstance(newvalue)}
              valueLabelDisplay="auto"
              aria-label="pretto slider"
            />
          </Grid>
          <Grid item>05:00</Grid>
        </Grid>
      </div>
    </div>
  );
}
export default NowPlayingSlider;
