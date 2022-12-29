import { useEffect, useRef, useState } from 'react';
import '../styling/routes.css';
import { getColor, getImage } from '../utils/helperFunctions';
import ListTracks from './track-lists';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import {
  isFollowingPlaylist,
  handlePlayPause,
  playfromlist,
} from '../store/actions/spotify-actions';
import { CoverPlayButton } from '../player/buttons';
import { setCurrentTileId } from '../store/actions/player-actions';
import { setNotibar } from '../store/actions/app-actions';

function Playlist(props) {
  const [playlist, setPlaylist] = useState();
  const [following, setFollowing] = useState();
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const playing = useSelector((state) => state.player.playing);
  const currentTileId = useSelector((state) => state.player.currentTileId);
  const token = useSelector((state) => state.player.token);
  const spotify = useSpotify();
  const id = props?.match?.params.id;
  const imgRef = useRef();
  const isUsers = playlist?.info.owner.display_name === user?.display_name;
  const isCurrent = id === currentTileId;
  //console.log(playlist?.tracks);
  useEffect(() => {
    if (!id) return;
    spotify
      .getPlaylist(id)
      .then((res) => {
        setPlaylist({ info: res.body, tracks: res.body.tracks.items });
        isFollowingPlaylist(token, res.body.id, user?.id)
          .then((res) => {
            setFollowing(res.data[0]);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }, [changes, following]);

  const follow = () => {
    if (following) {
      spotify.unfollowPlaylist(id).then(
        function (data) {
          setFollowing(false);
          dispatch(setNotibar('Unfollowed Playlist!', true, 7000));
        },
        function (err) {
          console.log('Something went wrong!', err);
          dispatch(setNotibar('Error occured..', false, 7000));
        }
      );
    } else {
      spotify
        .followPlaylist(id, {
          public: false,
        })
        .then(
          function (data) {
            dispatch(setNotibar('Started Following!!', true, 7000));
            setFollowing(true);
          },
          function (err) {
            console.log('Something went wrong!', err);
            dispatch(setNotibar('Error occured..', false, 7000));
          }
        );
    }
  };

  const handlePlayTile = () => {
    if (playing && isCurrent) {
      dispatch(handlePlayPause());
    } else {
      dispatch(setCurrentTileId(id));
      dispatch(playfromlist(0, playlist.tracks));
    }
  };

  return (
    <div className="display-cut">
      <div
        className="p-info"
        id={playlist?.info?.id}
        style={{ borderRadius: '15px' }}
      >
        <div className="pl p-lg-5 p-2 position-relative">
          <img
            src={getImage(playlist?.info.images, 'md')}
            ref={imgRef}
            style={{ borderRadius: '0px' }}
            alt={playlist?.info.name}
            crossOrigin="anonymous"
            className="w-100"
            onLoad={() => getColor(id, imgRef, 'playlist')}
          />

          <CoverPlayButton
            playing={playing}
            isCurrent={isCurrent}
            onClick={handlePlayTile}
          />
        </div>
        <div className="pr px-3 font-1 py-4 d-flex flex-column">
          <span className="text-secondary">PLAYLIST</span>
          <span className="display-6 text-light">{playlist?.info.name}</span>
          <span className="h4 text-light">{playlist?.info.description}</span>
          <div className="d-flex font-1 align-items-baseline justify-content-between">
            <div className="font-1">
              <span
                className="h1 me-1 "
                style={{ color: 'rgba(255,255,255,1)' }}
              >
                {playlist?.info?.followers?.total}
              </span>
              <span className="text-light">followers</span>
            </div>
            <span className="text-light h4 my-0">
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
      <div className="p-tracks slidefrombottom">
        <ListTracks
          list={playlist?.tracks}
          isUsers={isUsers}
          playlistId={playlist?.info.id}
          setChanges={setChanges}
        />
      </div>
    </div>
  );
}
export default Playlist;
