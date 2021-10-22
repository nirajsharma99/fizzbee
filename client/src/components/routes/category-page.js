import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import CategoryPlaylists from '../templates/category-playlist';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function CategoryPage(props) {
  const id = props?.match?.params.id;
  const [myplaylists, setMyplaylists] = useState();
  const [{ token }, dispatch] = useDataHandlerValue();

  const accessToken = token ? token : window.localStorage.getItem('token');

  spotify.setAccessToken(accessToken);
  useEffect(() => {
    if (accessToken) {
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
  }, [accessToken]);
  return (
    <div className="display-cut">
      <CategoryPlaylists show={myplaylists} listName={id} />
    </div>
  );
}
export default CategoryPage;
