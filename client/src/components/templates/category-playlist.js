import SkeletonSPlaylist from '../skeletons/skeletonSPlaylist';
import './styling/playlist.css';

function CategoryPlaylists({ show, listName }) {
  return (
    <div>
      {!show && <SkeletonSPlaylist />}
      <p className="section-heading mb-0">{listName}</p>
      <div className="library-cards-holder">
        {show?.map((item, index) => (
          <a
            href={`${window.location.origin}/app#/playlist/${item.id}`}
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
          </a>
        ))}
      </div>
    </div>
  );
}
export default CategoryPlaylists;
