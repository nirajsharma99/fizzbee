//import { useDataHandlerValue } from '../contextapi/DataHandler';
import './styling/playlist.css';
import { NavLink, useLocation } from 'react-router-dom';
import SkeletonSPlaylist from '../skeletons/skeletonSPlaylist';
import { getImage } from '../utils/helperFunctions';
function LibraryPlaylists({ show, listName }) {
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;

  return (
    <div>
      {!show && <SkeletonSPlaylist />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
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
                src={getImage(item?.images, 'md')}
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
