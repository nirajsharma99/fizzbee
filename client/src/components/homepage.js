import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from './hooks/useAuth';
import { Route, Switch, useRouteMatch } from 'react-router-dom';
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
import Queue from './player/queue';
import CategoryPage from './routes/category-page';
import UseSpotifyPlayer from './config/spotifyPlayer';
import Player from './player';
import { useSelector } from 'react-redux';
import React from 'react';
import whyDidYouUpdate from 'why-did-you-update';
import SetVisuals from './utils/visuals';
import { useLoadPlayerOnMount } from './hooks/useLoadPlayerOnMount';
import Suggestion from './windowSize';
import NotibarLayout from './player/notibar/notibarLayout';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  useAuth(code);
  useLoadPlayerOnMount();
  const token = useSelector((state) => state.player.token);
  let { path } = useRouteMatch();
  const darkMode = useSelector((state) => state.app.darkMode);
  //whyDidYouUpdate(React);

  return (
    <div className="homepage" data-theme={darkMode ? 'dark' : 'light'}>
      {token && <UseSpotifyPlayer />}
      <PlayerStatus />
      <NotibarLayout />
      <SetVisuals />
      <Sidebar />
      <Suggestion />
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
        <AddToPlaylist />
        <KeyboardShortcuts />
        <Queue />
      </div>
    </div>
  );
}
export default Homepage;
