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
        <Route
          exact
          path={`${path}/playlist/:id`}
          render={(props) => <Playlist {...props} />}
        />
        <Route path={`${path}/artist/:id`} component={Artist}></Route>
        <Route path={`${path}/album/:id`} component={Album}></Route>
      </Switch>
    </>
  );
}
export default LibraryRouter;
