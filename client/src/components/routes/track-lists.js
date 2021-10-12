import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import PlayFromList from '../utils/playfromlist';
import MoreVertIcon from '@material-ui/icons//MoreVert';
import { useState } from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import TrackItems from './track-item';

function ListTracks({ list }) {
  const [show, setShow] = useState(false);

  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  const addToQueue = (uri) => {
    console.log('hj');

    /*let list = playlist;
    dispatch({
      type: 'SET_PLAYLIST',
      playlist: list.push(uri),
    });*/
  };
  return (
    <div className=" mt-3">
      <div className="d-flex">
        <div className="p-tracks-pic text-left text-secondary"></div>
        <div className="p-tracks-info d-inline-block p-1 ms-2 text-left text-secondary">
          <span className="p-heading">TITLE</span>
        </div>
        <div className="p-tracks-album d-inline-block p-1 text-left text-secondary">
          <span className="p-heading">ALBUM</span>
        </div>
        <div className="p-tracks-btn text-center text-secondary">
          <ScheduleTwoToneIcon style={{ color: 'rgb(0, 255, 127)' }} />
        </div>
      </div>
      {list?.map((item, index) => (
        <TrackItems
          key={index}
          item={item}
          addToQueue={addToQueue}
          list={list}
          millisToMinutesAndSeconds={millisToMinutesAndSeconds}
        />
      ))}
    </div>
  );
}
export default ListTracks;
