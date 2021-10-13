import MoreVertIcon from '@material-ui/icons//MoreVert';
import PlayFromList from '../utils/playfromlist';
import { useEffect, useState, useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import TrackDropDown from '../templates/track-dropdown';

function TrackItems({ item, index, list, millisToMinutesAndSeconds }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const [{ current }, dispatch] = useDataHandlerValue();
  const trackItemRef = useRef();
  const isCurrent = current?.id === item?.track?.id;

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
          <button
            className="more-btn"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <MoreVertIcon style={{ color: 'grey' }} />
          </button>

          <div className={'more-options ' + (showDropDown && 'd-block')}>
            <TrackDropDown item={item?.track} closeMenu={closeMenu} />
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
