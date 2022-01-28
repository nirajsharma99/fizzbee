import { getColorSongTemplate, getImage } from '../utils/helperFunctions';
import { useRef } from 'react';
import MoreOptions from './more-options';
import { useDispatch, useSelector } from 'react-redux';
import { handlePlayPause, play } from '../store/actions/spotify-actions';
import { MediumPlayButton } from '../player/buttons';
function SongCards({ item, id, index }) {
  const imgRef = useRef();
  const trackItemRef = useRef();
  const dispatch = useDispatch();
  const current = useSelector((state) => state.player.current);
  const playing = useSelector((state) => state.player.playing);
  const isCurrent = item?.uri === current?.uri;

  const handlePlayingSong = (e) => {
    if (isCurrent) {
      dispatch(handlePlayPause());
    } else {
      dispatch(play(item));
    }
  };

  return (
    <div key={id} className="cards" ref={trackItemRef}>
      <img
        src={getImage(item.album?.images, 'md')}
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
              (artist, index) => (index ? ', ' : '') + artist.name
            )}
          </span>
        </div>
        <div className="cards-right">
          <MediumPlayButton
            onClick={handlePlayingSong}
            playing={playing}
            isCurrent={isCurrent}
          />
        </div>
      </div>
    </div>
  );
}
export default SongCards;
