import './styling/newreleases.css';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink, useRouteMatch } from 'react-router-dom';
import {
  getAlbum,
  handlePlayPause,
  playfromlist,
} from '../../store/actions/spotify-actions';
import { setCurrentTileId } from '../../store/actions/player-actions';
import { useDispatch, useSelector } from 'react-redux';
import { MediumPlayButton } from '../../player/buttons';
import { getCorrectPath } from '../../utils/helperFunctions';

function NewReleases({ newReleases }) {
  const [bgColor, setBgColor] = useState(null);
  const [tile, setTile] = useState(0);
  const dispatch = useDispatch();
  const playing = useSelector((state) => state.player.playing);
  const currentTileId = useSelector((state) => state.player.currentTileId);
  const { path } = useRouteMatch();
  const getPath = getCorrectPath(path);

  const getColor = () => {
    const colorThief = new ColorThief();
    const img = document.getElementById('main-album');
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    setBgColor(color);
  };

  const showNext = () => {
    if (tile < newReleases.length - 3) {
      setTile((tile) => tile + 1);
    } else {
      setTile(0);
    }
  };
  const showPrevious = () => {
    if (tile > -2) {
      setTile((tile) => tile - 1);
    } else {
      setTile(0);
    }
  };
  const handlePlayTile = (id) => {
    if (playing && id === currentTileId) {
      dispatch(handlePlayPause());
    } else {
      getAlbum(id).then(
        function (data) {
          dispatch(setCurrentTileId(id));
          dispatch(playfromlist(0, data.body.tracks.items));
        },
        function (err) {
          console.error(err);
        }
      );
    }
  };

  return (
    <div>
      {newReleases && (
        <div className="tile-container">
          <div className="tiled">
            <NavLink
              to={{
                pathname: `${getPath}/album/${newReleases?.[tile + 2]?.id}`,
              }}
            >
              <img
                src={newReleases?.[tile + 2]?.images[0]?.url}
                alt="new_releases"
                className="tiled"
                id="main-album"
                onLoad={getColor}
                style={{
                  background: `rgb(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]})`,
                }}
                crossOrigin="anonymous"
              />
            </NavLink>
            <div className="tiled-left">
              <MediumPlayButton
                playing={playing}
                isCurrent={newReleases?.[tile + 2]?.id === currentTileId}
                onClick={() => handlePlayTile(newReleases?.[tile + 2]?.id)}
              />
              <div className="d-none d-lg-flex flex-column">
                <span className="al">{newReleases?.[tile + 2]?.type}</span>
                <span className="aln">{newReleases?.[tile + 2]?.name}</span>
              </div>
            </div>
            <div className="tiled-right d-none d-lg-flex">
              <span className="ar">
                {newReleases?.[tile + 2]?.artists?.[0]?.type}
              </span>
              {newReleases?.[tile + 2]?.artists?.map((x, index) => (
                <span key={index} className="arn">
                  {x.name}
                </span>
              ))}
            </div>
            <div className="prev-album">
              <button onClick={showPrevious}>
                <ChevronLeftIcon />
              </button>
            </div>
            <div className="next-album">
              <button onClick={showNext}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
          {newReleases?.[tile + 1] && (
            <img
              src={newReleases?.[tile + 1]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[tile + 0] && (
            <img
              src={newReleases?.[tile + 0]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[tile + 3] && (
            <img
              src={newReleases?.[tile + 3]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[tile + 4] && (
            <img
              src={newReleases?.[tile + 4]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
        </div>
      )}
    </div>
  );
}
export default NewReleases;
