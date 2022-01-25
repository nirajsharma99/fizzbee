import '../styling/templates/album.css';
import {
  getColorAlbumTemplate,
  getCorrectPath,
  getImage,
} from '../utils/helperFunctions';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';
import { Link, useRouteMatch } from 'react-router-dom';
function Album({ list }) {
  const holderRef = useRef();
  const { path } = useRouteMatch();
  const getPath = getCorrectPath(path);
  return (
    <div>
      <h2 className="section-heading py-3">Albums</h2>
      <ScrollSection>
        <div className="card-holders" ref={holderRef}>
          {list?.map((item, index) => (
            <Link
              to={`${getPath}/album/${item.id}`}
              className="d-flex flex-column align-items-start me-2 p-2 text-decoration-none"
              key={item.id}
              id={item.id + index}
              style={{ borderRadius: '15px' }}
            >
              <div className="album-cards">
                <img
                  src={getImage(item?.images, 'md')}
                  alt={item?.name}
                  crossOrigin="anonymous"
                  id={item.id}
                  onLoad={() =>
                    getColorAlbumTemplate({ id: item.id, index: index })
                  }
                />
              </div>
              <span className="fp-name mt-2">{item?.name}</span>
            </Link>
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default Album;
