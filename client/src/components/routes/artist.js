import { useEffect, useRef, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import { getColor } from '../utils/helperFunctions';
import './styling/styling.css';
import Album from '../templates/album';
import Artists from '../templates/artists';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import SpotifyWebApi from 'spotify-web-api-node';
import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';

const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Artist(props) {
  const id = props?.match?.params?.id;
  //console.log(props?.match?.params?.id);
  const [{ token }, dispatch] = useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');
  spotify.setAccessToken(accessToken);
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [toptracks, setToptracks] = useState();
  const [related, setRelated] = useState();
  const [following, setFollowing] = useState(false);
  const imgRef = useRef();

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
        //console.log('Artist albums', data.body.items);
        setAlbums(data.body.items);
      },
      function (err) {
        console.error(err);
      }
    );
    // Get an artist's top tracks
    spotify.getArtistTopTracks(id, 'IN').then(
      function (data) {
        //console.log(data.body);
        setToptracks(data.body.tracks);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

    // Get artists related to an artist
    spotify.getArtistRelatedArtists(id).then(
      function (data) {
        //console.log(data.body);
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

  return (
    <div className="display-cut">
      <div
        className="a-info"
        style={{
          background: `url(${artist?.info?.images[0]?.url}) no-repeat center center / cover`,
          borderRadius: '20px',
        }}
      >
        <div className="artist-l">
          <div className="a-data w-100 px-3" id={id + '3'}>
            <span className="artist-name">{artist?.info?.name}</span>
            <div className="d-md-flex d-block justify-content-between">
              <div className="font-1">
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
            ref={imgRef}
            crossOrigin="anonymous"
            alt={artist?.info?.name}
            onLoad={() => getColor(id, imgRef, 'artistPage')}
            style={{ borderRadius: '15px', width: '100%' }}
          />
        </div>
      </div>
      <div>
        <h2 className="section-heading p-3">Popular</h2>
        <div className="d-flex">
          <div className="p-tracks-pic text-left text-secondary"></div>
          <div className="p-tracks-info d-inline-block p-1 ms-2 text-left text-secondary">
            <span className="p-heading">TITLE</span>
          </div>
          <div className="p-tracks-album d-md-inline-block d-none p-1 text-left text-secondary">
            <span className="p-heading">ALBUM</span>
          </div>
          <div className="p-tracks-btn text-center text-secondary">
            <ScheduleTwoToneIcon style={{ color: 'rgb(0, 255, 127)' }} />
          </div>
        </div>

        {toptracks?.map((item, index) => (
          <TrackItems
            key={index}
            index={index}
            item={item}
            list={toptracks}
            isUsers={null}
            playlistId={null}
          />
        ))}
        {!toptracks && <SkeletonTracks />}
      </div>
      <div>
        <Album list={albums} />
      </div>
      <div className="mt-3">
        <Artists show={related} listName={'Fans also love'} />
      </div>
    </div>
  );
}
export default Artist;
