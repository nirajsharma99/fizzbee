import Artist from '../routes/artist';
import Playlist from '../routes/playlist';
import Album from '../routes/album';
import { Route } from 'react-router';
import LibraryPage from './library-page';

function LibraryRouter() {
  return (
    <>
      <Route exact path="/library" component={LibraryPage} />
      <Route path="/library/artist/:id" component={Artist}></Route>
      <Route path="/library/playlist/:id" component={Playlist}></Route>
      <Route path="/library/album/:id" component={Album}></Route>
    </>
  );
}
export default LibraryRouter;
