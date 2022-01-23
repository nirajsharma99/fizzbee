import Artist from '../routes/artist';
import Playlist from '../routes/playlist';
import Album from '../routes/album';
import { Route, Switch, useRouteMatch } from 'react-router';
import LibraryPage from './library-page';

function LibraryRouter() {
  let { path } = useRouteMatch();
  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <LibraryPage />
        </Route>
        <Route exact path="/app/library/artist/:id" component={Artist}></Route>
        <Route exact path="/app/library/playlist/:id" component={Playlist} />
        <Route exact path="/app/library/album/:id" component={Album}></Route>
      </Switch>
    </>
  );
}
export default LibraryRouter;
