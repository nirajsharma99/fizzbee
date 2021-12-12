import Sidebar from '../components/sidebar/sidebar';
import { useAuth } from './config/useAuth';
import { useState } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import '../App.css';
import Header from './header';
import MinPlayer from './player/minPlayer';
import MaxPlayer from './player/maxplayer';
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

import SpotifyWebApi from 'spotify-web-api-node';
import UtubeApp from './youtube/components/utube-app';
import SwitchPlatform from './youtube/youtube-switch';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  useAuth(code);
  //console.log('homepage');
  const [{ deviceId, settings, notibar, playing, token }, dispatch] =
    useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');
  spotify.setAccessToken(accessToken);
  const [minPlayer, setMinPlayer] = useState(true);
  const [utubeMode, setUtubeMode] = useState(false);

  const handlePlayPause = () => {
    if (playing) {
      spotify
        .pause({ device_id: deviceId })
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: false,
          });
        })
        .catch((err) => console.log(err));
    } else {
      spotify
        .play({ device_id: deviceId })
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSwitch = () => {
    setUtubeMode(!utubeMode);
    if (playing) {
      spotify
        .pause({ device_id: deviceId })
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: false,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const skipNext = () => {
    spotify
      .skipToNext({ device_id: deviceId })
      .then(() => {
        console.log('Playing next..');
      })
      .catch((err) => console.log(err));
  };

  const skipPrevious = () => {
    spotify
      .skipToPrevious({
        device_id: deviceId,
      })
      .then(() => {
        console.log('Playing previous song..');
      })
      .catch((err) => console.log(err));
  };

  const maxPlayer = (e) => {
    const tagNames = ['svg', 'path', 'button', 'DIV'];
    if (!tagNames.includes(e.target.tagName)) {
      setMinPlayer(!minPlayer);
    }
  };

  return (
    <HashRouter>
      <div className="homepage">
        {accessToken && <UseSpotifyPlayer />}
        <PlayerStatus />
        {notibar.errorMsg && <Notibar />}
        <Sidebar />
        <div className="player" style={{ padding: '10px' }}>
          <Header />
          <Bottombar />
          {!utubeMode && (
            <div className={minPlayer ? 'min-music-player' : 'music-player'}>
              {!minPlayer && (
                <div className="switch-btns">
                  <SwitchPlatform
                    utubeMode={utubeMode}
                    handleSwitch={handleSwitch}
                  />

                  <button
                    className="ms-2 mp-toggle"
                    onClick={() => setMinPlayer(!minPlayer)}
                  >
                    <ion-icon name="chevron-down-outline"></ion-icon>
                  </button>
                </div>
              )}

              <MaxPlayer
                skipNext={skipNext}
                skipPrevious={skipPrevious}
                handlePlayPause={handlePlayPause}
                spotify={spotify}
                token={accessToken}
                minPlayer={minPlayer}
              />
            </div>
          )}
          {utubeMode && (
            <UtubeApp handleSwitch={handleSwitch} utubeMode={utubeMode} />
          )}
          <MinPlayer
            maxPlayer={maxPlayer}
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            minPlayer={minPlayer}
          />
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
