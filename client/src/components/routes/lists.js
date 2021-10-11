import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import PlayFromList from '../utils/playfromlist';
import MoreVertIcon from '@material-ui/icons//MoreVert';
import { useState } from 'react';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';

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
        <div key={index} className="p-t-container">
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
            <span className="text-secondary h6">
              {item?.track?.album?.name}
            </span>
          </div>
          <div className="p-tracks-btn ">
            <div className="more-btn-div">
              <button className="more-btn" onClick={() => setShow(!show)}>
                <MoreVertIcon style={{ color: 'grey' }} />
              </button>

              <div className={'more-options ' + (show && 'd-block')}>
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
      ))}
    </div>
  );
}
export default ListTracks;
