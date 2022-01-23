import './styling/artists.css';
import {
  getColorArtists,
  getCorrectPath,
  getImage,
} from '../utils/helperFunctions';
import SkeletonArtists from '../skeletons/skeletonArtists';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';
import { NavLink, useRouteMatch } from 'react-router-dom';

function Artists({ show, listName }) {
  const holderRef = useRef();
  const { path } = useRouteMatch();
  const getPath = getCorrectPath(path);
  return (
    <div>
      {!show && <SkeletonArtists />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {show?.map((item, index) => (
            <NavLink
              className="d-flex flex-column align-items-center text-decoration-none me-3 p-2"
              key={item.id}
              to={`${getPath}/artist/${item.id}`}
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            >
              <div className="artist-cards" id={item.id + index}>
                <img
                  src={getImage(item?.images, 'sm')}
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
      </ScrollSection>
    </div>
  );
}
export default Artists;
