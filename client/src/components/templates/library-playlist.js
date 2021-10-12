//import { useDataHandlerValue } from '../contextapi/DataHandler';
import './styling/playlist.css';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink } from 'react-router-dom';

function LibraryPlaylists({ show, listName }) {
  //console.log(featuredPlaylists);
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
    <div>
      <p className="section-heading mb-0">{listName}</p>
      <div className="library-cards-holder">
        {show?.map((item, index) => (
          <NavLink
            to={{
              pathname: `/playlist/${item.id}`,
            }}
            className="d-flex flex-column align-items-center me-2 p-2 text-decoration-none"
            key={item.id}
          >
            <div className="library-playlist-cards" id={item.id + index}>
              <img
                src={item?.images[0]?.url}
                alt={item?.name}
                crossOrigin="anonymous"
                id={item.id}
                onLoad={() => getColor({ id: item.id, index: index })}
              />
            </div>
            <span className="lp-name mt-2">{item?.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default LibraryPlaylists;