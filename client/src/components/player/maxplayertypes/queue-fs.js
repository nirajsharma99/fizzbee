import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import CurrentPlaylist from '../../templates/current-playlist';
import { useState } from 'react';
function QueueFS() {
  const [{ currentPlaylist }, dispatch] = useDataHandlerValue();
  //console.log(currentPlaylist);
  const [maximise, setMaximise] = useState(true);

  function toggleMaxmin() {
    setMaximise(!maximise);
  }
  return (
    <div className="atp-outer-fs">
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Current Playlist</span>
          <div className="d-flex">
            <button className="t-btn" onClick={toggleMaxmin}>
              {maximise ? (
                <KeyboardArrowUpIcon
                  fontSize="large"
                  style={{ color: 'white' }}
                />
              ) : (
                <KeyboardArrowDownIcon
                  fontSize="large"
                  style={{ color: 'white' }}
                />
              )}
            </button>
          </div>
        </div>
        <div className="atp-inner px-1" hidden={maximise}>
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
export default QueueFS;
