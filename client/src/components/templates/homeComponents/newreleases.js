import './styling/newreleases.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink } from 'react-router-dom';
import PlayTiles from '../../utils/playTiles';

function NewReleases() {
  const [{ newReleases, newReleasesTile }, dispatch] = useDataHandlerValue();

  //console.log(newReleases);
  const [bgColor, setBgColor] = useState(null);

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
    var indexed = newReleasesTile;
    if (indexed < newReleases.length - 3) {
      dispatch({ type: 'NEW_RELEASES_TILE', index: indexed + 1 });
    } else {
      dispatch({ type: 'NEW_RELEASES_TILE', index: 0 });
    }
  };
  const showPrevious = () => {
    var indexed = newReleasesTile;
    if (indexed > -2) {
      dispatch({ type: 'NEW_RELEASES_TILE', index: indexed - 1 });
    } else {
      dispatch({ type: 'NEW_RELEASES_TILE', index: 0 });
    }
  };

  return (
    <div>
      {newReleases && (
        <div className="tile-container">
          <div className="tiled">
            <NavLink
              to={{
                pathname: `/album/${newReleases?.[newReleasesTile + 2]?.id}`,
              }}
            >
              <img
                src={newReleases?.[newReleasesTile + 2]?.images[0]?.url}
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
              <PlayTiles
                index={0}
                id={newReleases?.[newReleasesTile + 2]?.id}
                type={'medium'}
                covertype="album"
              />
              <div className="d-none d-lg-flex flex-column">
                <span className="al">
                  {newReleases?.[newReleasesTile + 2]?.type}
                </span>
                <span className="aln">
                  {newReleases?.[newReleasesTile + 2]?.name}
                </span>
              </div>
            </div>
            <div className="tiled-right d-none d-lg-flex">
              <span className="ar">
                {newReleases?.[newReleasesTile + 2]?.artists?.[0]?.type}
              </span>
              {newReleases?.[newReleasesTile + 2]?.artists?.map((x, index) => (
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
          {newReleases?.[newReleasesTile + 1] && (
            <img
              src={newReleases?.[newReleasesTile + 1]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[newReleasesTile + 0] && (
            <img
              src={newReleases?.[newReleasesTile + 0]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[newReleasesTile + 3] && (
            <img
              src={newReleases?.[newReleasesTile + 3]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.[newReleasesTile + 4] && (
            <img
              src={newReleases?.[newReleasesTile + 4]?.images[0]?.url}
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
