import { useState } from "react";
import { handleVolume } from "../../store/actions/spotify-actions";
import { pauseEvent } from "../../utils/helperFunctions";
import VolumeDown from '@material-ui/icons/VolumeDown';
import VolumeUp from '@material-ui/icons/VolumeUp';

function PlayerSliderVolume({ x, y, radius, startAngle, endAngle, trackerRotatingAngle, outerWidth, outerHeight, svgWidth, svgHeight, svgViewBox, children }) {
    const defaultProps = {
        tintColor: 'white',
        progressColor: 'var(--col-thief)',
        lineCap: 'round',
    };
    const pathD = circlePath(x, y, radius, startAngle, endAngle);
    const [dragging, setDragging] = useState(false);
    const [instance, setInstance] = useState(1);
    const [angle, setAngle] = useState(0);

    let angleDifference = endAngle - startAngle;
    let limitStart = startAngle + trackerRotatingAngle;
    let limitEnd = endAngle + trackerRotatingAngle;

    const start = function (e) {
        setDragging(true);
    };

    const move = (e) => {
        var posX, posY, angleTravelled;
        if (e.buttons === 0) return;
        pauseEvent(e);
        const target = document.getElementById('dot-vol').getBoundingClientRect();
        let centerX = target.width / 2 + target.left;
        let centerY = target.height / 2 + target.top;
        if (e.type === 'touchmove') {
            posX = e.touches[0].pageX;
            posY = e.touches[0].pageY;
        } else {
            posX = e.pageX;
            posY = e.pageY;
        }
        let deltaY = centerY - posY;
        let deltaX = centerX - posX;
        angleTravelled = Math.round(Math.atan2(deltaY, deltaX) * (180 / Math.PI));
        angleTravelled -= 90;
        if (angleTravelled < 0) {
            angleTravelled = 360 + angleTravelled;
        }
        if (dragging && angleTravelled >= limitStart && angleTravelled <= limitEnd) {
            document.getElementById(
                'dot-seeker-vol'
            ).style.transform = `rotate(${angleTravelled}deg)`;
            setAngle(angleTravelled);
        }
        setDragging(true);
    };
    const stop = function () {
        if (angle >= limitStart && angle <= limitEnd) {
            let seekTo = (angle - limitStart) / (angleDifference);
            setInstance(seekTo);
            handleVolume(Math.floor(seekTo * 100));
            setDragging(false);
        }
    };

    return (
        <div className="circling-volume" style={{ width: outerWidth, height: outerHeight }}>
            <div
                className="dots dot"
                id="dot-vol"
                onMouseDown={start}
                onTouchStart={start}
                onMouseMove={move}
                onMouseUp={stop}
                onTouchMove={move}
                onTouchEnd={stop}
            >
                <div
                    className="dot-seeker"
                    id="dot-seeker-vol"
                    style={{ transform: `rotate(${(instance * angleDifference) + limitStart}deg)` }}
                ></div>
                <g className="g-vol"
                    style={{ transform: `rotate(${limitStart - 10}deg)` }}
                >
                    <VolumeDown style={{ transform: `rotate(${-(limitStart - 10)}deg)` }} />
                </g>
                <g className="g-vol"
                    style={{ transform: `rotate(${limitEnd + 10}deg)` }}
                >
                    <VolumeUp style={{ transform: `rotate(${-(limitEnd + 10)}deg)` }} />
                </g>
            </div>
            {children}
            <svg width={svgWidth} height={svgHeight} viewBox={svgViewBox}>
                <g>
                    <path
                        d={pathD}
                        stroke={defaultProps.tintColor}
                        strokeWidth={2}
                        strokeLinecap={defaultProps.lineCap}
                        fill="transparent"
                    />
                    <path
                        d={pathD}
                        stroke={defaultProps.progressColor}
                        strokeWidth={4}
                        strokeDasharray={(angleDifference / 180) * Math.PI * radius}
                        strokeDashoffset={(-(angleDifference / 180) * Math.PI * radius) * (1 - instance)}
                        strokeLinecap={defaultProps.lineCap}
                        fill="transparent"
                    />
                </g>
            </svg>
        </div>
    )
}

function circlePath(x, y, radius, startAngle, endAngle) {
    var start = polarToCartesian(x, y, radius, endAngle * 0.9999);
    var end = polarToCartesian(x, y, radius, startAngle);
    var largeArcFlag = endAngle - startAngle <= 180 ? '0' : '1';
    var d = ['M', start.x, start.y, 'A', radius, radius, 0, largeArcFlag, 0, end.x, end.y];
    return d.join(' ');
}
function polarToCartesian(centerX, centerY, radius, angleInDegrees) {
    var angleInRadians = ((angleInDegrees - 90) * Math.PI) / 180.0;
    return {
        x: centerX + radius * Math.cos(angleInRadians),
        y: centerY + radius * Math.sin(angleInRadians),
    };
}
export default PlayerSliderVolume;