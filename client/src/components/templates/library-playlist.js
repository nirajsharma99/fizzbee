//import { useDataHandlerValue } from '../contextapi/DataHandler';
import './styling/playlist.css';
import { NavLink, useLocation } from 'react-router-dom';

function LibraryPlaylists({ show, listName }) {
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;

  return (
    <div>
      <p className="section-heading mb-0">{listName}</p>
      <div className="library-cards-holder">
        {show?.map((item, index) => (
          <NavLink
            to={{
              pathname: `${routeTo}/playlist/${item.id}`,
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
