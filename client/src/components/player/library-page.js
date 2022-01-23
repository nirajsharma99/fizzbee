import axios from 'axios';
import { useEffect, useState } from 'react';
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import LibraryPlaylists from '../templates/library-playlist';
import NewPlaylistForm from './new-playlist-form';
import { useSelector } from 'react-redux';
import { getMyPlaylists } from '../store/actions/spotify-actions';

function LibraryPage() {
  const [myplaylists, setMyplaylists] = useState();
  const { token } = useSelector((state) => state.player);
  const [showModal, setShowModal] = useState(false);
  const [changes, setChanges] = useState(false);

  useEffect(() => {
    getMyPlaylists(token)
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
