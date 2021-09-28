import { NavLink } from 'react-router-dom';
import './styling/album.css';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';

function Album({ list }) {
  const getColor = ({ id, index }) => {
    const colorThief = new ColorThief();
    const img = document.getElementById(id);
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    document.getElementById(
      id + index
    ).style.background = `rgb(${color[0]},${color[1]},${color[2]})`;
  };
  return (
    <div>
      <h2 className="section-heading pt-3">Albums</h2>
      <div className="card-holders">
        {list?.map((item, index) => (
          <NavLink
            to={{
              pathname: `/album/${item.id}`,
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
                onLoad={() => getColor({ id: item.id, index: index })}
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
