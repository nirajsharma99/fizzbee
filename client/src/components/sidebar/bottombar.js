import './sidebar.css';
import { navList } from './navlist';
import { NavLink } from 'react-router-dom';

function Bottombar({ hash }) {
  return (
    <div className="bottombar">
      {navList.map((option, index) => (
        <NavLink
          key={index}
          className={
            'bb-btn ' +
            (hash === option.hash
              ? 'bb-active'
              : hash === option?.check
              ? 'bb-active'
              : '')
          }
          to={{ pathname: `${option.pathname}` }}
        >
          <span className="bb-icon">
            <ion-icon name={option.icon}></ion-icon>
          </span>
          {(hash === option.hash ? true : hash === option?.check) && (
            <span className="dot"></span>
          )}
        </NavLink>
      ))}
    </div>
  );
}
export default Bottombar;
