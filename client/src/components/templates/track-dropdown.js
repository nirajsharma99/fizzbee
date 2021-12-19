import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotify from '../hooks/useSpotify';

function TrackDropDown({ item, closeMenu, isUsers, playlistId }) {
  const [{ token, currentPlaylist }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();
  const check = item?.album ? item : item?.track;

  const addToQueue = (uri) => {
    //console.log(uri);
    if (!token) return;
    spotify
      .addToQueue(uri)
      .then(() => {
        var list = currentPlaylist;
        dispatch({
          type: 'SET_NOTIBAR',
          errorMsg: 'Added to Queue :)',
          errorType: true,
        });
        dispatch({
          type: 'SET_CURRENT_PLAYLIST',
          list: list.concat(item),
        });
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
    dispatch({
      type: 'SET_TRACK_TO_ADD',
      trackToAdd: check,
    });
    dispatch({
      type: 'TOGGLE_ADD_TO_PLAYLIST',
      show: true,
    });
    closeMenu();
    e.stopPropagation();
  };

  const handleRemove = (e) => {
    var track = [{ uri: check.uri }];
    spotify.removeTracksFromPlaylist(playlistId, track).then(
      function (data) {
        console.log('Track removed from playlist!');
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
          <PlaylistAddIcon style={{ color: 'gray' }} fontSize="small" />
          <span className="ms-2">Add to queue</span>
        </button>
      </li>
      <li>
        <button className="more-options-btn" onClick={handleAddToPlaylist}>
          <QueueMusicIcon style={{ color: 'gray' }} fontSize="small" />
          <span className="ms-2">Add to Playlist</span>
        </button>
      </li>
      {isUsers && (
        <li>
          <button className="more-options-btn" onClick={handleRemove}>
            <DeleteForeverTwoToneIcon
              style={{ color: 'gray' }}
              fontSize="small"
            />
            <span className="ms-2">Remove from Playlist</span>
          </button>
        </li>
      )}
      <li>
        <button className="more-options-btn" onClick={openInSpotify}>
          <LaunchIcon style={{ color: 'gray' }} fontSize="small" />
          <span className="ms-2">Open in Spotify</span>
        </button>
      </li>
    </ul>
  );
}
export default TrackDropDown;
