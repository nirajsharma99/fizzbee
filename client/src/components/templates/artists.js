import './styling/artists.css';
import { NavLink } from 'react-router-dom';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';

function Artists({ show, listName }) {
  const [{}, dispatch] = useDataHandlerValue();

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
      id + index
    ).style.boxShadow = `0 2px 10px rgb(${color[0]},${color[1]},${color[2]})`;

    document.getElementById(
      id + index
    ).style.background = `rgba(${color[0]},${color[1]},${color[2]})`;
  };

  return (
    <div>
      <p className="section-heading mb-0">{listName}</p>
      <div className="cards-holder">
        {show?.map((item, index) => (
          <NavLink
            className="d-flex flex-column align-items-center text-decoration-none me-3 p-2"
            key={item.id}
            to={{ pathname: `/artist/${item.id}` }}
          >
            <div className="artist-cards" id={item.id + index}>
              <img
                src={item?.images[2]?.url}
                alt={item?.name}
                crossOrigin="anonymous"
                id={item.id}
                onLoad={() => getColor({ id: item.id, index: index })}
              />
            </div>
            <span className="fw-name mt-2">{item?.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default Artists;
