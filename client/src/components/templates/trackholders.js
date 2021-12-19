import './styling//trackholders.css';
import SongCards from './song-cards';
import SkeletonSongs from '../skeletons/skeletonSongs';
import { useRef } from 'react';
import ScrollSection from '../utils/scroll-button';

function TrackHolders({ show, listName }) {
  const holderRef = useRef();

  return (
    <div>
      {!show && <SkeletonSongs />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <ScrollSection>
        <div className="trackholder" ref={holderRef}>
          {show?.map((item, index) => (
            <SongCards
              key={item?.track ? item.track?.id : item.id}
              id={item?.track ? item.track?.id : item.id}
              item={item.track ? item.track : item}
              index={index}
            />
          ))}
        </div>
      </ScrollSection>
    </div>
  );
}
export default TrackHolders;
