import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import MoreVertIcon from '@material-ui/icons//MoreVert';
import PlayFromList from '../utils/playfromlist';
import { useEffect, useState, useRef } from 'react';
function TrackItems({
  addToQueue,
  item,
  index,
  list,
  millisToMinutesAndSeconds,
}) {
  const [showDropDown, setShowDropDown] = useState(false);
  const trackItemRef = useRef();

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
    <div key={index} className="p-t-container" ref={trackItemRef}>
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
            <ul className="more-options-list">
              <li>
                <button
                  className="more-options-btn"
                  onClick={() => addToQueue(item.uri)}
                >
                  <PlaylistAddIcon style={{ color: 'gray' }} />
                  <span className="ms-2">Add to queue</span>
                </button>
              </li>
              <li>
                <button className="more-options-btn">
                  <QueueMusicIcon style={{ color: 'gray' }} />
                  <span className="ms-2">Add to Playlist</span>
                </button>
              </li>
            </ul>
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
