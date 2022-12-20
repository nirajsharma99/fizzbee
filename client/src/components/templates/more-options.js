import TrackDropDown from './track-dropdown';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useRef, useState } from 'react';

function MoreOptions({ item, isUsers, playlistId, setChanges }) {
  const [showDropDown, setShowDropDown] = useState(false);
  const optionsRef = useRef();
  useDetectOutsideClick(optionsRef, closeMenu);
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

      <div className={'more-options ' + (showDropDown && 'd-block')} ref={optionsRef}>
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
