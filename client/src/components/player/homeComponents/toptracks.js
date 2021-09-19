import './styling//trackholders.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { useDataHandlerValue } from '../../contextapi/DataHandler';

function TrackHolders({ show, play }) {
  const [{}, dispatch] = useDataHandlerValue();

  function Cards({ item, index }) {
    const getColor = ({ id, index }) => {
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
        id
      ).style.boxShadow = `0 4px 15px rgb(${color[0]},${color[1]},${color[2]})`;

      document.getElementById(id + index).style.background = `linear-gradient(
        rgba(${color[0]},${color[1]},${color[2]},0.9),
        rgba(${color[0]},${color[1]},${color[2]},0.3)
      )`;
    };

    return (
      <div key={item.id} className="cards">
        <img
          src={item.album?.images?.[1]?.url}
          alt={item.album?.album_type}
          crossOrigin="anonymous"
          id={item.id}
          onLoad={() => getColor({ id: item.id, index: index })}
        />
        <div id={item.id + index} className="cards-info">
          <div className="cards-left">
            <span className="sn">{item.name}</span>

            <span key={index} className="an">
              {item?.artists.map(
                (artist, index) =>
                  artist.name + (item?.artists.length > 1 ? ',' : '')
              )}
            </span>
          </div>
          <div className="cards-right">
            <button className="play-container" onClick={() => play(item.uri)}>
              <PlayArrowIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="trackholder">
      {show?.items?.map((item, index) => (
        <Cards key={item.id} item={item} index={index} />
      ))}
    </div>
  );
}
export default TrackHolders;
