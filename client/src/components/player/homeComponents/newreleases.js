import './styling/newreleases.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
const accessToken = window.localStorage.getItem('token');
function NewReleases({ play }) {
  spotify.setAccessToken(accessToken);
  const [{ newReleases }, dispatch] = useDataHandlerValue();
  const [bgColor, setBgColor] = useState(null);
  const [nextTo, setNextTo] = useState(0);

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
  const playAlbum = (id) => {
    spotify.getAlbumTracks(id, { limit: 10 }).then(
      function (data) {
        console.log('albumtracks', data.body);
        /*var list = [];
        data.body.items.map((x) => {
          list.push(x);
        });
        dispatch({
          type: 'SET_PLAYLIST',
          playlist: list,
        });*/
        console.log('playingalbumtracks', data.body.items[0].uri);
        play(data.body.items[0].uri);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  };
  return (
    <div>
      {newReleases && (
        <div className="tile-container">
          <div className="tiled">
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
            <div className="tiled-left">
              <button
                className="play-container mb-lg-3 mb-0"
                style={{ width: '70px', height: '70px' }}
                onClick={() =>
                  playAlbum(newReleases?.albums?.items[nextTo + 2]?.id)
                }
              >
                <PlayArrowIcon fontSize="large" />
              </button>
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
