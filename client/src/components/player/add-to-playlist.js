import CloseIcon from '@material-ui/icons/Close';
import { useDataHandlerValue } from '../contextapi/DataHandler';

function AddToPlaylist() {
  const [{}, dispatch] = useDataHandlerValue();
  function closeModal() {
    dispatch({
      type: 'TOGGLE_ADD_TO_PLAYLIST',
      show: false,
    });
  }
  return (
    <div className="atp-outer">
      <div className="atp">
        <div className="atp-header font-1 ">
          <span className="text-light p-1">Add to Playlist</span>
          <button className="t-btn" onClick={closeModal}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} />
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddToPlaylist;
