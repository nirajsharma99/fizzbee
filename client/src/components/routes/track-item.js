import PlayFromList from '../utils/playfromlist';
import { useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import { millisToMinutesAndSeconds } from '../utils/helperFunctions';
import MoreOptions from '../templates/more-options';

function TrackItems({ item, index, list, isUsers, playlistId }) {
  const [{ current }, dispatch] = useDataHandlerValue();
  const trackItemRef = useRef();
  const isCurrent = current?.id === item?.track?.id;

  return (
    <div
      key={index}
      className="p-t-container"
      style={{
        background: isCurrent ? 'rgba(0, 255, 127,0.75)' : '',
      }}
      ref={trackItemRef}
    >
      <div className="p-tracks-pic">
        <img
          src={item?.track?.album?.images[2].url}
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="p-tracks-info">
        <span className="text-light h5 mb-0">{item?.track?.name}</span>
        <span className="text-secondary">
          {item.track?.artists.map(
            (item, index) => (index ? ', ' : '') + item.name
          )}
        </span>
      </div>
      <div className="p-tracks-album ">
        <span className="text-secondary h6">{item?.track?.album?.name}</span>
      </div>
      <div className="p-tracks-btn ">
        <MoreOptions
          trackItemRef={trackItemRef}
          item={item}
          isUsers={isUsers}
          playlistId={playlistId}
        />
        <span className="text-secondary me-5 d-lg-block d-none">
          {millisToMinutesAndSeconds(item?.track?.duration_ms)}
        </span>
        <PlayFromList index={index} list={list} type="small" />
      </div>
    </div>
  );
}
export default TrackItems;
