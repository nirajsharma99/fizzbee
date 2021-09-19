import Sidebar from '../components/sidebar/sidebar';
import Player from '../components/player/player';
import useAuth from '../components/useAuth';
import { useState } from 'react';
import { Route, HashRouter } from 'react-router-dom';
import '../App.css';
import Playlist from './routes/playlist';
import Header from './header';
import MinPlayer from './player/minPlayer';
import MaxPlayer from './player/maxplayer';
import bg from './player/bg3.png';
import { useDataHandlerValue } from './contextapi/DataHandler';
import useSpotifyPlayer from './player/spotifyPlayer';

import SpotifyWebApi from 'spotify-web-api-node';
import Artist from './routes/artist';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  const [tab, setTab] = useState('Home');
  useAuth(code);
  const [{ deviceId, token, playing, playlist }, dispatch] =
    useDataHandlerValue();

  const [minPlayer, setMinPlayer] = useState(true);

  spotify.setAccessToken(token);

  useSpotifyPlayer(token);

  const handlePlayPause = () => {
    if (playing) {
      spotify
        .pause()
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

  const play = (uri) => {
    console.log(uri);
    spotify
      .play({
        uris: [uri],
        device_id: deviceId,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((x) => {
          console.log('current in api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
          spotify
            .getAudioFeaturesForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio features', data.body);
            })
            .catch((err) => {
              console.log(err);
            });

          /* Get Audio Analysis for a Track */
          spotify
            .getAudioAnalysisForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio analysis', data.body);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.error(err));
  };

  const playFromList = (index, list) => {
    console.log(playlist);

    spotify
      .play({
        uris: [playlist[index].uri],
        device_id: deviceId,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((x) => {
          console.log(x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        });
      })
      .catch((err) => console.error(err));
  };

  const skipNext = () => {
    //spotify.skipToNext({ device_id: deviceId });
    spotify.play({
      uris: [playlist.playist[playlist.index + 1].uri],
      device_id: deviceId,
    });
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_ITEM',
        item: r.body,
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    });
  };

  const skipPrevious = () => {
    spotify.skipToPrevious();
    spotify.getMyCurrentPlayingTrack().then((r) => {
      dispatch({
        type: 'SET_ITEM',
        item: r.body,
      });
      dispatch({
        type: 'SET_PLAYING',
        playing: true,
      });
    });
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
        <Sidebar setTab={setTab} />
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
              bg={bg}
              skipNext={skipNext}
              skipPrevious={skipPrevious}
              handlePlayPause={handlePlayPause}
              spotify={spotify}
              token={token}
              minPlayer={minPlayer}
            />
          </div>
          <MinPlayer
            maxPlayer={maxPlayer}
            handlePlayPause={handlePlayPause}
            bg={bg}
            minPlayer={minPlayer}
          />
          <Route exact path="/">
            {token && (
              <Player
                token={token}
                tab={tab}
                play={play}
                playFromList={playFromList}
              />
            )}
          </Route>
          <Route path="/playlist/:id" component={Playlist}></Route>
          <Route path="/artist/:id" component={Artist}></Route>
        </div>
      </div>
    </HashRouter>
  );
}
export default Homepage;
