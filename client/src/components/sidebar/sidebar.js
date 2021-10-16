import './sidebar.css';
import { navList } from './navlist';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
function Sidebar() {
  const location = useLocation();
  const activeLink = location.pathname.split('/')[1];
  const forHome = ['artist', 'album', 'playlist'];
  const [toggle, setToggle] = useState(false);

  return (
    <div className={'navigation ' + (toggle ? 'active' : '')}>
      <div className="nav-b">
        <ul>
          <li
            className={'list '}
            onClick={() => {
              window.localStorage.removeItem('token');
              window.location.href = '/';
            }}
          >
            <button className="l-out">
              <span className="icon">
                <ion-icon name="log-out-outline"></ion-icon>
              </span>
              <span className="title">Sign Out</span>
            </button>
          </li>
        </ul>
        <button
          className={'toggle ' + (toggle ? 'text-end' : 'text-center')}
          onClick={() => setToggle(!toggle)}
        >
          <span className="toggle-icon">
            <ion-icon
              name={toggle ? 'chevron-back-outline' : 'chevron-forward-outline'}
            ></ion-icon>
          </span>
        </button>
      </div>
      <ul>
        {navList.map((option, index) => (
          <NavLink
            key={index}
            className="text-decoration-none"
            to={{ pathname: `${option.route}` }}
          >
            <li
              className={
                'list ' +
                (activeLink === option.pathname
                  ? 'active'
                  : option.pathname === '' && forHome.includes(activeLink)
                  ? 'active'
                  : '')
              }
            >
              <b></b>
              <b></b>
              <button>
                <span className="icon">
                  <ion-icon name={option.icon}></ion-icon>
                </span>
                <span className="title">{option.title}</span>
              </button>
            </li>
          </NavLink>
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
