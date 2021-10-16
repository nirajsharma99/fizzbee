import './sidebar.css';
import { navList } from './navlist';
import { NavLink, useLocation } from 'react-router-dom';

function Bottombar() {
  const location = useLocation();
  const activeLink = location.pathname.split('/')[1];
  const forHome = ['artist', 'album', 'playlist'];

  return (
    <div className="bottombar">
      {navList.map((option, index) => (
        <NavLink
          key={index}
          className={
            'bb-btn ' +
            (activeLink === option.pathname
              ? 'bb-active'
              : option.pathname === '' && forHome.includes(activeLink)
              ? 'bb-active'
              : '')
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
