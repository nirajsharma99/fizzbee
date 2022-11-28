import TrackDropDown from './track-dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';

function MoreOptions({ trackItemRef, item, isUsers, playlistId, setChanges }) {
  const [showDropDown, setShowDropDown] = useState(false);

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
      function handleScroll() {
        if (showDropDown) callback();
      }

      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('scroll', handleScroll, true);
      return () => {
        document.removeEventListener('mousedown', handleClickOutside);
        document.removeEventListener('scroll', handleScroll);
      };
    }, [ref, callback]);
  }

  return (
    <div className="more-btn-div">
      <button
        className="more-btn"
        onClick={() => setShowDropDown(!showDropDown)}
      >
        <MoreVertIcon style={{ color: 'white' }} />
      </button>

      <div className={'more-options ' + (showDropDown && 'd-block')}>
        <TrackDropDown
          item={item}
          closeMenu={closeMenu}
          isUsers={isUsers}
          playlistId={playlistId}
          setChanges={setChanges}
        />
      </div>
    </div>
  );
}
export default MoreOptions;
