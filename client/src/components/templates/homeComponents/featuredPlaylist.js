import './styling/featuredPlaylist.css';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink, useRouteMatch } from 'react-router-dom';
import SkeletonPlaylist from '../../skeletons/skeletonPlaylist';
import { useRef } from 'react';
import ScrollSection from '../../utils/scroll-button';
import { getCorrectPath } from '../../utils/helperFunctions';
function FeaturedPlaylists({ show }) {
  const holderRef = useRef();
  const { path } = useRouteMatch();
  const getPath = getCorrectPath(path);
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
      {!show && <SkeletonPlaylist />}
      <p className="section-heading mb-0">Featured Playlists</p>
      <span style={{ color: 'wheat', fontSize: '12px' }}>{show?.message}</span>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {show?.playlists?.items?.map((item, index) => (
            <NavLink
              to={{
                pathname: `${getPath}/playlist/${item.id}`,
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
      </ScrollSection>
    </div>
  );
}
export default FeaturedPlaylists;
