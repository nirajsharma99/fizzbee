import { useEffect, useRef, useState } from 'react';
import '../styling/routes.css';
import { getColor, getImage } from '../utils/helperFunctions';
import ListTracks from './track-lists';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import {
  handlePlayPause,
  playfromlist,
} from '../store/actions/spotify-actions';
import { CoverPlayButton } from '../player/buttons';
import { setCurrentTileId } from '../store/actions/player-actions';

function Playlist(props) {
  const [playlist, setPlaylist] = useState();
  const [following, setFollowing] = useState(false);
  const [changes, setChanges] = useState(false);
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);
  const playing = useSelector((state) => state.player.playing);
  const currentTileId = useSelector((state) => state.player.currentTileId);
  const spotify = useSpotify();
  const id = props?.match?.params.id;
  const imgRef = useRef();
  const isUsers = playlist?.info.owner.display_name === user?.display_name;
  const isCurrent = id === currentTileId;
  //console.log(props?.match?.params.id);
  useEffect(() => {
    if (!id) return;
    spotify
      .getPlaylist(id)
      .then((res) => {
        //console.log('fetched', res.body);
        setPlaylist({ info: res.body, tracks: res.body.tracks.items });
      })
      .catch((err) => console.log(err));
  }, [changes]);

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
            style={{ borderRadius: '20px' }}
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
          <div className="d-flex font-1 align-items-center justify-content-between">
            <div className="font-1">
              <span
                className="h1 me-1 "
                style={{ color: 'rgba(255,255,255,1)' }}
              >
                {playlist?.info?.followers?.total}
              </span>
              <span className="text-light">followers</span>
            </div>
            <span className="text-light h4 ">
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
