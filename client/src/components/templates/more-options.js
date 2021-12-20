import TrackDropDown from './track-dropdown';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/styles';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useEffect, useState } from 'react';

const useClasses = makeStyles((theme) => ({
  iconContainer: {
    '&:hover $icon': {
      color: 'rgb(255,255,255)',
    },
    display: 'inline-block',
    padding: 0,
    minHeight: 0,
    minWidth: 0,
  },

  icon: {
    color: 'rgba(255,255,255,0.8)',
  },
}));
function MoreOptions({ trackItemRef, item, isUsers, playlistId, setChanges }) {
  const [showDropDown, setShowDropDown] = useState(false);

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
