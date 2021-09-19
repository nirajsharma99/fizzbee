import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';
import './styling/styling.css';
import Album from '../templates/album';
import Artists from '../templates/artists';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Artist(props) {
  const id = props?.match?.params?.id;
  console.log(props?.match?.params?.id);
  const [{ deviceId, token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [toptracks, setToptracks] = useState();
  const [related, setRelated] = useState();
  const [following, setFollowing] = useState(false);

  useEffect(() => {
    // Get an artist
    spotify.getArtist(id).then(
      function (data) {
        console.log('Artist information', data.body);
        setArtist({ ...artist, info: data.body });
      },
      function (err) {
        console.error(err);
      }
    );
    // Get albums by a certain artist
    spotify.getArtistAlbums(id, { limit: 50 }).then(
      function (data) {
        console.log('Artist albums', data.body.items);
        setAlbums(data.body.items);
      },
      function (err) {
        console.error(err);
      }
    );
    // Get an artist's top tracks
    spotify.getArtistTopTracks(id, 'IN').then(
      function (data) {
        console.log(data.body);
        setToptracks(data.body.tracks);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

    // Get artists related to an artist
    spotify.getArtistRelatedArtists(id).then(
      function (data) {
        console.log(data.body);
        setRelated(data.body.artists);
      },
      function (err) {
        console.log(id);
      }
    );

    /* Check if a user is following an artist */
    let artistsId = [id];
    spotify.isFollowingArtists(artistsId).then(
      function (data) {
        let isFollowing = data.body;
        setFollowing(isFollowing?.[0]);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, [id]);

  const getColor = (id, index) => {
    console.log('here', id);
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
      'choose1'
    ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
  };
  const follow = () => {
    if (following) {
      /* Unfollow an artist */
      spotify.unfollowArtists([id]).then(
        function (data) {
          setFollowing(false);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    } else {
      /* Follow an artist */
      spotify.followArtists([id]).then(
        function (data) {
          setFollowing(true);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    }
  };
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  const play = (uri) => {
    console.log(uri);
    spotify
      .play({
        uris: [uri],
        device_id: deviceId,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((x) => {
          console.log('current in api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });
          spotify
            .getAudioFeaturesForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio features', data.body);
            })
            .catch((err) => {
              console.log(err);
            });

          /* Get Audio Analysis for a Track */
          spotify
            .getAudioAnalysisForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio analysis', data.body);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <div style={{ paddingBottom: '8rem' }}>
      <div
        className="a-info"
        style={{
          background: `url(${artist?.info?.images[0]?.url}) no-repeat center center / cover`,
          borderRadius: '20px',
        }}
      >
        <div className="artist-l">
          <div className="a-data w-100 px-3" id="choose1">
            <span className="h1 text-light">{artist?.info?.name}</span>
            <div className="d-md-flex d-block justify-content-between">
              <div>
                <span className="h3 text-light me-2">
                  {artist?.info?.followers?.total}
                </span>
                <span className="text-light">followers</span>
              </div>
              <button
                className="outline-none bg-transparent text-light border rounded px-3 py-2 mt-2"
                onClick={follow}
              >
                {following ? 'UNFOLLOW' : 'FOLLOW'}
              </button>
            </div>
          </div>
        </div>
        <div className="artist-r">
          <img
            src={artist?.info?.images[1]?.url}
            id={artist?.info?.id}
            crossOrigin="anonymous"
            alt={artist?.info?.name}
            onLoad={() => getColor(id)}
            style={{ borderRadius: '15px', width: '100%' }}
          />
        </div>
      </div>
      <div>
        <h2 className="text-light p-3">Popular</h2>
        {toptracks?.map((item, index) => (
          <div
            key={index}
            className="px-sm-3 py-2 d-flex justify-content-center"
          >
            <div className="p-tracks-pic">
              <img
                src={item?.album?.images[2].url}
                style={{ borderRadius: '10px' }}
              />
            </div>
            <div className="p-tracks-info ms-2">
              <span className="text-light h5 mb-0">{item?.name}</span>
              <span className="text-secondary">
                {item?.artists.map((artist) => artist.name + ', ')}
              </span>
            </div>
            <div className="p-tracks-album ">
              <span className="text-secondary h6">{item?.album?.name}</span>
            </div>
            <div className="p-tracks-btn d-flex justify-content-end align-items-center">
              <span className="text-secondary me-5 d-lg-block d-none">
                {millisToMinutesAndSeconds(item?.duration_ms)}
              </span>
              <button
                className="border-0 bg-transparent"
                style={{ color: 'rgb(0, 255, 127)' }}
                onClick={() => {
                  play(item?.uri);
                }}
              >
                <PlayArrowIcon fontSize="large" />
              </button>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h2 className="text-light p-3">Albums</h2>
        <Album list={albums} />
      </div>
      <div className="mt-3">
        <Artists show={related} listName={'Fans also love'} />
      </div>
    </div>
  );
}
export default Artist;
