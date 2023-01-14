import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';

const small = { className: 'sm-play-btn t-btn' };
const medium = { className: 'play-container', color: 'white' };
const cover = {
  className: 'play-container-cover',
  color: 'white',
};

export const Button = (props) => (
  <button type="button" {...props} className={`${props.className}`}>
    {props.children}
  </button>
);

export const SmallPlayButton = ({ playing, isCurrent, ...props }) => (
  <Button {...props} className={small.className}>
    {isCurrent && playing ? (
      <PauseIcon
        fontSize="large"
        style={{ color: isCurrent ? 'white' : 'var(--main-theme)' }}
      />
    ) : (
      <PlayArrowIcon
        fontSize="large"
        style={{ color: isCurrent ? 'white' : 'var(--main-theme)' }}
      />
    )}
  </Button>
);

export const MediumPlayButton = ({ playing, isCurrent, ...props }) => (
  <Button {...props} className={medium.className}>
    {isCurrent && playing ? (
      <PauseIcon fontSize="large" style={{ color: 'white' }} />
    ) : (
      <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
    )}
  </Button>
);

export const CoverPlayButton = ({ playing, isCurrent, ...props }) => (
  <Button {...props} className={cover.className}>
    {isCurrent && playing ? (
      <PauseIcon fontSize="large" style={{ color: 'white' }} />
    ) : (
      <PlayArrowIcon fontSize="large" style={{ color: 'white' }} />
    )}
  </Button>
);

export const LyricsButton = ({ onClick, showLyrics, colorpalette, ...props }) => (
  <button
    {...props}
    className={'lyrics-btn'}
    onClick={onClick}
  >
    <ion-icon name={"mic" + (showLyrics ? '' : '-outline')}
      style={{ color: colorpalette && showLyrics ? 'var(--col-thief)' : 'var(--main-theme)' }}
    ></ion-icon>
  </button >
)