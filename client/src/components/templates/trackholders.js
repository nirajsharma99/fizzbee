import './styling//trackholders.css';
import SongCards from './song-cards';

function TrackHolders({ show, listName }) {
  return (
    <div>
      <p className="section-heading mb-0">{listName}</p>
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
