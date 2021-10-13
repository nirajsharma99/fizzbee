import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import Draggable from 'react-draggable';
import { useRef } from 'react';
const MinPlayer3 = ({ handlePlayPause, skipNext, skipPrevious }) => {
  const [{ current, playing }, dispatch] = useDataHandlerValue();
  const imgRef = useRef();

  const getColor = (id) => {
    if (!id) return;
    const colorThief = new ColorThief();
    const img = imgRef.current;
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    if (!color) return;
    document.getElementById(
      id + 23
    ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
  };

  return (
    <Draggable>
      <div className="minimised-player-3" id={current?.id + 23}>
        <div className="min-3-left">
          <div className={playing && 'pulse-outer'}>
            <img
              src={current ? current?.album?.images?.[1].url : 'bg3.png'}
              alt="album-art-mini"
              className="mini-album-art-3"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => getColor(current ? current?.id : null)}
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
