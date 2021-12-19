import CloseIcon from '@material-ui/icons/Close';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotify from '../hooks/useSpotify';
import axios from 'axios';

function AddToPlaylist() {
  const [{ settings, token, user }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  const [myplaylists, setMyplaylists] = useState();
  const [checkedPlaylists, setCheckedPlaylists] = useState();
  const [track, setTrack] = useState();
  //console.log(settings?.trackToAdd);

  useEffect(() => {
    spotify
      .getTrack(settings?.trackToAdd?.id)
      .then((res) => {
        console.log(res.body);
        setTrack(res.body);
      })
      .catch((err) => console.log(err));
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        console.log(res.data);
        let lists = [];
        res.data.items.map((item, index) => {
          if (user?.display_name === item?.owner?.display_name) {
            lists.push(item);
          }
          return lists;
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
          dispatch({
            type: 'SET_NOTIBAR',
            errorMsg: 'Tracks Added :)',
            errorType: true,
          });
          closeModal();
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }

  //console.log('checked', checkedPlaylists);

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
            {isChecked && (
              <CheckCircleTwoToneIcon style={{ color: 'var(--main-theme)' }} />
            )}
          </div>
          <div className="atp-p-name font-1-s">
            <span style={{ color: isChecked ? 'var(--main-theme)' : 'white' }}>
              {item.name}
            </span>
          </div>
          <div className="atp-p-count font-1-s">
            <span style={{ color: isChecked ? 'var(--main-theme)' : 'white' }}>
              {item.tracks.total + ' tracks'}
            </span>
          </div>
        </label>
      </>
    );
  }
  return (
    <div className="atp-outer" style={{ zIndex: '50' }}>
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
        <div className="atp-footer">
          <button className="cancel-btn" onClick={closeModal}>
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
