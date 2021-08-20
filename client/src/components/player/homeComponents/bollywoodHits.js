import './styling//trackholders.css';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { useDataHandlerValue } from '../../contextapi/DataHandler';

function BollywoodHits({ play, show, listName }) {
  //console.log(show);
  const [{ playing }, dispatch] = useDataHandlerValue();
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
          src={item?.track?.album?.images?.[1]?.url}
          alt={item?.track?.album?.name}
          crossOrigin="anonymous"
          id={item?.track?.album?.id}
          onLoad={() => getColor({ id: item?.track?.album?.id, index: index })}
        />
        <div id={item?.track?.album?.id + index} className="cards-info">
          <div className="cards-left">
            <span className="sn">{item?.track?.album?.name}</span>

            <span key={index} className="an">
              {item?.track?.album?.artists.map(
                (artist, index) =>
                  artist.name +
                  (item?.track?.album?.artists.length > 1 ? ',' : '')
              )}
            </span>
          </div>
          <div className="cards-right">
            <button
              className="play-container"
              onClick={() => play(item?.track?.uri)}
            >
              <PlayArrowIcon fontSize="large" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="section-heading mb-0">{listName}</p>
      <div className="trackholder">
        {show?.map((item, index) => (
          <Cards key={item?.track?.album?.id} item={item} index={index} />
        ))}
      </div>
    </div>
  );
}
export default BollywoodHits;
