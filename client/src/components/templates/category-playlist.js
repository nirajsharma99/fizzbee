import { Link, useRouteMatch } from 'react-router-dom';
import SkeletonSPlaylist from '../skeletons/skeletonSPlaylist';
import { getCorrectPath } from '../utils/helperFunctions';
import '../styling/templates/playlist.css';

function CategoryPlaylists({ show }) {
  const { path } = useRouteMatch();
  const getPath = getCorrectPath(path);
  return (
    <div>
      {!show && <SkeletonSPlaylist />}
      <p className="section-heading mb-0"></p>
      <div className="library-cards-holder">
        {show?.map((item, index) => (
          <Link
            to={`${getPath}/playlist/${item.id}`}
            className="d-flex flex-column align-items-center me-2 p-2 text-decoration-none"
            key={item.id + index}
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
          </Link>
        ))}
      </div>
    </div>
  );
}
export default CategoryPlaylists;
