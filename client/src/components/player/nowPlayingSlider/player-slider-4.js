import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import ShuffleBtn from '../../utils/shuffle';
import RepeatBtn from '../../utils/repeat';
import { toggleQueue } from '../../store/actions/app-actions';
import {
    millisToMinutesAndSeconds,
    pauseEvent,
} from '../../utils/helperFunctions';
import { useState, useEffect } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';

function PlayerSlider4({ skipNext,
    skipPrevious,
    handlePlayPause,
    handedness }) {
    const position_ms = useSelector((state) => state.player.position_ms);
    const { current, playing } = useSelector(
        (state) => state.player
    );
    const { settings } = useSelector((state) => state.app);
    const [instance, setInstance] = useState(0);
    const [pos, setPos] = useState(0);
    const [dragging, setDragging] = useState(false);
    const spotify = useSpotify();
    const dispatch = useDispatch();
    let angle;
    let rotatingAngle = handedness ? -90 : 0;
    let hside = handedness ? 'right' : 'left';
    useEffect(() => {
        if (!current) return;
        setInstance(pos / current.duration_ms);
    }, [pos]);
    useEffect(() => {
        setPos(position_ms);
    }, [position_ms]);

    useEffect(() => {
        let interval = null;
        if (playing) {
            interval = setInterval(() => {
                setPos((pos) => pos + 1000);
            }, 1000);
        } else {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
    }, [playing]);
    const handleQueue = () => {
        dispatch(toggleQueue(!settings.isQueue));
    };
    //Seeker Code
    const handleSeeker = (seekTo) => {
        if (!seekTo) return;
        var seekms = parseInt((seekTo * current?.duration_ms).toFixed(0));
        spotify
            .seek(seekms)
            .then(function () {
                //console.log('Seek to ' + instance);
            })
            .catch(function (err) {
                //if the user making the request is non-premium, a 403 FORBIDDEN response code will be  returned
                console.log('Something went wrong!', err);
            });
    };

    const start = function (e) {
        setDragging(true);
    };

    const move = (e) => {
        var posX, posY;
        if (e.buttons === 0) return;
        pauseEvent(e);
        const target = document.getElementById('dot').getBoundingClientRect();
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
        angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
        //angle -= 180;
        if (angle < 0) {
            angle = 360 + angle;
        }
        angle = Math.round(angle);
        if (dragging) {
            document.getElementById(
                'dot-seeker'
            ).style.transform = `rotate(${rotatingAngle + angle}deg)`;
            setInstance(angle / 90);
        }
        setDragging(true);
    };
    const stop = function () {
        setDragging(false);
        if (dragging) {
            let seekTo = angle / 90;
            setInstance(seekTo);
            handleSeeker(seekTo);
        }
    };
    return (<div className={`circular-slider-cont-2 ${hside}`}>
        <div className='circular-slider-cont-2-controls-outer'>
            <div className={`quad-pp ${hside}`}>
                <button className="main-play-container" onClick={handlePlayPause}>
                    {playing ? (
                        <PauseIcon
                            style={{ color: 'white' }}
                            fontSize="large"
                        />
                    ) : (
                        <PlayArrowIcon
                            style={{ color: 'white' }}
                            fontSize="large"
                        />
                    )}
                </button>
                <button className={`quad-btn-l1 ${hside} t-btn`}>
                    <SkipNextTwoToneIcon
                        onClick={skipNext}
                        className="controls-icon"
                        fontSize="large"
                        style={{ color: 'white' }}
                    />
                </button>
                <button className={`quad-btn-l1 ${hside} t-btn`}>
                    <SkipPreviousTwoToneIcon
                        onClick={skipPrevious}
                        className="controls-icon"
                        fontSize="large"
                        style={{ color: 'white' }}
                    />
                </button>
                <button className={`quad-btn-l2 ${hside} t-btn`} onClick={handleQueue}>
                    <QueueMusicIcon
                        style={{
                            color: settings.isQueue
                                ? 'var(--main-theme)'
                                : 'white',
                        }}
                    />
                </button>
                <div className={`quad-btn-l2 ${hside} t-btn`}>
                    <ShuffleBtn />
                </div>
                <div className={`quad-btn-l2 ${hside} t-btn`}>
                    <RepeatBtn />
                </div>
                <p className={`text-timer timer-f ${hside}`}>
                    {current
                        ? millisToMinutesAndSeconds(
                            (instance * current.duration_ms).toFixed(0)
                        )
                        : '00:00'}
                </p>
                <p className={`text-timer timer-t ${hside}`}>
                    {current
                        ? millisToMinutesAndSeconds(current.duration_ms)
                        : '00:00'}
                </p>
            </div>
        </div>
        <div className="circling-2">
            {current && (
                <div className="player-3-album">
                    <div className="p-3-dur">
                        {current ? (
                            <>
                                <span className="h1" style={{ width: '3.5rem' }}>
                                    {millisToMinutesAndSeconds(
                                        (instance * current?.duration_ms).toFixed(0)
                                    )}
                                </span>
                                <span className="h5">
                                    {' / ' + millisToMinutesAndSeconds(current?.duration_ms)}
                                </span>
                            </>
                        ) : (
                            ''
                        )}
                    </div>
                </div>
            )}
            <div
                className="dots-2 dot-2"
                id="dot"
                onMouseDown={start}
                onTouchStart={start}
                onMouseMove={move}
                onMouseUp={stop}
                onTouchMove={move}
                onTouchEnd={stop}
            >
                <div
                    className="dot-seeker-2"
                    id="dot-seeker"
                    style={{ transform: `rotate(${rotatingAngle + instance * 90}deg)` }}
                ></div>
            </div>

            <svg width="200" height="200" viewBox="0 0 200 200" style={{ transform: `rotate(${handedness ? 180 : 270}deg)` }}>
                <circle cx="100" cy="100" r="100"></circle>
                <circle
                    cx="100"
                    cy="100"
                    r="100"
                    style={{
                        strokeDasharray: 1.56 * 100,
                        strokeDashoffset: 1.56 * 100 * (1 - instance),
                    }}
                ></circle>
            </svg>
        </div>
    </div>)
}
export default PlayerSlider4;