import './styling/artists.css';
import { NavLink } from 'react-router-dom';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import { getColorArtists } from '../utils/helperFunctions';
import SkeletonArtists from '../skeletons/skeletonArtists';
import { useLocation } from 'react-router-dom';

function Artists({ show, listName }) {
  const [{}, dispatch] = useDataHandlerValue();
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;

  return (
    <div>
      {!show && <SkeletonArtists />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <div className="cards-holder">
        {show?.map((item, index) => (
          <NavLink
            className="d-flex flex-column align-items-center text-decoration-none me-3 p-2"
            key={item.id}
            to={{ pathname: `${routeTo}/artist/${item.id}` }}
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
