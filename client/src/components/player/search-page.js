import { useState } from 'react';
import Artists from '../templates/artists';
import Playlists from '../templates/playlist';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import SpotifyWebApi from 'spotify-web-api-node';
import TrackHolders from '../templates/trackholders';
import Album from '../templates/album';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function SearchPage(props) {
  //console.log(props);
  const [{ token }, dispatch] = useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');

  const [searchstr, setSearchstr] = useState();
  const [sartist, setSartist] = useState();
  const [salbums, setSAlbums] = useState();
  const [stracks, setStracks] = useState();
  const [splaylist, setSplaylist] = useState();
  const [strackoartist, setStrackoartist] = useState();
  spotify.setAccessToken(accessToken);

  function handleSearch(e) {
    setSearchstr(e.target.value);
    // Search tracks whose name, album or artist contains 'Love'

    if (searchstr) {
      spotify
        .search(searchstr, ['track', 'album', 'playlist', 'show', 'artist'])
        .then((res) => {
          const { albums, artists, playlists, tracks } = res.body;
          setSAlbums(albums.items);
          setStracks(tracks.items);
          setSartist(artists.items);
          setSplaylist(playlists.items);
        })
        .catch((err) => console.log(err));

      // Search tracks whose artist's name contains 'Love'
      spotify.searchTracks(`artist:${searchstr}`).then(
        function (data) {
          let songs = data.body.tracks.items;
          setStrackoartist(songs);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }

  return (
    <>
      <div className="display-cut">
        <div className="d-flex align-items-center justify-content-center py-4">
          <div className="search">
            <ion-icon name="search-outline"></ion-icon>
            <input
              type="text"
              className="escapeEvent"
              value={searchstr}
              onChange={(e) => handleSearch(e)}
              placeholder="Artists, songs, playlists"
            />
          </div>
        </div>
        {stracks && <TrackHolders show={stracks} listName={'Search tracks'} />}
        {salbums && <Album list={salbums} />}
        {sartist && <Artists show={sartist} listName={'Search artists'} />}
        {splaylist && (
          <Playlists show={splaylist} listName={'Search playlist'} />
        )}

        {strackoartist && (
          <TrackHolders
            show={strackoartist}
            listName={'Search tracks by artists name'}
          />
        )}
      </div>
    </>
  );
}
export default SearchPage;
