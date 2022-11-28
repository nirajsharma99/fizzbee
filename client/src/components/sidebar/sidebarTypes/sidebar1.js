import '../../styling/routes.css';
import { navList } from '../navlist';
import { useState } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import VC from '../../voice-command/voice-command';
import { logOut } from '../../utils/helperFunctions';

function Sidebar1() {
    const location = useLocation();
    const activeLink = location.pathname.split('/')[2];
    const forHome = ['artist', 'album', 'playlist', 'category'];
    const activeCheck = forHome.includes(activeLink) ? undefined : activeLink;
    const { url } = useRouteMatch();
    const [toggle, setToggle] = useState(false);

    return (
        <div className={'navigation ' + (toggle ? 'active' : '')}>
            <ul><VC /></ul>
            <ul>
                {navList.map((option, index) => (
                    <NavLink
                        key={index}
                        className="text-decoration-none"
                        to={{ pathname: `${url}${option.route}` }}
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
            </ul>
            <ul>
                <li className={'list '} onClick={logOut}>
                    <button className="l-out">
                        <span className="icon">
                            <ion-icon name="log-out-outline"></ion-icon>
                        </span>
                        <span className="title">Sign Out</span>
                    </button>
                </li>
                <li>
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
                </li>
            </ul>
        </div>
    );
}
export default Sidebar1;
