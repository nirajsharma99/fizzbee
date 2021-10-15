import './styling//trackholders.css';
import SongCards from './song-cards';
import SkeletonSongs from '../skeletons/skeletonSongs';

function TrackHolders({ show, listName }) {
  return (
    <div>
      {!show && <SkeletonSongs />}
      <p className="section-heading mb-0" hidden={!show}>
        {listName}
      </p>
      <div className="trackholder">
        {show?.map((item, index) => (
          <SongCards
            key={item?.track ? item.track?.id : item.id}
            id={item?.track ? item.track?.id : item.id}
            item={item.track ? item.track : item}
            index={index}
          />
        ))}
      </div>
    </div>
  );
}
export default TrackHolders;
