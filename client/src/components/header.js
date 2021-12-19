import { useDataHandlerValue } from './contextapi/DataHandler';
import { loginUrl } from './config/spotify';
import { Avatar } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
import { useEffect } from 'react';
import axios from 'axios';
import useSpotify from './hooks/useSpotify';

function Header() {
  const [{ user, token }, dispatch] = useDataHandlerValue();
  const history = useHistory();
  const spotify = useSpotify();
  const headers = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
  };

  useEffect(() => {
    if (token) {
      spotify
        .getMe()
        .then((user) => {
          var userInfo = user.body;
          axios
            .get('https://api.spotify.com/v1/me/following?type=artist', {
              headers,
            })
            .then((res1) => {
              axios
                .get('https://api.spotify.com/v1/me/playlists', { headers })
                .then((res) => {
                  userInfo.following = res1?.data.artists.items.length;
                  userInfo.playlists = res?.data.items.length;

                  dispatch({ type: 'SET_USER', user: userInfo });
                })
                .catch((err) => console.log(err));
            })
            .catch((err) => console.log(err));
        })
        .catch(function (err) {
          //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
          console.log('Something went wrong!', err);
        });
    }
  }, [token]);
  return (
    <div className="header">
      <div className="navi-link">
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
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <span>{user?.display_name}</span>
          </div>
        )}
      </div>
    </div>
  );
}
export default Header;
