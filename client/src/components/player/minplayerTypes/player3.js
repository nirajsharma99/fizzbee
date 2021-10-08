import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import Draggable from 'react-draggable';
const MinPlayer3 = ({ handlePlayPause, skipNext, skipPrevious }) => {
  const [{ item, playing }, dispatch] = useDataHandlerValue();

  const getColor = (id) => {
    if (id === 'null') return;
    const colorThief = new ColorThief();
    const img = document.getElementById(id);
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
      <div className="minimised-player-3" id={item?.id + 23}>
        <div className="min-3-left">
          <div className={playing && 'pulse-outer'}>
            <img
              src={item ? item?.album?.images?.[1].url : 'bg3.png'}
              alt="album-art-mini"
              className="mini-album-art-3"
              id={item ? item?.id : 'null'}
              crossOrigin="anonymous"
              onLoad={() => getColor(item?.id)}
            />
          </div>
        </div>
        <div className="min-3-right">
          <span className="np-name"> {item ? item.name : 'Music track'}</span>
          <div className="np-by-outer">
            <span className="np-by-min justify-content-start">
              {item
                ? item?.artists?.map(
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
