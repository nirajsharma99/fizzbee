import { getImage } from '../../utils/helperFunctions';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseTwoToneIcon from '@material-ui/icons/PauseTwoTone';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import PlayerSlider1 from '../nowPlayingSlider/player-slider-1';
import QueueFS from './queue-fs';
import { useSelector } from 'react-redux';

function FullScreenPlayer({
  fullS,
  setFullS,
  handlePlayPause,
  skipNext,
  skipPrevious,
}) {
  const { current, playing } = useSelector((state) => state.player);

  return (
    <div className="album-img-div">
      <img
        src={getImage(current?.album?.images, 'lg')}
        alt="default-art"
        className="album-bg"
      />
      <img
        src={getImage(current?.album?.images, 'md')}
        alt="default-art"
        className={fullS ? 'album-sm-fs' : 'album-sm'}
        crossOrigin="anonymous"
      />

      <div className="fullscreen-controls" hidden={!fullS}>
        <div className="s-info-text">
          <span className="np-name text-light d-flex">
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
        <PlayerSlider1 />
        <div className="d-flex m-auto">
          <button className="t-btn" onClick={skipPrevious}>
            <SkipPreviousTwoToneIcon
              fontSize="large"
              style={{ color: 'rgb(255,255,255)' }}
            />
          </button>
          <button className={'play-container mx-5 '} onClick={handlePlayPause}>
            {playing ? (
              <PauseTwoToneIcon
                fontSize="large"
                style={{ color: 'rgb(255,255,255)' }}
              />
            ) : (
              <PlayArrowTwoToneIcon
                fontSize="large"
                style={{ color: 'rgb(255,255,255)' }}
              />
            )}
          </button>
          <button className="t-btn" onClick={skipNext}>
            <SkipNextTwoToneIcon
              fontSize="large"
              style={{ color: 'rgb(255,255,255)' }}
            />
          </button>
        </div>
      </div>
      <div className="fs-playlist" hidden={!fullS}>
        <QueueFS />
      </div>
    </div>
  );
}
export default FullScreenPlayer;
