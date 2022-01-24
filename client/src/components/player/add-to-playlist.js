import CloseIcon from '@material-ui/icons/Close';
import CheckCircleTwoToneIcon from '@material-ui/icons/CheckCircleTwoTone';
import { useEffect, useRef, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setNotibar, toggleAddToPlaylist } from '../store/actions/app-actions';
import { getMyPlaylists, getTrack } from '../store/actions/spotify-actions';

function AddToPlaylist() {
  const dispatch = useDispatch();
  const atpRef = useRef();
  const user = useSelector((state) => state.user.user);
  const settings = useSelector((state) => state.app.settings);
  const token = useSelector((state) => state.player.token);
  const spotify = useSpotify();

  const [myplaylists, setMyplaylists] = useState();
  const [checkedPlaylists, setCheckedPlaylists] = useState();
  const [track, setTrack] = useState();

  useEffect(() => {
    getTrack(settings?.trackToAdd?.id)
      .then((res) => {
        //console.log(res.body);
        setTrack(res.body);
        getMyPlaylists(token)
          .then((res) => {
            //console.log(res.data);
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
      })
      .catch((err) => console.log(err));
  }, [settings.isAddToPlaylistOpen]);

  useEffect(() => {
    atpRef.current.style.display = settings.isAddToPlaylistOpen
      ? 'flex'
      : 'none';
  }, [settings.isAddToPlaylistOpen]);

  function closeModal() {
    dispatch(toggleAddToPlaylist(false));
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
          dispatch(setNotibar('Tracks Added :)', true));
          closeModal();
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }

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
    <div ref={atpRef} className="atp-outer" style={{ zIndex: '50' }}>
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Add to Playlist</span>
          <button className="t-btn q-close" onClick={closeModal}>
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
