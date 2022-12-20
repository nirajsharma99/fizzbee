import React, { useRef, useState } from "react"
import useCheckDevice from "./checkDevice";

const MultipleActions = React.forwardRef((props, ref) => {
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

    // Swipe logic for smartphones----------------------------------------------------
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 20;

    //avoid these targets
    const target = ['range'];

    const onTouchStart = (e) => {
        if (target.includes(e.target.type)) return;
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = (e) => {
        if (target.includes(e.target.type)) return;
        setTouchEnd(e.targetTouches[0].clientX);
    }

    const onTouchEnd = (e) => {
        if (!touchStart || !touchEnd) return;
        if (!props.current || target.includes(e.target.type)) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) isLeftSwipe ? props.handleSwipeLeft() : props.handleSwipeRight();
    }

    // Swipe Logic for desktops-------------------------------------------------------
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);

    const onMouseDown = (e) => {
        if (target.includes(e.target.type)) return;
        setMouseDown(null); // otherwise the swipe is fired even with usual touch events
        setMouseDown(e.clientX);
    }
    const onMouseMove = (e) => {
        if (target.includes(e.target.type)) return;
        setMouseUp(e.clientX);
    }

    const onMouseUp = (e) => {
        if (!mouseDown || !mouseUp) return;
        if (!props.current || target.includes(e.target.type)) return;
        const distance = mouseDown - mouseUp;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) isLeftSwipe ? props.handleSwipeLeft() : props.handleSwipeRight();
    }

    return (
        <div
            className={props.className}
            onClick={(e) => isMobile ? processClick(e) : onClickHandler(e)}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            style={props.style}
            ref={ref}
        >
            {props.children}
        </div>
    )
});

export default MultipleActions;