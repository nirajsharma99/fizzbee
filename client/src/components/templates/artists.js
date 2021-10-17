import './styling/artists.css';
import { getColorArtists } from '../utils/helperFunctions';
import SkeletonArtists from '../skeletons/skeletonArtists';

function Artists({ show, listName }) {
  return (
    <div>
      {!show && <SkeletonArtists />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <div className="cards-holder">
        {show?.map((item, index) => (
          <a
            className="d-flex flex-column align-items-center text-decoration-none me-3 p-2"
            key={item.id}
            href={`${window.location.origin}/app#/artist/${item.id}`}
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
          </a>
        ))}
      </div>
    </div>
  );
}
export default Artists;
