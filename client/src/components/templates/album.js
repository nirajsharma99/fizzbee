import './styling/album.css';
import { getColorAlbumTemplate, getImage } from '../utils/helperFunctions';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';
function Album({ list }) {
  const holderRef = useRef();

  return (
    <div>
      <h2 className="section-heading py-3">Albums</h2>
      <ScrollSection>
        <div className="card-holders" ref={holderRef}>
          {list?.map((item, index) => (
            <a
              href={`${window.location.origin}/app#/album/${item.id}`}
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
            </a>
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default Album;
