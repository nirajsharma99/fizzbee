import './sidebar.css';
import { navList } from './navlist';
import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
function Sidebar({ hash }) {
  //console.log(hash);
  const history = useHistory();
  const [toggle, setToggle] = useState(false);

  return (
    <div className={'navigation ' + (toggle ? 'active' : '')}>
      <div className="nav-b">
        <ul>
          <li
            className={'list '}
            onClick={() => {
              history.push('/');
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
            to={{ pathname: `${option.pathname}` }}
          >
            <li
              className={
                'list ' +
                (hash === option.hash
                  ? 'active'
                  : hash === option?.check
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
