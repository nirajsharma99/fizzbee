import './sidebar.css';
import { navList } from './navlist';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';

function Bottombar() {
  const location = useLocation();
  const activeLink = location.pathname.split('/')[2];
  const forHome = ['artist', 'album', 'playlist', 'category'];
  const activeCheck = forHome.includes(activeLink) ? undefined : activeLink;
  const { url } = useRouteMatch();

  return (
    <div className="bottombar">
      {navList.map((option, index) => (
        <NavLink
          key={index}
          className={
            'bb-btn ' + (activeCheck === option.pathname ? 'bb-active' : '')
          }
          to={{ pathname: `${url}${option.route}` }}
        >
          <span className="bb-icon">
            <ion-icon name={option.icon}></ion-icon>
          </span>
          {activeLink === option.pathname && <span className="dot"></span>}
        </NavLink>
      ))}
    </div>
  );
}
export default Bottombar;
