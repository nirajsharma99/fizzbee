import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import CategoryPlaylists from '../templates/category-playlist';

function CategoryPage(props) {
  const id = props?.match?.params.id;
  const [myplaylists, setMyplaylists] = useState();

  const spotify = useSpotify();
  useEffect(() => {
    if (spotify) {
      // Get Playlists for a Category (Party in Brazil)
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
      <CategoryPlaylists show={myplaylists} listName={id} />
    </div>
  );
}
export default CategoryPage;
