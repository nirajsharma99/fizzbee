import './styling/newreleases.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useEffect, useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { NavLink } from 'react-router-dom';
import PlayTiles from '../../utlil/playTiles';
import SpotifyWebApi from 'spotify-web-api-node';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const accessToken = window.localStorage.getItem('token');
function NewReleases() {
  const [{ newReleases }, dispatch] = useDataHandlerValue();

  spotify.setAccessToken(accessToken);
  //console.log(newReleases);
  const [bgColor, setBgColor] = useState(null);
  const [nextTo, setNextTo] = useState(0);
  useEffect(() => {
    if (accessToken) {
      spotify.getNewReleases({ country: 'IN' }).then((newReleases) => {
        //console.log('new releases', newReleases.body);
        dispatch({
          type: 'NEW_RELEASES',
          newReleases: newReleases.body,
        });
      });
    }
  }, [accessToken]);
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

  return (
    <div>
      {newReleases && (
        <div className="tile-container">
          <div className="tiled">
            <NavLink
              to={{
                pathname: `/album/${
                  newReleases?.albums?.items[nextTo + 2]?.id
                }`,
              }}
            >
              <img
                src={newReleases?.albums?.items[nextTo + 2]?.images[0]?.url}
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
                albumId={newReleases?.albums?.items[nextTo + 2]?.id}
                type={'medium'}
              />
              <div className="d-none d-lg-flex flex-column">
                <span className="al">
                  {newReleases?.albums?.items[nextTo + 2]?.type}
                </span>
                <span className="aln">
                  {newReleases?.albums?.items[nextTo + 2]?.name}
                </span>
              </div>
            </div>
            <div className="tiled-right d-none d-lg-flex">
              <span className="ar">
                {newReleases?.albums?.items[nextTo + 2]?.artists?.[0]?.type}
              </span>
              {newReleases?.albums?.items[nextTo + 2]?.artists?.map(
                (x, index) => (
                  <span key={index} className="arn">
                    {x.name}
                  </span>
                )
              )}
            </div>
            <div className="prev-album">
              <button onClick={() => setNextTo(nextTo - 1)}>
                <ChevronLeftIcon />
              </button>
            </div>
            <div className="next-album">
              <button onClick={() => setNextTo(nextTo + 1)}>
                <ChevronRightIcon />
              </button>
            </div>
          </div>
          {newReleases?.albums?.items[nextTo + 1] && (
            <img
              src={newReleases?.albums?.items[nextTo + 1]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.albums?.items[nextTo + 0] && (
            <img
              src={newReleases?.albums?.items[nextTo + 0]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.albums?.items[nextTo + 3] && (
            <img
              src={newReleases?.albums?.items[nextTo + 3]?.images[0]?.url}
              alt="new_releases"
              className="tile"
            />
          )}
          {newReleases?.albums?.items[nextTo + 4] && (
            <img
              src={newReleases?.albums?.items[nextTo + 4]?.images[0]?.url}
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
