import './styling/categories.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';

import SpotifyWebApi from 'spotify-web-api-node';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const accessToken = window.localStorage.getItem('token');
function Categories({ categories }) {
  const [{}, dispatch] = useDataHandlerValue();

  console.log(categories);
  spotify.setAccessToken(accessToken);

  const handleCategories = (category) => {
    if (accessToken) {
      // Get Playlists for a Category (Party in Brazil)
      spotify
        .getPlaylistsForCategory(category, {
          country: 'IN',
          limit: 2,
          offset: 0,
        })
        .then(
          function (data) {
            console.log(data.body);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
  };
  return (
    <div>
      <p className="section-heading mb-0">Categories</p>
      <div className="cards-holder">
        {categories?.items?.map((item, index) => (
          <div
            className="d-flex flex-column align-items-center me-3 p-2"
            key={item.id}
          >
            <div
              className="category-cards"
              id={item.id + index}
              onClick={() => handleCategories(item.id)}
            >
              <img
                src={item?.icons[0]?.url}
                alt={item?.name}
                crossOrigin="anonymous"
                id={item.id}
                //onLoad={() => getColor({ id: item.id, index: index })}
              />
            </div>
            <span className="fw-name mt-2">{item?.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Categories;
