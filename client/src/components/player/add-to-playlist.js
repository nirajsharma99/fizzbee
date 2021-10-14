import CloseIcon from '@material-ui/icons/Close';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
import axios from 'axios';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function AddToPlaylist() {
  const [{ settings, token, user }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);

  const [myplaylists, setMyplaylists] = useState();
  const [checkedPlaylists, setCheckedPlaylists] = useState();
  const [track, setTrack] = useState();

  useEffect(() => {
    spotify
      .getTrack(settings.trackToAdd.id)
      .then((res) => {
        console.log(res.body);
        setTrack(res.body);
      })
      .catch((err) => console.log(err));
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        let lists = [];
        res.data.items.map((item, index) => {
          if (user?.display_name === item?.owner?.display_name) {
            lists.push(item);
          }
        });
        setMyplaylists(lists);
        setCheckedPlaylists(initCheckboxes(lists));
      })
      .catch((err) => console.log(err));
  }, []);

  function closeModal() {
    dispatch({
      type: 'TOGGLE_ADD_TO_PLAYLIST',
      show: false,
    });
  }
  function initCheckboxes(playlists, value = false) {
    const object = {};

    playlists.forEach((playlist) => {
      object[playlist.id] = value;
    });

    return object;
  }

  const toggleCheckedPlaylist = (playlistId) => {
    setCheckedPlaylists({
      ...checkedPlaylists,
      [playlistId]: !checkedPlaylists[playlistId],
    });
  };

  function handleSubmit(e) {
    const playlistIds = Object.keys(checkedPlaylists).filter(
      (playlistId) => checkedPlaylists[playlistId]
    );
    for (let i = 0; i < playlistIds.length; i++) {
      spotify.addTracksToPlaylist(playlistIds[i], [track?.uri]).then(
        function (data) {
          console.log('Added tracks to playlist!');
          closeModal();
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }

  console.log('checked', checkedPlaylists);

  function FormCheckBox({ index, item, isChecked }) {
    return (
      <>
        <input
          type="checkbox"
          value={isChecked}
          id={item.id}
          onChange={() => toggleCheckedPlaylist(item.id)}
          hidden
        />
        <label htmlFor={item.id} key={index} className="atp-p-info py-2">
          <div className="atp-p-check">
            {isChecked && <CheckCircleTwoToneIcon style={{ color: 'green' }} />}
          </div>
          <div className="atp-p-name font-1-s">
            <span className="text-light">{item.name}</span>
          </div>
          <div className="atp-p-count font-1-s">
            <span className="text-light">{item.tracks.total + ' tracks'}</span>
          </div>
        </label>
      </>
    );
  }
  return (
    <div className="atp-outer">
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Add to Playlist</span>
          <button className="t-btn" onClick={closeModal}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} />
          </button>
        </div>
        <div className="atp-inner">
          <div className="atp-t-info font-1-s">
            <img
              src={track?.album?.images[1]?.url}
              alt="track-to-add"
              width="250"
            />

            <span className="text-light">{track?.name}</span>
            <span className="text-secondary">
              {track?.artists.map(
                (item, index) => (index ? ', ' : '') + item.name
              )}
            </span>
          </div>
          <div className="font-1-s px-3 py-2 text-light">
            <span className="px-2 h5">Select playlists to add to</span>
            <hr />
            {myplaylists?.map((item, index) => (
              <FormCheckBox
                key={index}
                index={index}
                item={item}
                isChecked={checkedPlaylists?.[item.id]}
              />
            ))}
          </div>
        </div>
        <div className="atp-bottom">
          <button className="t-btn text-light me-3" onClick={closeModal}>
            Cancel
          </button>
          <button className="add-btn" onClick={handleSubmit}>
            Add
          </button>
        </div>
      </div>
    </div>
  );
}
export default AddToPlaylist;
