import './sidebar.css';
import { navList } from './navlist';
import { useState } from 'react';
function Sidebar({ setTab }) {
  const [selected, setSelected] = useState('Home');
  const [toggle, setToggle] = useState(false);
  return (
    <div className={'navigation ' + (toggle ? 'active' : '')}>
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
