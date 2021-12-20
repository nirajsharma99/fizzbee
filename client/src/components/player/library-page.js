import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import LibraryPlaylists from '../templates/library-playlist';
import NewPlaylistForm from './new-playlist-form';

function LibraryPage() {
  const [myplaylists, setMyplaylists] = useState();
  const [{ token }, dispatch] = useDataHandlerValue();
  const [showModal, setShowModal] = useState(false);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    axios
      .get('https://api.spotify.com/v1/me/playlists', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
        setMyplaylists(res.data.items);
      })
      .catch((err) => console.log(err));
    axios
      .get('https://api.spotify.com/v1/me/albums', {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((res) => {
        //console.log(res.data);
      })
      .catch((err) => console.log(err));
  }, [token, changes]);

  return (
    <div className="display-cut">
      <div className="d-flex justify-content-end">
        <button className="create-pl-btn" onClick={() => setShowModal(true)}>
          <ControlPointIcon />
          <span className="mx-1 font-1">Create Playlist</span>
        </button>
      </div>
      {showModal && (
        <NewPlaylistForm setShowModal={setShowModal} setChanges={setChanges} />
      )}
      <LibraryPlaylists show={myplaylists} listName={'My playlists'} />
    </div>
  );
}
export default LibraryPage;
