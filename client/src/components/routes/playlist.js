import { useEffect, useState } from 'react';
import './styling/styling.css';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';

import SpotifyWebApi from 'spotify-web-api-node';
import ListTracks from './lists';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});

function Playlist(props) {
  const [playlist, setPlaylist] = useState();
  const [following, setFollowing] = useState(false);
  const [{ deviceId, token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  const id = props?.match?.params.id;
  //console.log(props?.match?.params.id);
  useEffect(() => {
    if (id) {
      spotify
        .getPlaylist(id)
        .then((res) => {
          console.log('fetched', res.body);
          setPlaylist({ info: res.body, tracks: res.body.tracks.items });
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const follow = () => {
    if (following) {
      spotify.unfollowPlaylist(id).then(
        function (data) {
          console.log('Playlist successfully unfollowed!');
          setFollowing(false);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    } else {
      spotify
        .followPlaylist(id, {
          public: false,
        })
        .then(
          function (data) {
            console.log('Playlist successfully followed privately!');
            setFollowing(true);
          },
          function (err) {
            console.log('Something went wrong!', err);
          }
        );
    }
  };

  const getColor = (id) => {
    const colorThief = new ColorThief();
    const img = document.getElementById(id);
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    document.getElementById(
      id + 1
    ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), black)`;
  };

  return (
    <div className="p-outer">
      <div
        className="p-info"
        id={playlist?.info?.id + 1}
        style={{ borderRadius: '15px' }}
      >
        <div className="pl p-lg-5 p-2 position-relative">
          <img
            src={playlist?.info.images[0]?.url}
            id={playlist?.info?.id}
            style={{ borderRadius: '20px' }}
            alt={playlist?.info.name}
            crossOrigin="anonymous"
            className="w-100"
            onLoad={() => getColor(id)}
          />
          <button
            className="play-container p-3 position-absolute"
            style={{ bottom: '40px', right: '15px' }}
            onClick={() => {}}
          >
            <PlayArrowIcon fontSize="large" />
          </button>
        </div>
        <div className="pr px-3 py-4 d-flex flex-column">
          <span className="text-secondary">PLAYLIST</span>
          <span className="display-4 font-1 text-light">
            {playlist?.info.name}
          </span>
          <span className="h4 font-1 text-light">
            {playlist?.info.description}
          </span>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <span
                className="h1 me-1 font-1"
                style={{ color: 'rgba(255,255,255,1)' }}
              >
                {playlist?.info?.followers?.total}
              </span>
              <span className="font-1 text-light">followers</span>
            </div>
            <span className="text-light h4 font-1">
              {playlist?.tracks?.length} tracks
            </span>
          </div>
          <div className="mt-3">
            <button
              className="outline-none bg-transparent text-light border rounded px-3 py-2"
              onClick={follow}
            >
              {following ? 'UNFOLLOW' : 'FOLLOW'}
            </button>
          </div>
        </div>
      </div>
      <div className="p-tracks">
        <ListTracks list={playlist?.tracks} />
      </div>
    </div>
  );
}
export default Playlist;
