import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import FastRewindRoundedIcon from '@material-ui/icons/FastRewindRounded';
import FastForwardRoundedIcon from '@material-ui/icons/FastForwardRounded';
import { getColorOnly, getImage } from '../../utils/helperFunctions';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import DoubleClick from '../../utils/DoubleClick';
import { handlePlayPause } from '../../store/actions/spotify-actions';
import MinSlider1 from '../nowPlayingSlider/mini-slider-1';
import RepeatBtn from '../../utils/repeat';
import UseOutsideAlerter from '../../utils/useClickedOutside';
import { islandConstants, islandPositionSettings } from '../settings/settingConstants';

const MinPlayer4 = ({ skipNext, skipPrevious, maxPlayer }) => {
    const dispatch = useDispatch();
    const [island, setIsland] = useState(true);
    const { current, playing, islandDouble, islandPos, islandSwipeLeft, islandSwipeRight } = useSelector((state) => state.player);
    const { darkMode, colorpalette } = useSelector((state) => state.app);
    const imgRef = useRef();
    const miniRef = useRef();

    const albumSM = getImage(current?.album?.images, 'sm');
    const songName = document.querySelector('.island-np-name');

    const getColorpalette = (ref) => {
        if (colorpalette) {
            let col = getColorOnly(ref);
            document.querySelector('.dynamic-island').style.background = `rgba(${col[0]},${col[1]},${col[2]},1)`;
        } else {
            document.querySelector('.dynamic-island').style.background = 'var(--max-player-1-bg)';
        }
    };

    useEffect(() => {
        document.querySelector('.dynamic-island').style.maxWidth = ``;
        if (!island) {
            songName.classList.remove('active');
            document.querySelector('.dynamic-island').classList.remove('expand');
        }
    }, [island])


    const showSong = () => {
        if (island) {
            document.querySelector('.dynamic-island')?.classList.add('expand');
            songName.classList.add('active');
        }
        if (songName.classList.contains('active')) {
            const timeout = setTimeout(() => {
                songName.classList.remove('active');
                document.querySelector('.dynamic-island').classList.remove('expand');
            }, 10000);
            return () => {
                clearTimeout(timeout);
            };
        }
    }


    const handlePlay = () => {
        dispatch(handlePlayPause());
    };
    const handleIsland = () => {
        setIsland(!island);
    }
    const shutIsland = () => {
        setIsland(true);
    }
    const handleDoubleCLick = () => {
        switch (islandConstants[islandDouble]?.use) {
            case 'playPause':
                handlePlay();
                break;

            case 'skipNext':
                skipNext();
                break;
            case 'skipPrevious':
                skipPrevious();
                break;
            default:
                console.log('please add this func to constant entries');
                break;
        }
    }

    const handleSwipeLeft = () => {
        switch (islandConstants[islandSwipeLeft]?.use) {
            case 'playPause':
                handlePlay();
                break;

            case 'skipNext':
                skipNext();
                break;
            case 'skipPrevious':
                skipPrevious();
                break;
            default:
                console.log('please add this func to constant entries');
                break;
        }
    }

    const handleSwipeRight = () => {
        switch (islandConstants[islandSwipeRight]?.use) {
            case 'playPause':
                handlePlay();
                break;

            case 'skipNext':
                skipNext();
                break;
            case 'skipPrevious':
                skipPrevious();
                break;
            default:
                console.log('please add this func to constant entries');
                break;
        }
    }

    // Swipe logic for smartphones----------------------------------------------------
    const [touchStart, setTouchStart] = useState(null);
    const [touchEnd, setTouchEnd] = useState(null);

    // the required distance between touchStart and touchEnd to be detected as a swipe
    const minSwipeDistance = 20;

    const onTouchStart = (e) => {
        setTouchEnd(null); // otherwise the swipe is fired even with usual touch events
        setTouchStart(e.targetTouches[0].clientX);
    }

    const onTouchMove = (e) => setTouchEnd(e.targetTouches[0].clientX);

    const onTouchEnd = () => {
        if (!touchStart || !touchEnd) return;
        if (!current) return;
        const distance = touchStart - touchEnd;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) isLeftSwipe ? handleSwipeLeft() : handleSwipeRight();
    }

    // Swipe Logic for desktops-------------------------------------------------------
    const [mouseDown, setMouseDown] = useState(null);
    const [mouseUp, setMouseUp] = useState(null);

    const onMouseDown = (e) => {
        setMouseDown(null); // otherwise the swipe is fired even with usual touch events
        setMouseDown(e.clientX);
    }
    const onMouseMove = (e) => setMouseUp(e.clientX);

    const onMouseUp = () => {
        if (!mouseDown || !mouseUp) return;
        if (!current) return;
        const distance = mouseDown - mouseUp;
        const isLeftSwipe = distance > minSwipeDistance;
        const isRightSwipe = distance < -minSwipeDistance;
        if (isLeftSwipe || isRightSwipe) isLeftSwipe ? handleSwipeLeft() : handleSwipeRight();
    }

    return (
        <DoubleClick
            onDoubleClick={handleDoubleCLick}
            onClick={handleIsland}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            onMouseMove={onMouseMove}
            className={"dynamic-island " + (islandPositionSettings[islandPos]?.class) + (island ? '' : ' active')}
            ref={miniRef}>
            <div className="island">
                <UseOutsideAlerter ref={miniRef} handleFunc={shutIsland} />
                <div className='mini-island'>
                    <img
                        src={albumSM ? albumSM : '/bg3.png'}
                        alt="album-art-mini"
                        ref={imgRef}
                        crossOrigin="anonymous"
                        onLoad={() => { getColorpalette(imgRef); showSong() }}
                    />
                    <span className='island-np-name' style={{ textAlign: (current?.name.length < 25) ? 'center' : 'left' }}>{current?.name}</span>
                    <div className="island-s-info" hidden={island}>
                        <span
                            className="np-name"
                            style={{
                                color: darkMode || colorpalette ? 'white' : 'var(--text-primary)',
                            }}
                        >
                            {current ? current.name : 'Music track'}
                        </span>
                        <span
                            className="bp-name"
                            style={{
                                color: 'var(--bp-name)',
                            }}
                        >
                            {current
                                ? current?.artists?.map(
                                    (item, index) => (index ? ', ' : '') + item.name
                                )
                                : 'by..'}
                        </span>
                    </div>
                    <div className='loader'>
                        {Array(5)
                            .fill()
                            .map((x, i) => (
                                <span key={i} className="stroke" style={{ background: current?.name ? '' : 'black', animationPlayState: playing ? '' : 'paused' }}></span>
                            ))}
                    </div>
                </div>
                <div className="island-controls" hidden={island}>
                    <div className='controls-slider'>
                        <MinSlider1 />
                    </div>
                    <div className='controls-btn'>
                        <button className="t-btn" onClick={maxPlayer}>
                            <ion-icon name="open-outline"></ion-icon>
                        </button>
                        <button className="t-btn" onClick={skipPrevious}>
                            <FastRewindRoundedIcon
                                fontSize="large"
                                style={{
                                    color:
                                        darkMode || colorpalette ? 'white' : 'var(--text-primary)',
                                }}
                            />
                        </button>
                        <button className="t-btn" onClick={handlePlay}>
                            {playing ? (
                                <PauseIcon
                                    fontSize="large"
                                    style={{
                                        color:
                                            darkMode || colorpalette
                                                ? 'white'
                                                : 'var(--text-primary)',
                                    }}
                                />
                            ) : (
                                <PlayArrowIcon
                                    fontSize="large"
                                    style={{
                                        color:
                                            darkMode || colorpalette
                                                ? 'white'
                                                : 'var(--text-primary)',
                                    }}
                                />
                            )}
                        </button>
                        <button className="t-btn" onClick={skipNext}>
                            <FastForwardRoundedIcon
                                fontSize="large"
                                style={{
                                    color:
                                        darkMode || colorpalette ? 'white' : 'var(--text-primary)',
                                }}
                            />
                        </button>
                        <RepeatBtn color='grey' />
                    </div>
                </div>
            </div>
            <div></div>
        </DoubleClick>
    );
};
export default MinPlayer4;
