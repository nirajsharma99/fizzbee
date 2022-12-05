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
import { islandConstants } from '../settings/settingConstants';

const MinPlayer4 = ({ skipNext, skipPrevious, sideBartype, maxPlayer }) => {
    const dispatch = useDispatch();
    const [island, setIsland] = useState(true);
    const { current, playing, islandDouble } = useSelector((state) => state.player);
    const { darkMode, colorpalette } = useSelector((state) => state.app);
    const imgRef = useRef();
    const miniRef = useRef();

    const albumSM = getImage(current?.album?.images, 'sm');

    const getColorpalette = (id, ref, type) => {
        if (colorpalette) {
            let col = getColorOnly(ref);
            document.querySelector('.dynamic-island').style.background = `rgba(${col[0]},${col[1]},${col[2]},1)`;
        } else {
            document.querySelector('.dynamic-island').style.background = 'var(--max-player-1-bg)';
        }
    };

    useEffect(() => {
        document.querySelector('.dynamic-island').style.maxWidth = ``;
    }, [island])

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
    return (
        <DoubleClick onDoubleClick={handleDoubleCLick} onClick={handleIsland} className={"dynamic-island " + (island ? '' : 'active')} ref={miniRef}>
            <div className="island">
                <UseOutsideAlerter ref={miniRef} handleFunc={shutIsland} />
                <div className='mini-island'>
                    <img
                        src={albumSM ? albumSM : '/bg3.png'}
                        alt="album-art-mini"
                        ref={imgRef}
                        crossOrigin="anonymous"
                        onLoad={() => getColorpalette(current?.id, imgRef, 'player')}
                    />
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
                                color: darkMode || colorpalette ? 'grey' : 'var(--bp-name)',
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
