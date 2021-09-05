import NewReleases from './homeComponents/newreleases';
import TrackHolders from './homeComponents/toptracks';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import MyTopArtists from './homeComponents/myTopArtists';
import FeaturedPlaylists from './homeComponents/featuredPlaylist';
import Categories from './homeComponents/categories';
import BollywoodHits from './homeComponents/bollywoodHits';
import { useEffect } from 'react';

function Home({ play, playFromList }) {
  const [
    {
      newReleases,
      mytoptracks,
      followedArtists,
      myTopArtists,
      featuredPlaylists,
      categories,
      bollywoodHits,
      bollywoodNew,
    },
    dispatch,
  ] = useDataHandlerValue();
  //console.log(categories);

  return (
    <div className="" style={{ paddingBottom: '200px' }}>
      <NewReleases play={play} playFromList={playFromList} />
      {mytoptracks && (
        <div>
          <p className="section-heading mb-0">My top tracks</p>
          <TrackHolders show={mytoptracks} play={play} />
        </div>
      )}
      {myTopArtists && <MyTopArtists />}
      {featuredPlaylists && <FeaturedPlaylists />}
      {categories && <Categories categories={categories} />}
      {bollywoodHits && (
        <BollywoodHits
          play={play}
          show={bollywoodHits}
          listName={'Bollywood Hits'}
        />
      )}
      {bollywoodNew && (
        <BollywoodHits
          play={play}
          show={bollywoodNew}
          listName={'New Releases Bollywood'}
        />
      )}
    </div>
  );
}
export default Home;
