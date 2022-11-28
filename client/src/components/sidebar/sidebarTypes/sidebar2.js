import '../../styling/routes.css';
import { navList } from '../navlist';
import { Avatar } from '@material-ui/core';
import { useState } from 'react';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import VC from '../../voice-command/voice-command';
import { logOut } from '../../utils/helperFunctions';
import { useDispatch, useSelector } from 'react-redux';

function Sidebar2() {
    const { user } = useSelector((state) => state.user);
    const { darkMode } = useSelector((state) => state.app);
    const location = useLocation();
    const activeLink = location.pathname.split('/')[2];
    const forHome = ['artist', 'album', 'playlist', 'category'];
    const activeCheck = forHome.includes(activeLink) ? undefined : activeLink;
    const { url } = useRouteMatch();
    const [toggle, setToggle] = useState(false);

    return (
        <div className={'navigation-2 ' + (toggle ? 'active' : '')}>
            <ul >
                <div className="user-pic">
                    <Avatar src={user?.images[0]?.url} alt={user?.display_name} />
                    <span className='section-heading mt-3' hidden={!toggle}>{user?.display_name}</span>
                </div>
            </ul>
            <ul>
                {navList.map((option, index) => (
                    <NavLink
                        key={index}
                        className="text-decoration-none"
                        to={{ pathname: `${url}${option.route}` }}
                    >
                        <li
                            className={
                                'nav-list ' + (activeCheck === option.pathname ? 'active' : '')
                            }
                        >
                            <bl></bl>
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
export default Sidebar2;
