import MoreVertIcon from '@material-ui/icons/MoreVert';
import PlayFromList from '../utils/playfromlist';
import { useEffect, useState, useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import TrackDropDown from '../templates/track-dropdown';
import { millisToMinutesAndSeconds } from '../utils/helperFunctions';

function ArtistTracks({ item, index, toptracks }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const trackItemRef = useRef();
  const [{ current }, dispatch] = useDataHandlerValue();

  //console.log(playlist);
  const isCurrent = current?.id === item?.id;

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
          src={item?.album?.images[2].url}
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="p-tracks-info font-1 ms-2">
        <span className="text-light h5 mb-0">{item?.name}</span>
        <span className="text-secondary">
          {item?.artists.map((item, index) => (index ? ', ' : '') + item.name)}
        </span>
      </div>
      <div className="p-tracks-album font-1">
        <span className="text-secondary h6">{item?.album?.name}</span>
      </div>
      <div className="p-tracks-btn">
        <div className="more-btn-div">
          <button
            className="more-btn"
            onClick={() => setShowDropDown(!showDropDown)}
          >
            <MoreVertIcon style={{ color: 'grey' }} />
          </button>

          <div className={'more-options ' + (showDropDown && 'd-block')}>
            <TrackDropDown item={item} closeMenu={closeMenu} />
          </div>
        </div>
        <span className="text-secondary d-lg-block d-none">
          {millisToMinutesAndSeconds(item?.duration_ms)}
        </span>
        <PlayFromList index={index} list={toptracks} type="small" />
      </div>
    </div>
  );
}
export default ArtistTracks;
