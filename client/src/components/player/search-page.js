import { useEffect, useState } from 'react';
import Artists from '../templates/artists';
import Playlists from '../templates/playlist';
import TrackHolders from '../templates/trackholders';
import Album from '../templates/album';
import {
  searchTracksByArtist,
  spotifySearch,
} from '../store/actions/spotify-actions';

function SearchPage() {
  const [searchstr, setSearchstr] = useState(
    window.localStorage.getItem('searchstr')
  );
  const [sartist, setSartist] = useState();
  const [salbums, setSAlbums] = useState();
  const [stracks, setStracks] = useState();
  const [splaylist, setSplaylist] = useState();
  const [strackoartist, setStrackoartist] = useState();

  function handleSearch(e) {
    setSearchstr(e.target.value);
    window.localStorage.setItem('searchstr', e.target.value);
  }

  useEffect(() => {
    if (searchstr) {
      spotifySearch(searchstr)
        .then((res) => {
          const { albums, artists, playlists, tracks } = res.body;
          setSAlbums(albums.items);
          setStracks(tracks.items);
          setSartist(artists.items);
          setSplaylist(playlists.items);
        })
        .catch((err) => console.log(err));

      // Search tracks whose artist's name contains searchstr
      searchTracksByArtist(searchstr).then(
        function (data) {
          let songs = data.body.tracks.items;
          setStrackoartist(songs);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }, [searchstr]);

  return (
    <div className="display-cut">
      <div className="d-flex align-items-center justify-content-center py-4">
        <div className="search">
          <ion-icon name="search-outline"></ion-icon>
          <input
            type="text"
            className="escapeEvent ms-2"
            value={searchstr}
            onChange={(e) => handleSearch(e)}
            placeholder="Artists, songs, playlists"
          />
        </div>
      </div>
      {stracks && <TrackHolders show={stracks} listName={'Tracks'} />}
      {salbums && <Album list={salbums} />}
      {sartist && <Artists show={sartist} listName={'Artists'} />}
      {splaylist && <Playlists show={splaylist} listName={'Playlist'} />}

      {strackoartist && (
        <TrackHolders
          show={strackoartist}
          listName={'Tracks by artists name'}
        />
      )}
    </div>
  );
}
export default SearchPage;
