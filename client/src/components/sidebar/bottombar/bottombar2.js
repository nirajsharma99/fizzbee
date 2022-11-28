import '../../styling/sidebar.css';
import { navList } from '../navlist';
import { NavLink, useLocation, useRouteMatch } from 'react-router-dom';
import { useState } from 'react';
import Draggable from 'react-draggable';

function Bottombar2() {
    const location = useLocation();
    const activeLink = location.pathname.split('/')[2];
    const forHome = ['artist', 'album', 'playlist', 'category'];
    const activeCheck = forHome.includes(activeLink) ? undefined : activeLink;
    const { url } = useRouteMatch();
    const [toggle, setToggle] = useState(false);
    const [invertToggle, setInvertToggle] = useState(false);

    const handleToggle = () => {
        setToggle(!toggle);
    }

    const handleInvertion = () => {
        const playerRect = document.querySelector('.player').getBoundingClientRect();
        const menuRect = document.querySelector('.menu').getBoundingClientRect();
        const left = menuRect.right - playerRect.right / 2;
        if (left < 0) {
            setInvertToggle(false);
        } else {
            setInvertToggle(true);
        }
    }


    return (
        <Draggable cancel='a' onDrag={handleInvertion}>
            <div className={"menu " + (toggle ? 'active' : '')} onClick={handleToggle} onTouchStart={handleToggle}>
                <div className={'toggle'}>
                    <ion-icon name={"ellipse-outline"}></ion-icon>
                </div>
                {navList.map((option, index) => (
                    <li key={index} style={{ '--i': invertToggle ? option.invIdx : option.idx }}>
                        < NavLink
                            to={{ pathname: `${url}${option.route}` }}
                            style={{ background: (activeCheck === option.pathname ? 'var(--main-theme)' : 'var(--background)') }}
                            onClickCapture={handleToggle}
                        >
                            <ion-icon name={option.icon}
                                style={{ color: (activeCheck === option.pathname ? 'var(--background)' : 'var(--main-theme)') }}
                            ></ion-icon>
                        </NavLink>
                    </li >

                ))}
            </div >
        </Draggable>
    );
}
export default Bottombar2;
