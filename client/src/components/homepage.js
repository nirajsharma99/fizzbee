import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from './config/useAuth';
import { Route, HashRouter } from 'react-router-dom';
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
import { useDataHandlerValue } from './contextapi/DataHandler';
import Player from './player';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  useAuth(code);
  const [{ settings, notibar, token, current }, dispatch] =
    useDataHandlerValue();
  //console.log('still rerendering bitch');

  return (
    <HashRouter>
      <div className="homepage">
        {token && <UseSpotifyPlayer />}
        <PlayerStatus />
        {notibar.errorMsg && <Notibar />}
        <Sidebar />
        <div className="player" style={{ padding: '10px' }}>
          <Header />
          <Bottombar />
          <Player />
          <Route exact path="/" component={Home} />
          <Route path="/search" component={SearchRouter} />
          <Route path="/library" component={LibraryRouter} />
          <Route path="/settings" component={Settings} />
          <Route path="/playlist/:id" component={Playlist}></Route>
          <Route path="/artist/:id" component={Artist}></Route>
          <Route path="/album/:id" component={Album}></Route>
          <Route path="/category/:id" component={CategoryPage}></Route>
          {settings.isAddToPlaylistOpen && <AddToPlaylist />}
          {settings.isKeyboard && <KeyboardShortcuts />}
          {settings.isQueue && <Queue />}
        </div>
      </div>
    </HashRouter>
  );
}
export default Homepage;
