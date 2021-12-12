import PlayFromList from '../utils/playfromlist';
import { useEffect, useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import { getImage, millisToMinutesAndSeconds } from '../utils/helperFunctions';
import MoreOptions from '../templates/more-options';

function CurrentPlaylist({ item, index, list, isUsers, playlistId, maximise }) {
  const [{ current }, dispatch] = useDataHandlerValue();
  const trackItemRef = useRef();
  const musicItem = item?.album ? item : item.track ? item.track : item;
  const isCurrent = current?.id === musicItem?.id;
  useEffect(() => {
    if (trackItemRef.current.classList.contains('themeBG')) {
      trackItemRef.current.scrollIntoView();
    }
  }, []);

  return (
    <div
      key={index}
      className={'cp-t-container' + (isCurrent ? ' themeBG' : '')}
      ref={trackItemRef}
    >
      <div className="cp-tracks-pic">
        <img
          src={getImage(musicItem?.album?.images, 'sm')}
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="cp-tracks-info font-1">
        <span className="text-light h5 mb-0">{musicItem.name}</span>
        <span className="text-secondary">
          {musicItem.artists.map(
            (item, index) => (index ? ', ' : '') + item.name
          )}
        </span>
      </div>

      <div className="cp-tracks-btn ">
        <MoreOptions
          trackItemRef={trackItemRef}
          item={item}
          isUsers={isUsers}
          playlistId={playlistId}
        />
        <span className="text-secondary d-lg-block d-none">
          {millisToMinutesAndSeconds(musicItem.duration_ms)}
        </span>
        <PlayFromList index={index} list={list} type="small" />
      </div>
    </div>
  );
}
export default CurrentPlaylist;
