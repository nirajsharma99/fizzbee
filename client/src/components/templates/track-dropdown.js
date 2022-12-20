import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaylist } from '../store/actions/library-actions';
import {
  setNotibar,
  setTrackToAdd,
  toggleAddToPlaylist,
} from '../store/actions/app-actions';
import { play } from '../store/actions/spotify-actions';

function TrackDropDown({ item, closeMenu, isUsers, playlistId, setChanges }) {
  const { currentPlaylist } = useSelector((state) => state.library);
  const { token, current, deviceId } = useSelector((state) => state.player);
  const dispatch = useDispatch();
  const spotify = useSpotify();
  const check = item?.album ? item : item?.track ? item.track : item;
  //console.log(check, isUsers, playlistId)
  const addToQueue = (uri) => {
    if (!token) return;
    if (!currentPlaylist) {
      dispatch(play(check));
      dispatch(setNotibar('Added to Queue & Playing :)', true, 7000));
      return;
    }
    spotify
      .addToQueue(uri, { device_id: deviceId })
      .then(() => {
        var list = currentPlaylist;
        dispatch(setNotibar('Added to Queue :)', true, 7000));
        let getIndex = currentPlaylist.findIndex(song => song.uri === current?.uri);
        //Getting images for album tracks
        if (!check?.album?.images) {
          spotify.getTrack(check?.id).then((res) => {
            item.album = res.body.album;
            console.log(res)
            console.log(item)
          }).catch((err) => console.log(err))
        }
        list.splice(getIndex + 1, 0, item);
        closeMenu();
      })
      .catch((err) => console.log(err));

    /*axios.post({
          method: 'post',
          url: `https://api.spotify.com/v1/me/player/queue?uri=${uri}`,
          headers: { Authorization: `Bearer ${accessToken}` },
        })
          .then((res) => console.log(res.data))
          .catch((err) => console.log(err));*/
  };

  const openInSpotify = (e) => {
    window.open(
      `https://open.spotify.com/track/${check.id}`,
      '_blank' // <- This is what makes it open in a new window.
    );
    closeMenu();
    e.stopPropagation();
  };

  const handleAddToPlaylist = (e) => {
    dispatch(setTrackToAdd(check));
    dispatch(toggleAddToPlaylist(true));
    closeMenu();
    e.stopPropagation();
  };

  const handleRemove = (e) => {
    var track = [{ uri: check?.uri }];
    spotify.removeTracksFromPlaylist(playlistId, track).then(
      function (data) {
        console.log('Track removed from playlist!');
        dispatch(setNotibar('Removed from playlist!', true));
        setChanges((prev) => ({ changes: !prev.changes }));
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
    e.stopPropagation();
    closeMenu();
  };
  return (
    <ul className="more-options-list">
      <li>
        <button
          className="more-options-btn"
          onClick={() => addToQueue(check.uri)}
        >
          <PlaylistAddIcon style={{ color: 'gray' }} fontSize="medium" />
          <span className="ms-2">Add to queue</span>
        </button>
      </li>
      <li>
        <button className="more-options-btn" onClick={handleAddToPlaylist}>
          <QueueMusicIcon style={{ color: 'gray' }} fontSize="medium" />
          <span className="ms-2">Add to Playlist</span>
        </button>
      </li>
      {isUsers && (
        <li>
          <button className="more-options-btn" onClick={handleRemove}>
            <DeleteForeverTwoToneIcon
              style={{ color: 'gray' }}
              fontSize="medium"
            />
            <span className="ms-2">Remove</span>
          </button>
        </li>
      )}
      <li>
        <button className="more-options-btn" onClick={openInSpotify}>
          <LaunchIcon style={{ color: 'gray' }} fontSize="medium" />
          <span className="ms-2">Open in Spotify</span>
        </button>
      </li>
    </ul>
  );
}
export default TrackDropDown;
