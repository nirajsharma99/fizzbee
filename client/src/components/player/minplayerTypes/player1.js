import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { getImage } from '../../utils/helperFunctions';
const MinPlayer1 = ({ handlePlayPause }) => {
  const [{ current, playing }, dispatch] = useDataHandlerValue();

  return (
    <div className="minimised-player">
      <div className="min-left">
        <img
          src={getImage(current?.album?.images, 'sm')}
          alt="album-art-mini"
          className="mini-album-art"
        />
      </div>
      <div className="min-mid">
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
      <div className="min-right">
        <div className="pp-mini-outer">
          <div className="pp-mini">
            <button className="mini-play-container" onClick={handlePlayPause}>
              {playing ? (
                <PauseIcon fontSize="large" />
              ) : (
                <PlayArrowIcon fontSize="large" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default MinPlayer1;
