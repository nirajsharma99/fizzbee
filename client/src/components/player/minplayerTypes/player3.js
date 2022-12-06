import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { getColor, getImage } from '../../utils/helperFunctions';
import Draggable from 'react-draggable';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
const MinPlayer3 = ({ handlePlayPause, skipNext, skipPrevious, sideBartype }) => {
  const { current, playing } = useSelector((state) => state.player);
  const { darkMode, colorpalette } = useSelector((state) => state.app);
  const imgRef = useRef();
  const albumSM = getImage(current?.album?.images, 'sm');

  const getColorpalette = (id, ref, type) => {
    if (colorpalette) {
      getColor(id, ref, type);
    } else {
      document.querySelector('.minimised-player-3').style.background =
        'var(--max-player-1-bg)';
    }
  };
  return (
    <Draggable cancel='button'>
      <div className={"minimised-player-3 " + (sideBartype && 'min-pos')} id={current?.id + '3'}>
        <div className="min-3-left">
          <div className={playing && 'pulse-outer'}>
            <img
              src={albumSM ? albumSM : '/bg3.png'}
              alt="album-art-mini"
              className="mini-album-art-3"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => getColorpalette(current?.id, imgRef, 'player')}
            />
          </div>
        </div>
        <div className="min-3-right">
          <span
            className="np-name-min"
          >
            {current ? current.name : 'Music track'}
          </span>
          <div className="np-by-outer">
            <span
              className="np-by-min"
            >
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
                style={{
                  color:
                    darkMode || colorpalette ? 'white' : 'var(--text-primary)',
                }}
              />
            </button>
            <button className="t-btn" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon
                  fontSize="large"
                  style={{
                    color:
                      darkMode || colorpalette
                        ? 'white'
                        : 'var(--text-primary)',
                  }}
                />
              ) : (
                <PlayArrowIcon
                  fontSize="large"
                  style={{
                    color:
                      darkMode || colorpalette
                        ? 'white'
                        : 'var(--text-primary)',
                  }}
                />
              )}
            </button>
            <button className="t-btn" onClick={skipNext}>
              <SkipNextTwoToneIcon
                fontSize="large"
                style={{
                  color:
                    darkMode || colorpalette ? 'white' : 'var(--text-primary)',
                }}
              />
            </button>
          </div>
        </div>
      </div>
    </Draggable>
  );
};
export default MinPlayer3;
