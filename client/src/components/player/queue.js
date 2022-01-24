import CloseIcon from '@material-ui/icons/Close';
import { useSelector, useDispatch } from 'react-redux';
import { toggleQueue } from '../store/actions/app-actions';
import CurrentPlaylist from '../templates/current-playlist';

function Queue() {
  const dispatch = useDispatch();
  const { currentPlaylist } = useSelector((state) => state.library);

  function closeModal() {
    dispatch(toggleQueue(false));
  }
  return (
    <div className="atp-outer">
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Current Playlist</span>
          <button className="t-btn q-close" onClick={closeModal}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} />
          </button>
        </div>
        <div className="atp-inner px-1">
          {currentPlaylist?.map((item, index) => (
            <CurrentPlaylist
              key={index}
              index={index}
              item={item}
              list={currentPlaylist}
              isUsers={null}
              playlistId={null}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
export default Queue;
