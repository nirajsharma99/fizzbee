import { useEffect, useRef, useState } from 'react';
import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import { getImage, millisToMinutesAndSeconds } from '../utils/helperFunctions';
import {
  getAlbum,
  handlePlayPause,
  playfromlist,
} from '../store/actions/spotify-actions.js';
import { useDispatch, useSelector } from 'react-redux';
import { CoverPlayButton, SmallPlayButton } from '../player/buttons.js';
import { setCurrentTileId } from '../store/actions/player-actions.js';

function Album(props) {
  const id = props?.match?.params?.id;
  const imgRef = useRef();
  const [album, setAlbum] = useState();
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.player.playing);
  const currentTileId = useSelector((state) => state.player.currentTileId);
  const current = useSelector((state) => state.player.current);
  const isCurrent = id === currentTileId;

  useEffect(() => {
    getAlbum(id).then(
      function (data) {
        //console.log('Album information', data.body);
        setAlbum({ info: data.body, tracks: data.body.tracks.items });
      },
      function (err) {
        console.error(err);
      }
    );
  }, [id]);

  const getColor = () => {
    const colorThief = new ColorThief();
    const img = imgRef.current;
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    document.getElementById(
      'choose1'
    ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
  };

  const handlePlayTile = () => {
    if (playing && isCurrent) {
      dispatch(handlePlayPause());
    } else {
      dispatch(setCurrentTileId(id));
      dispatch(playfromlist(0, album.tracks));
    }
  };

  const handlePlayingSong = (index) => {
    if (isCurrent) {
      dispatch(handlePlayPause());
    } else {
      dispatch(playfromlist(index, album.tracks));
    }
  };

  return (
    <div className="display-cut">
      <div
        className="album-info"
        style={{
          background: `url(${getImage(
            album?.info?.images,
            'lg'
          )}) no-repeat center center / cover`,
          borderRadius: '20px',
        }}
      >
        <div className="album-r">
          <div className="album-data w-100 px-3 font-1" id="choose1">
            <p className="text-light mb-0">ALBUM</p>
            <span className="h1 text-light">{album?.info?.name}</span>
          </div>
        </div>
        <div className="album-l">
          <img
            src={getImage(album?.info?.images, 'md')}
            ref={imgRef}
            crossOrigin="anonymous"
            alt={album?.info?.name}
            onLoad={getColor}
            style={{ borderRadius: '15px', width: '100%' }}
          />
          <CoverPlayButton
            playing={playing}
            isCurrent={isCurrent}
            onClick={handlePlayTile}
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="d-flex">
          <div className="album-tracks-info d-inline-block p-1 ms-2 text-left text-secondary">
            <span className="p-heading">TITLE</span>
          </div>

          <div className="album-tracks-btn text-center text-secondary">
            <MusicNoteTwoToneIcon className="theme" />
          </div>
        </div>

        {album?.tracks?.map((item, index) => (
          <div key={index} className="p-t-container">
            <div className="album-tracks-info font-1 ms-2">
              <span className="text-light h5 mb-0">{item?.name}</span>
              <span className="text-secondary">
                {item?.artists.map(
                  (item, index) => (index ? ', ' : '') + item.name
                )}
              </span>
            </div>

            <div className="album-tracks-btn d-flex justify-content-end align-items-center">
              <span className="text-secondary me-5 d-lg-block d-none">
                {millisToMinutesAndSeconds(item?.duration_ms)}
              </span>
              <SmallPlayButton
                playing={playing}
                isCurrent={item.name === current?.name}
                onClick={() => handlePlayingSong(index)}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Album;
