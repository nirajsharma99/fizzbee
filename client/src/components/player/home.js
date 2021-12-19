import NewReleases from '../templates/homeComponents/newreleases';
import TrackHolders from '../templates/trackholders';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import FeaturedPlaylists from '../templates/homeComponents/featuredPlaylist';
import Categories from '../templates/homeComponents/categories';
import { useEffect } from 'react';
import Artists from '../templates/artists';
import useSpotify from '../hooks/useSpotify';

function Home() {
  //console.log(props);
  const [
    {
      mytoptracks,
      myTopArtists,
      featuredPlaylists,
      categories,
      bollywoodHits,
      bollywoodNew,
      token,
    },
    dispatch,
  ] = useDataHandlerValue();
  //console.log(categories);
  const spotify = useSpotify();
  useEffect(() => {
    if (token) {
      spotify
        .getPlaylistTracks('37i9dQZF1DXd8cOUiye1o2', {
          offset: 1,
          limit: 50,
          fields: 'items',
        })
        .then(function (data) {
          //console.log('bolly new', data.body.items);
          dispatch({
            type: 'SET_BOLLYWOOD_NEW',
            bollywoodNew: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      spotify
        .getMyTopTracks()
        .then((x) => {
          dispatch({
            type: 'MY_TOP_TRACKS',
            mytoptracks: x.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      spotify
        .getFollowedArtists()
        .then((x) => {
          dispatch({
            type: 'SET_ARTISTS',
            followedArtists: x.body,
          });
        })
        .catch((err) => console.log(err));

      spotify
        .getFeaturedPlaylists({
          limit: 20,
          country: 'IN',
          locale: 'en_IN',
        })
        .then(function (data) {
          dispatch({
            type: 'SET_FEATURED_PLAYLIST',
            featuredPlaylists: data.body,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      spotify
        .getCategories({
          limit: 50,
          offset: 0,
          country: 'IN',
        })
        .then(function (data) {
          /*console.log(
          'caetgories:',
          data.body.categories.items.map((x) => x.name + ',')
        );*/
          dispatch({
            type: 'SET_CATEGORIES',
            categories: data.body.categories,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });
      spotify
        .getPlaylistTracks('37i9dQZF1DX0XUfTFmNBRM', {
          offset: 1,
          limit: 50,
          fields: 'items',
        })
        .then(function (data) {
          //console.log('The playlist contains these tracks', data.body.items);
          dispatch({
            type: 'SET_BOLLYWOOD_HITS',
            bollywoodHits: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });

      spotify
        .getNewReleases({ country: 'IN' })
        .then((newReleases) => {
          //console.log('new releases', newReleases.body);
          dispatch({
            type: 'NEW_RELEASES',
            newReleases: newReleases.body.albums.items,
          });
        })
        .catch((err) => console.log(err));

      spotify
        .getMyTopArtists({ limit: 50 })
        .then(function (data) {
          dispatch({
            type: 'SET_MY_TOP_ARTISTS',
            myTopArtists: data.body.items,
          });
        })
        .catch((err) => {
          console.log('Something went wrong!', err);
        });

      spotify.getMyDevices().then(
        function (data) {
          let availableDevices = data.body.devices;
          //console.log(availableDevices);
          dispatch({
            type: 'SET_MY_DEVICES',
            mydevices: availableDevices,
          });
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  }, [token]);

  return (
    <div className="display-cut font-1" style={{ paddingBottom: '200px' }}>
      <NewReleases />
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
