import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import CategoryPlaylists from '../templates/category-playlist';

function CategoryPage(props) {
  const id = props?.match?.params.id;
  const [myplaylists, setMyplaylists] = useState();

  const spotify = useSpotify();
  useEffect(() => {
    if (spotify) {
      spotify
        .getPlaylistsForCategory(id, {
          country: 'IN',
          limit: 50,
          offset: 0,
        })
        .then(
          function (data) {
            const { items } = data.body.playlists;
            setMyplaylists(items);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
  }, [spotify]);
  return (
    <div className="display-cut">
      <CategoryPlaylists show={myplaylists} />
    </div>
  );
}
export default CategoryPage;
