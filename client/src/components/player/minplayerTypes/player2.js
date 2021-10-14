import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseTwoToneIcon from '@material-ui/icons/PauseTwoTone';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { getColor } from '../../utils/helperFunctions';
import { useRef } from 'react';

const MinPlayer2 = ({ handlePlayPause, skipNext, skipPrevious }) => {
  const [{ current, playing }, dispatch] = useDataHandlerValue();
  const imgRef = useRef();

  return (
    <div className="minimised-player-2" id={current?.id + '3'}>
      <div className="min-2-left">
        <img
          src={current ? current?.album?.images?.[1].url : 'bg3.png'}
          alt="album-art-mini"
          className="mini-album-art-2"
          ref={imgRef}
          crossOrigin="anonymous"
          onLoad={() => getColor(current?.id, imgRef, 'player')}
        />
      </div>
      <div className="min-2-mid">
        <span className="np-name">
          {' '}
          {current ? current.name : 'Music track'}
        </span>
        <div className="np-by-outer">
          <span className="np-by-min">
            {current
              ? current?.artists?.map(
                  (item, index) => (index ? ', ' : '') + item.name
                )
              : 'by..'}
          </span>
        </div>
      </div>
      <div className="min-2-right">
        <button className="t-btn" onClick={skipPrevious}>
          <SkipPreviousTwoToneIcon
            fontSize="large"
            style={{ color: 'rgb(255,255,255)' }}
          />
        </button>
        <button className="t-btn" onClick={handlePlayPause}>
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
  );
};
export default MinPlayer2;
