import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from './config/useAuth';
import { Route, HashRouter, Switch, useRouteMatch } from 'react-router-dom';
import '../App.css';
import Header from './header';
import Playlist from './routes/playlist';
import Artist from './routes/artist';
import Album from './routes/album';
import Bottombar from './sidebar/bottombar';
import Home from './player/home';
import SearchRouter from './player/search-router';
import LibraryRouter from './player/library-router';
import Settings from './player/settings';
import AddToPlaylist from './player/add-to-playlist';
import KeyboardShortcuts from './player/shortcuts';
import PlayerStatus from './utils/playerStatus';
import Notibar from './utils/notibar';
import Queue from './player/queue';
import CategoryPage from './routes/category-page';
import UseSpotifyPlayer from './config/spotifyPlayer';
import Player from './player';
import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect } from 'react';
import { setSpotifyAccessToken } from './store/actions/spotify-actions';
import useTraceUpdate from './tracer';
import whyDidYouUpdate from 'why-did-you-update';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  useAuth(code);
  const dispatch = useDispatch();
  const notibar = useSelector((state) => state.app.notibar);
  const isAddToPlaylistOpen = useSelector(
    (state) => state.app.settings.isAddToPlaylistOpen
  );
  const isKeyboard = useSelector((state) => state.app.settings.isKeyboard);
  const isQueue = useSelector((state) => state.app.settings.isQueue);
  const token = useSelector((state) => state.player.token);

  let { path } = useRouteMatch();
  whyDidYouUpdate(React);

  return (
    <div className="homepage">
      {token && <UseSpotifyPlayer />}
      <PlayerStatus />
      {notibar.msg && <Notibar />}
      <Sidebar />
      <div className="player" style={{ padding: '10px' }}>
        <Header />
        <Bottombar />
        <Player />
        <Switch>
          <Route path={`${path}/search`} component={SearchRouter} />
          <Route path={`${path}/library`} component={LibraryRouter} />
          <Route path={`${path}/settings`} component={Settings} />
          <Route path={`${path}/playlist/:id`} component={Playlist} />
          <Route path={`${path}/artist/:id`} component={Artist} />
          <Route path={`${path}/album/:id`} component={Album} />
          <Route path={`${path}/category/:id`} component={CategoryPage} />
          <Route path={`${path}`}>
            <Home />
          </Route>
        </Switch>
        {isAddToPlaylistOpen && <AddToPlaylist />}
        {isKeyboard && <KeyboardShortcuts />}
        {isQueue && <Queue />}
      </div>
    </div>
  );
}
export default Homepage;
