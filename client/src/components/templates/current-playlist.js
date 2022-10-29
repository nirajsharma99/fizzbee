import { useEffect, useRef } from 'react';
import { getImage, millisToMinutesAndSeconds } from '../utils/helperFunctions';
import MoreOptions from '../templates/more-options';
import { useDispatch, useSelector } from 'react-redux';
import { SmallPlayButton } from '../player/buttons';
import {
  handlePlayPause,
  playfromlist,
} from '../store/actions/spotify-actions';

function CurrentPlaylist({ item, index, list, isUsers, playlistId, maximise }) {
  const dispatch = useDispatch();
  const { current } = useSelector((state) => state.player);
  const isQueue = useSelector((state) => state.app.settings.isQueue);
  const playing = useSelector((state) => state.player.playing);
  const trackItemRef = useRef();
  const musicItem = item?.album ? item : item.track ? item.track : item;
  const isCurrent = current?.id === musicItem?.id;
  useEffect(() => {
    if (trackItemRef.current.classList.contains('themeBG')) {
      trackItemRef.current.scrollIntoView();
    }
  }, [!isQueue]);

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
        <SmallPlayButton
          playing={playing}
          isCurrent={isCurrent}
          onClick={handlePlayingSong}
        />
      </div>
    </div>
  );
}
export default CurrentPlaylist;
