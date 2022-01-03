import './sidebar.css';
import { navList } from './navlist';
import { useState } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import VC from '../voice-command/voice-command';
import useTraceUpdate from '../tracer';

function Sidebar(props) {
  useTraceUpdate(props);

  const location = useLocation();
  const activeLink = location.pathname.split('/')[1];
  const forHome = ['artist', 'album', 'playlist', 'category'];
  const activeCheck = forHome.includes(activeLink) ? '' : activeLink;

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
          className={'toggle ' + (toggle ? 'text-start' : 'text-center')}
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
                'list ' + (activeCheck === option.pathname ? 'active' : '')
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
        <VC />
      </ul>
    </div>
  );
}
export default Sidebar;
