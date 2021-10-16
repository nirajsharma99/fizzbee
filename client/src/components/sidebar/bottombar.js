import './sidebar.css';
import { navList } from './navlist';
import { NavLink, useLocation } from 'react-router-dom';

function Bottombar() {
  const location = useLocation();
  const activeLink = location.pathname.split('/')[1];
  const forHome = ['artist', 'album', 'playlist'];
  const activeCheck = forHome.includes(activeLink) ? '' : activeLink;

  return (
    <div className="bottombar">
      {navList.map((option, index) => (
        <NavLink
          key={index}
          className={
            'bb-btn ' + (activeCheck === option.pathname ? 'bb-active' : '')
          }
          to={{ pathname: `${option.route}` }}
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
