import { useDataHandlerValue } from '../../contextapi/DataHandler';
import './styling/featuredPlaylist.css';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink } from 'react-router-dom';

function FeaturedPlaylists() {
  const [{ featuredPlaylists }, dispatch] = useDataHandlerValue();
  //console.log(featuredPlaylists);
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
      id
    ).style.boxShadow = `0 4px 15px rgb(${color[0]},${color[1]},${color[2]})`;

    document.getElementById(id + index).style.background = `linear-gradient(
      rgba(${color[0]},${color[1]},${color[2]},0.9),
      rgba(${color[0]},${color[1]},${color[2]},0.3)
    )`;
  };

  return (
    <div>
      <p className="section-heading mb-0">Featured Playlists</p>
      <span style={{ color: 'wheat', fontSize: '12px' }}>
        {featuredPlaylists.message}
      </span>
      <div className="cards-holder">
        {featuredPlaylists?.playlists?.items?.map((item, index) => (
          <NavLink
            to={{
              pathname: `/playlist/${item.id}`,
              //state: { id: item.id },
            }}
            className="d-flex flex-column align-items-start me-2 p-2 text-decoration-none"
            key={item.id}
          >
            <div className="playlist-cards" id={item.id + index}>
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
export default FeaturedPlaylists;
