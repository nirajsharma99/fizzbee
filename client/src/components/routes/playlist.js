import { useEffect, useState } from 'react';
import './styling/playlist.css';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

const accessToken = window.localStorage.getItem('token');
function Playlist(props) {
  spotify.setAccessToken(accessToken);
  const [playlist, setPlaylist] = useState();

  const id = props?.match?.params.id;
  console.log(props?.match?.params.id);
  useEffect(() => {
    if (id) {
      spotify
        .getPlaylist(id)
        .then((res) => {
          console.log('fetched', res.body);
          setPlaylist({ info: res.body, tracks: res.body.tracks.items });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <div>
      <div className="p-info">
        <div className="pl">
          <img src={playlist?.info.images[0]?.url} width="300" />
        </div>
        <div className="pr px-3 py-4 d-flex flex-column">
          <span className="display-5 text-light">{playlist?.info.name}</span>
          <span className="h4 text-light">{playlist?.info.description}</span>
          <span className="text-light">{playlist?.tracks?.length} tracks</span>
        </div>
      </div>
    </div>
  );
}
export default Playlist;
