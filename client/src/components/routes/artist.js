import { useEffect, useRef, useState } from 'react';
import { getColor, getImage } from '../utils/helperFunctions';
import '../styling/routes.css';
import Album from '../templates/album';
import Artists from '../templates/artists';
import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';
import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';
import useSpotify from '../hooks/useSpotify';
import {
  followArtists,
  getArtist,
  getArtistAlbums,
  getArtistRelatedArtists,
  getArtistTopTracks,
  isFollowingArtists,
  unfollowArtists,
} from '../store/actions/spotify-actions';

function Artist(props) {
  const id = props?.match?.params?.id;
  //console.log(props?.match?.params?.id);
  const spotify = useSpotify();
  const [artist, setArtist] = useState();
  const [albums, setAlbums] = useState();
  const [toptracks, setToptracks] = useState();
  const [related, setRelated] = useState();
  const [following, setFollowing] = useState(false);
  const imgRef = useRef();

  useEffect(() => {
    // Get an artist
    getArtist(id).then(
      function (data) {
        //console.log('Artist information', data.body);
        setArtist({ ...artist, info: data.body });
      },
      function (err) {
        console.error(err);
      }
    );
    // Get albums by a certain artist
    getArtistAlbums(id).then(
      function (data) {
        //console.log('Artist albums', data.body.items);
        setAlbums(data.body.items);
      },
      function (err) {
        console.error(err);
      }
    );
    // Get an artist's top tracks
    getArtistTopTracks(id).then(
      function (data) {
        //console.log(data.body);
        setToptracks(data.body.tracks);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );

    // Get artists related to an artist
    getArtistRelatedArtists(id).then(
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
    isFollowingArtists(artistsId).then(
      function (data) {
        setFollowing(data.body?.[0]);
      },
      function (err) {
        console.log('Something went wrong!', err);
      }
    );
  }, [id]);

  const follow = () => {
    if (following) {
      /* Unfollow an artist */
      unfollowArtists([id]).then(
        function (data) {
          setFollowing(false);
        },
        function (err) {
          console.log('Something went wrong!', err);
        }
      );
    } else {
      /* Follow an artist */
      followArtists([id]).then(
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
          background: `url(${getImage(
            artist?.info?.images,
            'lg'
          )}) no-repeat center center / cover`,
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
            src={getImage(artist?.info?.images, 'md')}
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
            <MusicNoteTwoToneIcon className="theme" />
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
