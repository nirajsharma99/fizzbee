import Sidebar from '../components/sidebar/sidebar';
import useAuth from './config/useAuth';
import { useEffect, useState } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import '../App.css';
import Playlist from './routes/playlist';
import Header from './header';
import MinPlayer from './player/minPlayer';
import MaxPlayer from './player/maxplayer';
import { useDataHandlerValue } from './contextapi/DataHandler';
import UseSpotifyPlayer from './config/spotifyPlayer';
import Artist from './routes/artist';
import Album from './routes/album';
import Notibar from './utils/notibar';
import Bottombar from './sidebar/bottombar';
import Home from './player/home';
import Search from './player/search';
import Library from './player/library';
import Settings from './player/settings';
import AddToPlaylist from './player/add-to-playlist';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const code = new URLSearchParams(window.location.search).get('code');

function Homepage(props) {
  useAuth(code);
  const [{ deviceId, settings, playing, token }, dispatch] =
    useDataHandlerValue();
  const accessToken = window.localStorage.getItem('token') || token;
  spotify.setAccessToken(accessToken);

  /*useEffect(() => {
    setTimeout(() => {
      if (accessToken === null && token === null) {
        window.location.href = '/';
      }
    }, 5000);
  }, [token]);*/
  //console.log(playingIndex, playlist);
  const [minPlayer, setMinPlayer] = useState(true);

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
    const classNames = [
      'minimised-player',
      'min-left',
      'min-right',
      'min-mid',
      'pp-mini-outer',
      'np-name',
      'np-by',
      'mini-album-art',
    ];
    if (
      classNames.some((className) => e.target.classList.contains(className))
    ) {
      setMinPlayer(!minPlayer);
    }
  };

  return (
    <HashRouter>
      <div className="homepage">
        {accessToken && <UseSpotifyPlayer />}
        <Notibar />
        <Sidebar
          hash={props?.location.hash ? props?.location?.hash : undefined}
        />
        <div className="player" style={{ padding: '20px' }}>
          <Header />
          <div className={minPlayer ? 'min-music-player' : 'music-player'}>
            {!minPlayer && (
              <button
                className="mp-toggle"
                onClick={() => setMinPlayer(!minPlayer)}
              >
                <ion-icon name="chevron-down-outline"></ion-icon>
              </button>
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
          <MinPlayer
            maxPlayer={maxPlayer}
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            minPlayer={minPlayer}
          />
          <Route exact path="/" component={Home} />
          <Route path="/search" component={Search} />
          <Route path="/library" component={Library} />
          <Route path="/settings" component={Settings} />
          <Route path="/playlist/:id" component={Playlist}></Route>
          <Route path="/artist/:id" component={Artist}></Route>
          <Route path="/album/:id" component={Album}></Route>
          {settings.isAddToPlaylistOpen && <AddToPlaylist />}
          <Bottombar
            hash={props?.location.hash ? props?.location?.hash : undefined}
          />
        </div>
      </div>
    </HashRouter>
  );
}
export default Homepage;
