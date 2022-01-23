import { Route, Switch, useRouteMatch } from 'react-router';
import Artist from '../routes/artist';
import Playlist from '../routes/playlist';
import Album from '../routes/album';
import SearchPage from './search-page';

function SearchRouter() {
  let { path } = useRouteMatch();

  return (
    <>
      <Switch>
        <Route exact path={`${path}`}>
          <SearchPage />
        </Route>
        <Route exact path="/app/search/artist/:id" component={Artist} />
        <Route
          exact
          path="/app/search/playlist/:id"
          component={Playlist}
        ></Route>
        <Route exact path="/app/search/album/:id" component={Album}></Route>
      </Switch>
    </>
  );
}
export default SearchRouter;
