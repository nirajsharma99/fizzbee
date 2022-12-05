import PlayArrowTwoToneIcon from '@material-ui/icons/PlayArrowTwoTone';
import PauseTwoToneIcon from '@material-ui/icons/PauseTwoTone';
import SkipPreviousTwoToneIcon from '@material-ui/icons/SkipPreviousTwoTone';
import SkipNextTwoToneIcon from '@material-ui/icons/SkipNextTwoTone';
import {
  getColor,
  getImage,
  getArtistNames,
} from '../../utils/helperFunctions';
import { useRef } from 'react';
import { useSelector } from 'react-redux';

const MinPlayer2 = ({ handlePlayPause, skipNext, skipPrevious, sideBartype }) => {
  const { current, playing } = useSelector((state) => state.player);
  const { darkMode, colorpalette } = useSelector((state) => state.app);
  const imgRef = useRef();
  const albumSM = getImage(current?.album?.images, 'md');
  const artistNames = getArtistNames(current?.artists);

  const getColorpalette = (id, ref, type) => {
    if (colorpalette) {
      getColor(id, ref, type);
    } else {
      document.querySelector('.minimised-player-2').style.background =
        'var(--max-player-1-bg)';
    }
  };
  return (
    <div className={"minimised-player-2 " + (sideBartype && 'min-pos')} id={current?.id + '3'}>
      <div className="min-2-left">
        <img
          src={albumSM ? albumSM : '/bg3.png'}
          alt="album-art-mini"
          className="mini-album-art-2"
          ref={imgRef}
          crossOrigin="anonymous"
          onLoad={() => getColorpalette(current?.id, imgRef, 'player')}
        />
      </div>
      <div className={'min-2-mid'}>
        <span
          className={
            'np-name-min ' + (current?.name.length > 30 && 'text-anim')
          }
          style={{
            color: darkMode || colorpalette ? 'white' : 'var(--text-primary)',
          }}
        >
          {current ? current.name : 'Music track'}
        </span>
        <div className="np-by-outer">
          <span
            className={'np-by-min ' + (artistNames?.length > 30 && 'text-anim')}
            style={{
              color: darkMode || colorpalette ? 'grey' : 'var(--bp-name)',
            }}
          >
            {current ? artistNames : 'by..'}
          </span>
        </div>
      </div>
      <div className="min-2-right">
        <button className="t-btn" onClick={skipPrevious}>
          <SkipPreviousTwoToneIcon
            fontSize="large"
            style={{
              color: darkMode || colorpalette ? 'white' : 'var(--text-primary)',
            }}
          />
        </button>
        <button className="t-btn" onClick={handlePlayPause}>
          {playing ? (
            <PauseTwoToneIcon
              fontSize="large"
              style={{
                color:
                  darkMode || colorpalette ? 'white' : 'var(--text-primary)',
              }}
            />
          ) : (
            <PlayArrowTwoToneIcon
              fontSize="large"
              style={{
                color:
                  darkMode || colorpalette ? 'white' : 'var(--text-primary)',
              }}
            />
          )}
        </button>
        <button className="t-btn" onClick={skipNext}>
          <SkipNextTwoToneIcon
            fontSize="large"
            style={{
              color: darkMode || colorpalette ? 'white' : 'var(--text-primary)',
            }}
          />
        </button>
      </div>
    </div>
  );
};
export default MinPlayer2;
