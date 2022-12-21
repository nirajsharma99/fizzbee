import '../styling/templates/playlist.css';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink, useLocation } from 'react-router-dom';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';
import { getCorrectPath } from '../utils/helperFunctions';
import PlaylistCard from './homeComponents/playlistCard';

function Playlists({ show, listName }) {
  const location = useLocation();
  const holderRef = useRef();

  return (
    <div>
      <p className="section-heading mb-0">{listName}</p>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {show?.map((item, index) => (
            <PlaylistCard item={item} index={index} />
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default Playlists;
