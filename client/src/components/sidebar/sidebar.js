import './sidebar.css';
import { navList } from './navlist';
import { useState } from 'react';
import { useHistory } from 'react-router-dom';
function Sidebar({ setTab }) {
  const history = useHistory();
  const [selected, setSelected] = useState('Home');
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
          <li
            key={index}
            className={'list ' + (selected === option.title ? 'active' : '')}
            onClick={() => {
              setSelected(option.title);
              setTab(option.title);
            }}
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
        ))}
      </ul>
    </div>
  );
}
export default Sidebar;
