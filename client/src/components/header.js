import { useDataHandlerValue } from './contextapi/DataHandler';
import { loginUrl } from './config/spotify';
import { Avatar } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const token = window.localStorage.getItem('token');

function Header() {
  const [{ user }, dispatch] = useDataHandlerValue();
  const history = useHistory();
  spotify.setAccessToken(token);
  useEffect(() => {
    if (token) {
      spotify.getMe().then((user) => {
        dispatch({ type: 'SET_USER', user: user });
      });
    }
  }, []);
  return (
    <div className="header">
      <div className="nav-link">
        <button className="nav-btn me-2" onClick={() => history.goBack()}>
          <NavigateBeforeIcon />
        </button>
        <button className="nav-btn" onClick={() => history.goForward()}>
          <NavigateNextIcon />
        </button>
      </div>

      <div className="log">
        {/*<NavLink to="/playlist">Playlist</NavLink>*/}
        {!user ? (
          <div>
            <a href={loginUrl} className="login-btn">
              Login
            </a>
            <button className="signup-btn">Signup</button>
          </div>
        ) : (
          <div className="loggedData font-1">
            <Avatar
              src={user?.body.images[0]?.url}
              alt={user?.body.display_name}
            />
            <span>{user?.body.display_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
