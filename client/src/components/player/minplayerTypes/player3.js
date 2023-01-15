import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseIcon from '@material-ui/icons/Pause';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import { getColor, getImage } from '../../utils/helperFunctions';
import { useRef } from 'react';
import { useSelector } from 'react-redux';
import DrawArc from '../../utils/drawArc';
import RepeatBtn from '../../utils/repeat';

const MinPlayer3 = ({ handlePlayPause, skipNext, skipPrevious, sideBartype }) => {
  const { current, playing } = useSelector((state) => state.player);
  const { darkMode, colorpalette } = useSelector((state) => state.app);
  const imgRef = useRef();
  const albumSM = getImage(current?.album?.images, 'sm');

  return (
    <div className={"minimised-player-3 " + (sideBartype && 'min-pos')} id={current?.id + '3'}>
      <DrawArc
        x={150}
        y={150}
        radius={150}
        startAngle={300}
        endAngle={60}
        svgWidth="300"
        svgHeight="300"
        svgViewBox="0 0 300 300"
        outerWidth='100%'
        outerHeight='100%'
        className={"mini-player-3-arc"}
        arcWidth={15}
        arcColor={"var(--min-player-3-bg-lite)"}
      />
      <div className="min-3-left">
        <img
          src={albumSM ? albumSM : '/bg3.png'}
          alt="album-art-mini"
          className="mini-album-art-3"
          ref={imgRef}
          crossOrigin="anonymous"
        />
      </div>
      <div className="min-3-mid">
        <div className="">
          <button className="t-btn" onClick={skipPrevious}>
            <SkipPreviousTwoToneIcon
              fontSize="large"
              style={{
                color:
                  darkMode || colorpalette ? 'white' : 'var(--text-primary)',
              }}
            />
          </button>
          <button className="t-btn" onClick={skipNext}>
            <SkipNextTwoToneIcon
              fontSize="large"
              style={{
                color:
                  darkMode || colorpalette ? 'white' : 'var(--text-primary)',
              }}
            />
          </button>
          <button className={"main-play-container " + (playing && 'pulse-outer')} onClick={handlePlayPause}>
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
        </div>
      </div>
      <div className="min-3-right">
        <RepeatBtn />
      </div>
    </div>
  );
};
export default MinPlayer3;
