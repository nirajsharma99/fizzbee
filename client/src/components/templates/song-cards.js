import { getColorSongTemplate } from '../utils/helperFunctions';
import Play from '../utils/play';
import { useRef } from 'react';
import MoreOptions from './more-options';
function SongCards({ item, id, index }) {
  const imgRef = useRef();
  const trackItemRef = useRef();

  return (
    <div key={id} className="cards" ref={trackItemRef}>
      <img
        src={item.album?.images?.[1]?.url}
        alt={item.album?.album_type}
        crossOrigin="anonymous"
        id={id}
        ref={imgRef}
        onLoad={() => getColorSongTemplate(id, index, imgRef)}
      />
      <div className="song-more-options font-1">
        <MoreOptions
          trackItemRef={trackItemRef}
          item={item}
          isUsers={null}
          playlistId={null}
        />
      </div>
      <div id={id + index} className="cards-info">
        <div className="cards-left">
          <span className="sn">{item.name}</span>

          <span key={index} className="an">
            {item?.artists.map(
              (artist, index) =>
                artist.name + (item?.artists.length > 1 ? ',' : '')
            )}
          </span>
        </div>
        <div className="cards-right">
          <Play uri={item?.uri} item={item} type="medium" />
        </div>
      </div>
    </div>
  );
}
export default SongCards;
