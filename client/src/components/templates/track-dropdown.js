import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function TrackDropDown({ item, closeMenu, isUsers, playlistId }) {
  const [{ token }, dispatch] = useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);
  console.log(item);

  const addToQueue = (uri) => {
    if (!accessToken) return;
    spotify
      .addToQueue(uri)
      .then(() => {
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
      `https://open.spotify.com/track/${item.id}`,
      '_blank' // <- This is what makes it open in a new window.
    );
    closeMenu();
    e.stopPropagation();
  };

  const handleAddToPlaylist = (e) => {
    dispatch({
      type: 'SET_TRACK_TO_ADD',
      trackToAdd: item,
    });
    dispatch({
      type: 'TOGGLE_ADD_TO_PLAYLIST',
      show: true,
    });
    closeMenu();
    e.stopPropagation();
  };

  const handleRemove = (e) => {
    var track = [{ uri: item.uri }];
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
          onClick={() => addToQueue(item.uri)}
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
