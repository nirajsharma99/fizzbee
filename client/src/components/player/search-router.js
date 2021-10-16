import { Route } from 'react-router';
import Artist from '../routes/artist';
import Playlist from '../routes/playlist';
import Album from '../routes/album';
import SearchPage from './search-page';

function SearchRouter(props) {
  return (
    <>
      <Route exact path="/search" component={SearchPage} />
      <Route path="/search/artist/:id" component={Artist}></Route>
      <Route path="/search/playlist/:id" component={Playlist}></Route>
      <Route path="/search/album/:id" component={Album}></Route>
    </>
  );
}
export default SearchRouter;
