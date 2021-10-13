import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import SpotifyWebApi from 'spotify-web-api-node';
import LibraryPlaylists from '../templates/library-playlist';
import NewPlaylistForm from './new-playlist-form';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Library() {
  const [myplaylists, setMyplaylists] = useState();
  const [{ token }, dispatch] = useDataHandlerValue();
  const [showModal, setShowModal] = useState(false);
  const accessToken = window.localStorage.getItem('token') || token;

  spotify.setAccessToken(accessToken);
  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setMyplaylists(res.data.items);
      })
      .catch((err) => console.log(err));
    axios
      .get('https://api.spotify.com/v1/me/albums', {
        headers: {
          Authorization: 'Bearer ' + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [accessToken]);
  return (
    <div className="display-cut">
      <div className="d-flex justify-content-end">
        <button className="create-pl-btn" onClick={() => setShowModal(true)}>
          <ControlPointIcon />
          <span className="mx-1 font-1">Create Playlist</span>
        </button>
      </div>
      {showModal && (
        <NewPlaylistForm
          setShowModal={setShowModal}
          accessToken={accessToken}
          spotify={spotify}
        />
      )}
      <LibraryPlaylists show={myplaylists} listName={'My playlists'} />
    </div>
  );
}
export default Library;
