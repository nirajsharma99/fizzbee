import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import MoreVertIcon from '@material-ui/icons//MoreVert';
import PlayFromList from '../utils/playfromlist';
import { useEffect, useState, useRef } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import axios from 'axios';

function ArtistTracks({ item, index, toptracks, millisToMinutesAndSeconds }) {
  const [show, setShow] = useState(false);
  const trackItemRef = useRef();
  const [{ token, current, deviceId }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  //console.log(playlist);
  const isCurrent = current?.id === item?.id;

  useDetectOutsideClick(trackItemRef, closeMenu);

  function closeMenu() {
    setShow(false);
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

  const addToQueue = (uri) => {
    if (!accessToken) return;
    console.log(accessToken);
    console.log(deviceId);

    axios
      .post(
        `https://api.spotify.com/v1/me/player/queue?uri=${uri}&device_id=${deviceId}`,
        {
          headers: {
            Authorization: 'Bearer ' + accessToken,
          },
        }
      )
      .then((res) => console.log(res.data))
      .catch((err) => console.log(err));
  };

  return (
    <div
      key={index}
      className="p-t-container"
      style={{
        background: isCurrent ? 'rgba(0, 255, 127,0.75)' : '',
      }}
      ref={trackItemRef}
    >
      <div className="p-tracks-pic">
        <img
          src={item?.album?.images[2].url}
          style={{ borderRadius: '10px' }}
        />
      </div>
      <div className="p-tracks-info font-1 ms-2">
        <span className="text-light h5 mb-0">{item?.name}</span>
        <span className="text-secondary">
          {item?.artists.map((item, index) => (index ? ', ' : '') + item.name)}
        </span>
      </div>
      <div className="p-tracks-album font-1">
        <span className="text-secondary h6">{item?.album?.name}</span>
      </div>
      <div className="p-tracks-btn">
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
        <span className="text-secondary d-lg-block d-none">
          {millisToMinutesAndSeconds(item?.duration_ms)}
        </span>
        <PlayFromList index={index} list={toptracks} type="small" />
      </div>
    </div>
  );
}
export default ArtistTracks;
