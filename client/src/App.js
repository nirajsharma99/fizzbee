import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { getTokenFromUrl } from './components/player/spotify';
import SpotifyWebApi from 'spotify-web-api-node';
import { useDataHandlerValue } from './components/contextapi/DataHandler';
import Homepage from './components/homepage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Frontpage from './components/frontpage';

function App() {
  //const [{ user, token, newReleases }, dispatch] = useDataHandlerValue();

  /*useEffect(() => {
    if (_token) {
      spotify.setAccessToken(_token);

      spotify.getMe().then((user) => {
        dispatch(
          { type: 'SET_USER', user: user },
          { type: 'SET_TOKEN', token: _token }
        );
      });
      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });
      spotify.getNewReleases({ country: 'IN' }).then((newReleases) => {
        dispatch({
          type: 'NEW_RELEASES',
          newReleases: newReleases.body,
        });
      });
      spotify.getMyTopTracks().then((x) => {
        dispatch({
          type: 'MY_TOP_TRACKS',
          mytoptracks: x.body,
        });
      });
      spotify.getMyCurrentPlayingTrack().then((x) => {
        if (x.body) {
          dispatch({
            type: 'SET_ITEM',
            item: x.body,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: x.body.is_playing,
          });
        }
      });
    }
  }, []);*/

  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact component={Frontpage} />
          <Route path="/home" exact component={Homepage} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;
