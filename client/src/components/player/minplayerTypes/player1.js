import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import PauseIcon from '@material-ui/icons/Pause';
import {
  getImage,
  getColorOnly,
  getArtistNames,
} from '../../utils/helperFunctions';
import { useSelector } from 'react-redux';
import { useRef, useEffect, useState } from 'react';
const MinPlayer1 = ({ handlePlayPause }) => {
  const { current, playing } = useSelector((state) => state.player);
  const position_ms = useSelector((state) => state.player.position_ms);
  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const albumPic = getImage(current?.album?.images, 'md');
  const imgRef = useRef();
  const artistNames = getArtistNames(current?.artists);

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

  return (
    <div className="minimised-player">
      <div className="min-left">
        <div className="mini-circle">
          <img
            src={albumPic ? albumPic : '/bg3.png'}
            alt="album-art-mini"
            className="mini-album-art"
            ref={imgRef}
            crossOrigin="anonymous"
            onLoad={() => {
              let col = getColorOnly(imgRef);
              document.documentElement.style.setProperty(
                '--col-thief',
                `rgb(${col[0]},${col[1]},${col[2]})`
              );
            }}
          />
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle
              cx="40"
              cy="40"
              r="43"
              style={{
                strokeDasharray: 6.2831 * 43,
                strokeDashoffset: 6.2831 * 43 * (1 - instance),
              }}
            ></circle>
          </svg>
        </div>
      </div>
      <div className={'min-mid '}>
        <span
          className={
            'np-name-min ' + (current?.name.length > 30 && 'text-anim')
          }
        >
          {' '}
          {current ? current.name : 'Music track'}
        </span>
        <div className="np-by-outer">
          <span
            className={'np-by-min ' + (artistNames?.length > 30 && 'text-anim')}
          >
            {current ? artistNames : 'by..'}
          </span>
        </div>
      </div>
      <div className="min-right">
        <div className="pp-mini">
          <button className="mini-play-container" onClick={handlePlayPause}>
            {playing ? (
              <PauseIcon fontSize="large" />
            ) : (
              <PlayArrowIcon fontSize="large" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
export default MinPlayer1;
