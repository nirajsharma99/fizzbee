import './styling/artists.css';
import { NavLink } from 'react-router-dom';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import { getColorArtists } from '../utils/helperFunctions';

function Artists({ show, listName }) {
  const [{}, dispatch] = useDataHandlerValue();

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
                onLoad={() => getColorArtists(item.id, index)}
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
