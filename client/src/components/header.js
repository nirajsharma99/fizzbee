import { loginUrl } from './config/spotify';
import { Avatar } from '@material-ui/core';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import { useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import useSpotify from './hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from './store/actions/user-actions';

function Header() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.player);
  const { headerHide, headerCollapse, headerInvert, headerPos } = useSelector((state) => state.app);
  const [scrollEffect, setScrollEffect] = useState({
    scrollPos: 0,
    show: true,
  });
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
                  dispatch(setUser(userInfo));
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
  const goBack = () => {
    history.goBack();
  };
  const goForward = () => {
    history.goForward();
  };

  //On Scroll show/hide Header
  useEffect(() => {
    window.addEventListener('scroll', handleScroll, headerCollapse);
    return () => {
      window.removeEventListener('scroll', handleScroll, headerCollapse);
    };
  }, [headerCollapse]);

  const handleScroll = () => {
    let top = document.querySelector('.display-cut').scrollTop;
    setScrollEffect((prev) => ({
      ...scrollEffect,
      scrollPos: top,
      show: top < prev.scrollPos,
    }));
  };

  return (
    <div className={"header" + (scrollEffect.show ? ' active' : ' hidden') + (headerPos ? ' header-bottom' : ' header-top')}
      style={{ flexDirection: headerInvert ? 'row-reverse' : 'row' }}
      hidden={headerHide}
    >
      <div className="navi-link">
        <button className="nav-btn me-2" onClick={goBack}>
          <NavigateBeforeIcon />
        </button>
        <button className="nav-btn" onClick={goForward}>
          <NavigateNextIcon />
        </button>
      </div>
      {!user ? (
        <div>
          <a href={loginUrl} className="login-btn">
            <ion-icon name="log-in-outline"></ion-icon>
          </a>
        </div>
      ) : (
        <div className="log">
          <div className="loggedData font-1">
            <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
            <span>{user?.display_name}</span>
          </div>
        </div>
      )}
    </div>
  );
}
export default Header;
