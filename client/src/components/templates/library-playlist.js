import '../styling/templates/playlist.css';
import { NavLink, useLocation } from 'react-router-dom';
import SkeletonSPlaylist from '../skeletons/skeletonSPlaylist';
import { getImage } from '../utils/helperFunctions';
function LibraryPlaylists({ show, listName }) {
  const location = useLocation();
  const routeTo = location.pathname;

  return (
    <div>
      {!show && <SkeletonSPlaylist />}
      <p className="section-heading mb-3" hidden={!show}>
        {listName}
      </p>
      <div className="library-cards-holder slidefrombottom">
        {show?.map((item, index) => (
          <NavLink
            to={{
              pathname: `${routeTo}/playlist/${item.id}`,
            }}
            className="d-flex flex-column align-items-center p-2 text-decoration-none hover-effect-lc"
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
