import PlayFromList from '../utils/playfromlist';
import { useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import { getImage, millisToMinutesAndSeconds } from '../utils/helperFunctions';
import MoreOptions from '../templates/more-options';

function TrackItems({ item, index, list, isUsers, playlistId, setChanges }) {
  const [{ current }, dispatch] = useDataHandlerValue();
  const trackItemRef = useRef();
  const musicItem = item?.track ? item.track : item;
  const isCurrent = current?.id === musicItem.id;

  return (
    <div
      key={index}
      className={'p-t-container' + (isCurrent ? ' themeBG' : '')}
      style={{}}
      ref={trackItemRef}
    >
      <div className="p-tracks-pic">
        <img
          src={getImage(musicItem.album?.images, 'sm')}
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="p-tracks-info">
        <span className="text-light h5 mb-0">{musicItem.name}</span>
        <span className="text-secondary">
          {musicItem?.artists.map(
            (item, index) => (index ? ', ' : '') + item.name
          )}
        </span>
      </div>
      <div className="p-tracks-album ">
        <span className="text-secondary h6">{musicItem.album?.name}</span>
      </div>
      <div className="p-tracks-btn ">
        <MoreOptions
          trackItemRef={trackItemRef}
          item={item}
          isUsers={isUsers}
          playlistId={playlistId}
          setChanges={setChanges}
        />
        <span className="text-secondary me-5 d-lg-block d-none">
          {millisToMinutesAndSeconds(musicItem.duration_ms)}
        </span>
        <PlayFromList index={index} list={list} type="small" />
      </div>
    </div>
  );
}
export default TrackItems;
