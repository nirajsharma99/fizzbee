import { NavLink, useLocation } from 'react-router-dom';
import './styling/album.css';
import { getColorAlbumTemplate } from '../utils/helperFunctions';

function Album({ list }) {
  const location = useLocation();
  const routeTo = location.pathname === '/' ? '' : location.pathname;

  return (
    <div>
      <h2 className="section-heading py-3">Albums</h2>
      <div className="card-holders">
        {list?.map((item, index) => (
          <NavLink
            to={{
              pathname: `${routeTo}/album/${item.id}`,
              //state: { id: item.id },
            }}
            className="d-flex flex-column align-items-start me-2 p-2 text-decoration-none"
            key={item.id}
            id={item.id + index}
            style={{ borderRadius: '15px' }}
          >
            <div className="album-cards">
              <img
                src={item?.images[0]?.url}
                alt={item?.name}
                crossOrigin="anonymous"
                id={item.id}
                onLoad={() =>
                  getColorAlbumTemplate({ id: item.id, index: index })
                }
              />
            </div>
            <span className="fp-name mt-2">{item?.name}</span>
          </NavLink>
        ))}
      </div>
    </div>
  );
}
export default Album;
