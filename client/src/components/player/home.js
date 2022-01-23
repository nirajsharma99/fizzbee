import NewReleases from '../templates/homeComponents/newreleases';
import TrackHolders from '../templates/trackholders';
import FeaturedPlaylists from '../templates/homeComponents/featuredPlaylist';
import Categories from '../templates/homeComponents/categories';
import { useEffect } from 'react';
import Artists from '../templates/artists';
import { getHome } from '../store/actions/spotify-actions';
import { useDispatch, useSelector } from 'react-redux';

function Home() {
  const {
    mytoptracks,
    myTopArtists,
    featuredPlaylists,
    categories,
    bollywoodHits,
    bollywoodNew,
    newReleases,
  } = useSelector((state) => state.library);
  const token = useSelector((state) => state.player.token);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!token) return;
    dispatch(getHome(token));
  }, [token]);

  return (
    <div className="display-cut font-1">
      <NewReleases newReleases={newReleases} />
      <TrackHolders show={mytoptracks} listName="My top tracks" />
      <Artists show={myTopArtists} listName="Top Artists" />
      <FeaturedPlaylists show={featuredPlaylists} />
      {categories && <Categories categories={categories} />}
      <TrackHolders show={bollywoodHits} listName={'Bollywood Hits'} />
      <TrackHolders show={bollywoodNew} listName={'New Releases Bollywood'} />
    </div>
  );
}
export default Home;
