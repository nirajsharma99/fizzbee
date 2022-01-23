import { useRef } from 'react';
import { getImage, millisToMinutesAndSeconds } from '../utils/helperFunctions';
import MoreOptions from '../templates/more-options';
import { useDispatch, useSelector } from 'react-redux';
import {
  handlePlayPause,
  playfromlist,
} from '../store/actions/spotify-actions';
import { SmallPlayButton } from '../player/buttons';

function TrackItems({ item, index, list, isUsers, playlistId, setChanges }) {
  const { current } = useSelector((state) => state.player);
  const playing = useSelector((state) => state.player.playing);
  const trackItemRef = useRef();
  const dispatch = useDispatch();
  const musicItem = item?.track ? item.track : item;
  const isCurrent = current?.id === musicItem.id;

  const handlePlayingSong = () => {
    if (isCurrent) {
      dispatch(handlePlayPause());
    } else {
      dispatch(playfromlist(index, list));
    }
  };

  return (
    <div
      key={index}
      className={'p-t-container' + (isCurrent ? ' themeBG' : '')}
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
        <SmallPlayButton
          playing={playing}
          isCurrent={isCurrent}
          onClick={handlePlayingSong}
        />
      </div>
    </div>
  );
}
export default TrackItems;
