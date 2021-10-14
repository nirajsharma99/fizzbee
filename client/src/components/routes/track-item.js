import MoreVertIcon from '@material-ui/icons//MoreVert';
import PlayFromList from '../utils/playfromlist';
import { useEffect, useState, useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import TrackDropDown from '../templates/track-dropdown';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';

const useClasses = makeStyles((theme) => ({
  iconContainer: {
    '&:hover $icon': {
      color: 'rgb(0,255,127)',
    },
  },
  icon: {
    color: 'rgba(255,255,255,0.8)',
  },
}));
function TrackItems({
  item,
  index,
  list,
  millisToMinutesAndSeconds,
  isUsers,
  playlistId,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [{ current }, dispatch] = useDataHandlerValue();
  const trackItemRef = useRef();
  const isCurrent = current?.id === item?.track?.id;
  const classes = useClasses();
  useDetectOutsideClick(trackItemRef, closeMenu);

  function closeMenu() {
    setShowDropDown(false);
  }

  function useDetectOutsideClick(ref, callback) {
    useEffect(() => {
      function handleClickOutside(event) {
        if (ref.current && !ref.current.contains(event.target)) {
          callback();
        }
      }

      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
      };
    }, [ref, callback]);
  }

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
        <div className="more-btn-div">
          <IconButton
            className="more-btn"
            classes={{
              root: classes.iconContainer,
            }}
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <MoreVertIcon
              classes={{
                root: classes.icon,
              }}
            />
          </IconButton>

          <div className={'more-options ' + (showDropDown && 'd-block')}>
            <TrackDropDown
              item={item?.track}
              closeMenu={closeMenu}
              isUsers={isUsers}
              playlistId={playlistId}
            />
          </div>
        </div>
        <span className="text-secondary me-5 d-lg-block d-none">
          {millisToMinutesAndSeconds(item?.track?.duration_ms)}
        </span>
        <PlayFromList index={index} list={list} type="small" />
      </div>
    </div>
  );
}
export default TrackItems;
