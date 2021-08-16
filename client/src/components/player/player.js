import './player.css';
import bg from './bg3.png';

import { useEffect, useState } from 'react';
import { loginUrl } from './spotify';
import { Avatar } from '@material-ui/core';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import Home from './home';
import Library from './library';
import Search from './search';
import Settings from './settings';
import useAuth from '../useAuth';
import SpotifyWebApi from 'spotify-web-api-node';
import { loadSpotifyScript } from './spotify';
import SpotifyPlayer from './spotifyPlayer';
import MinPlayer from './minPlayer';
import MaxPlayer from './maxplayer';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function Player({ code, tab }) {
  const [{ user, deviceId, item, playing }, dispatch] = useDataHandlerValue();

  const [minPlayer, setMinPlayer] = useState(true);

  const accessToken = useAuth(code);

  spotify.setAccessToken(accessToken);

  SpotifyPlayer(accessToken);

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
        .play()
        .then(() => {
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
        })
        .catch((err) => console.log(err));
    }
  };

  const play = (id) => {
    spotify
      .play({
        uris: [`spotify:track:${id}`],
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
      .catch((err) => console.log(err));
  };

  const skipNext = () => {
    spotify.skipToNext({ device_id: deviceId });
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
    <div className="player">
      <div className="header">
        <div className="log">
          {!user ? (
            <div>
              <a href={loginUrl} className="login-btn">
                Login
              </a>
              <button className="signup-btn">Signup</button>
            </div>
          ) : (
            <div className="loggedData">
              <Avatar
                src={user?.body.images[0]?.url}
                alt={user?.body.display_name}
              />
              <span>{user?.body.display_name}</span>
            </div>
          )}
        </div>
      </div>
      {tab === 'Home' && <Home play={play} />}
      {tab === 'Search' && <Search />}
      {tab === 'Your library' && <Library />}
      {tab === 'Settings' && <Settings />}

      <div className={!minPlayer ? 'min-music-player' : 'music-player'}>
        {minPlayer && (
          <button
            className="mp-toggle"
            onClick={() => setMinPlayer(!minPlayer)}
          >
            <ion-icon name="chevron-down-outline"></ion-icon>
          </button>
        )}
        {minPlayer ? (
          <MaxPlayer
            bg={bg}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            handlePlayPause={handlePlayPause}
            spotify={spotify}
          />
        ) : (
          <MinPlayer
            maxPlayer={maxPlayer}
            handlePlayPause={handlePlayPause}
            bg={bg}
          />
        )}
      </div>
    </div>
  );
}
export default Player;
