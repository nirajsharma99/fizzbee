import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';

const MinPlayer2 = ({ handlePlayPause, skipNext, skipPrevious }) => {
  const [{ item, playing }, dispatch] = useDataHandlerValue();

  const getColor = (id) => {
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
    document.getElementById(
      id + 23
    ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
  };
  return (
    <div className="minimised-player-2" id={item?.id + 23}>
      <div className="min-2-left">
        <img
          src={item ? item?.album?.images?.[1].url : 'bg3.png'}
          alt="album-art-mini"
          className="mini-album-art-2"
          id={item ? item?.id : 'defaultItem'}
          crossOrigin="anonymous"
          onLoad={() => getColor(item?.id)}
        />
      </div>
      <div className="min-2-mid">
        <span className="np-name"> {item ? item.name : 'Music track'}</span>
        <div className="np-by-outer">
          <span className="np-by-min">
            {item
              ? item?.artists?.map(
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
            <PauseIcon fontSize="large" style={{ color: 'rgb(255,255,255)' }} />
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
  );
};
export default MinPlayer2;
