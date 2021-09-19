import { useDataHandlerValue } from './contextapi/DataHandler';
import { loginUrl } from './player/spotify';
import { Avatar } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
function Header() {
  const [{ user }, dispatch] = useDataHandlerValue();
  const history = useHistory();
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
  );
}
export default Header;
