import React, { useRef, useState } from "react"
import useCheckDevice from "./checkDevice";

const DoubleClick = React.forwardRef((props, ref) => {
    const { isMobile } = useCheckDevice();
    const [waitingClick, setWaitingClick] = useState(null);
    const [lastClick, setLastClick] = useState(0);
    //Double click check for mobiles (Screen size < 768px)
    const processClick = (e) => {
        if (lastClick && e.timeStamp - lastClick < 250 &&
            waitingClick) {
            setLastClick(0);
            clearTimeout(waitingClick);
            setWaitingClick(null);
            props.onDoubleClick();  //Double click code
        }
        else {
            setLastClick(e.timeStamp);
            setWaitingClick(setTimeout(() => {
                setWaitingClick(null);
                props.onClick();    //Single click code
            }, 251))

        }
    }

    //Double click check for Desktops (Screen size > 768px)
    const timer = useRef();
    const onClickHandler = e => {
        clearTimeout(timer.current);
        if (e.detail === 1) {
            timer.current = setTimeout(props.onClick, 200)
        } else if (e.detail === 2) {
            props.onDoubleClick();
        }
    }
    return (
        <div
            className={props.className}
            onClick={(e) => isMobile ? processClick(e) : onClickHandler(e)}
            onTouchStart={props.onTouchStart}
            onTouchMove={props.onTouchMove}
            onTouchEnd={props.onTouchEnd}
            onMouseDown={props.onMouseDown}
            onMouseUp={props.onMouseUp}
            onMouseMove={props.onMouseMove}
            style={props.style}
            ref={ref}
        >
            {props.children}
        </div>
    )
});

export default DoubleClick;