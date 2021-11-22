import { getImage } from '../../utils/helperFunctions';
import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseTwoToneIcon from '@material-ui/icons/PauseTwoTone';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { useEffect } from 'react';
import NowPlayingSlider from '../nowplayingslider';

function FullScreenPlayer({
  fullS,
  setFullS,
  handlePlayPause,
  skipNext,
  skipPrevious,
}) {
  const [{ current, playing }, dispatch] = useDataHandlerValue();

  return (
    <div className="w-100 position-relative">
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
        <NowPlayingSlider />
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
    </div>
  );
}
export default FullScreenPlayer;
