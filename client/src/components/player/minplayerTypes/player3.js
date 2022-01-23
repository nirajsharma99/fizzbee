import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { getColor, getImage } from '../../utils/helperFunctions';
import Draggable from 'react-draggable';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
const MinPlayer3 = ({ handlePlayPause, skipNext, skipPrevious }) => {
  const { current, playing } = useSelector((state) => state.player);
  const imgRef = useRef();
  const albumSM = getImage(current?.album?.images, 'sm');

  return (
    <Draggable>
      <div className="minimised-player-3" id={current?.id + '3'}>
        <div className="min-3-left">
          <div className={playing && 'pulse-outer'}>
            <img
              src={albumSM ? albumSM : '/bg3.png'}
              alt="album-art-mini"
              className="mini-album-art-3"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => getColor(current?.id, imgRef, 'player')}
            />
          </div>
        </div>
        <div className="min-3-right">
          <span className="np-name">
            {' '}
            {current ? current.name : 'Music track'}
          </span>
          <div className="np-by-outer">
            <span className="np-by-min justify-content-start">
              {current
                ? current?.artists?.map(
                    (item, index) => (index ? ', ' : '') + item.name
                  )
                : 'by..'}
            </span>
          </div>
          <div className="">
            <button className="t-btn" onClick={skipPrevious}>
              <SkipPreviousTwoToneIcon
                fontSize="large"
                style={{ color: 'rgb(255,255,255)' }}
              />
            </button>
            <button className="t-btn" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon
                  fontSize="large"
                  style={{ color: 'rgb(255,255,255)' }}
                />
              ) : (
                <PlayArrowIcon
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
    </Draggable>
  );
};
export default MinPlayer3;
