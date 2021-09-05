import axios from 'axios';
import { useEffect, useState } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
import Playlists from '../templates/playlist';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const accessToken = window.localStorage.getItem('token');
function Library() {
  const [myplaylists, setMyplaylists] = useState();
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
  }, []);
  return (
    <div>
      <Playlists show={myplaylists} listName={'My playlists'} />
    </div>
  );
}
export default Library;
