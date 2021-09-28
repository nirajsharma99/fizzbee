import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import { useDataHandlerValue } from '../contextapi/DataHandler';

function MinPlayer({ maxPlayer, handlePlayPause, bg, minPlayer }) {
  const [{ item, playing }, dispatch] = useDataHandlerValue();
  //console.log(item);
  return (
    <div className="minimised-player" onClick={maxPlayer} hidden={!minPlayer}>
      <div className="min-left">
        <img
          src={item ? item?.album?.images?.[1].url : bg}
          alt="album-art-mini"
          className="mini-album-art"
        />
      </div>
      <div className="min-mid">
        {item ? <span className="np-name"> {item?.name}</span> : 'Music track'}
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
}
export default MinPlayer;
