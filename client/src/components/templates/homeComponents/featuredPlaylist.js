import '../../styling/homeComponents/featuredPlaylist.css';
import SkeletonPlaylist from '../../skeletons/skeletonPlaylist';
import { useRef } from 'react';
import ScrollSection from '../../utils/scroll-button';
import PlaylistCard from './playlistCard';
function FeaturedPlaylists({ show }) {
  const holderRef = useRef();

  return (
    <div>
      {!show && <SkeletonPlaylist />}
      <p className="section-heading mb-0">Featured Playlists</p>
      <span style={{ color: 'var(--bp-name)', fontSize: '12px' }}>
        {show?.message}
      </span>
      <ScrollSection>
        <div className="cards-holder" ref={holderRef}>
          {show?.playlists?.items?.map((item, index) => (
            <PlaylistCard item={item} index={index} />
          ))}
        </div>
      </ScrollSection >
    </div >
  );
}
export default FeaturedPlaylists;
