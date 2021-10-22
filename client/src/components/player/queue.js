import CloseIcon from '@material-ui/icons/Close';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import CurrentPlaylist from '../templates/current-playlist';

function Queue() {
  const [{ currentPlaylist }, dispatch] = useDataHandlerValue();
  //console.log(currentPlaylist);
  function closeModal() {
    dispatch({
      type: 'TOGGLE_QUEUE',
      show: false,
    });
  }
  return (
    <div className="atp-outer">
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Current Playlist</span>
          <button className="t-btn" onClick={closeModal}>
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
