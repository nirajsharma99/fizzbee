
import { isFollowingPlaylist } from '../../store/actions/spotify-actions';
import { useDispatch, useSelector } from 'react-redux';
import useSpotify from '../../hooks/useSpotify';
import { setNotibar } from '../../store/actions/app-actions';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';
import { setPlaylist } from '../../store/actions/library-actions';
import { useEffect, useState } from 'react';
import { getCorrectPath } from '../../utils/helperFunctions';
import { NavLink, useRouteMatch } from 'react-router-dom';

function PlaylistCard({ item, index }) {

    const spotify = useSpotify();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const token = useSelector((state) => state.player.token);
    const [following, setFollowing] = useState();

    const { path } = useRouteMatch();
    const getPath = getCorrectPath(path);

    const id = item?.id;

    const getColor = ({ id, index }) => {
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
            id
        ).style.boxShadow = `0 4px 5px rgb(${color[0]},${color[1]},${color[2]})`;

        document.getElementById(id + index).style.background = `
          rgba(${color[0]},${color[1]},${color[2]},1)
        `;
    };

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
    }, [following]);

    const follow = () => {
        if (following) {
            spotify.unfollowPlaylist(id).then(
                function (data) {
                    console.log('Playlist successfully unfollowed!');
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

    return (
        <div className="d-flex flex-column align-items-start me-4 p-2 text-decoration-none">
            <div className="playlist-cards">
                <NavLink
                    to={{
                        pathname: `${getPath}/playlist/${item.id}`,
                    }}
                    key={item.id}
                >
                    <img
                        src={item?.images[0]?.url}
                        alt={item?.name}
                        crossOrigin="anonymous"
                        id={item.id}
                        onLoad={() => getColor({ id: item.id, index: index })}
                    />
                    <span className="bp-name mt-2">{item?.name}</span>
                </NavLink>
                <button className='playlist-follow-btn t-btn' onClick={follow}>
                    {following ? <ion-icon id={item.id + index} name="checkmark-done-circle" style={{ color: 'var(--background)' }}></ion-icon> : <ion-icon id={item.id + index} name="add-circle" className='add-btn'></ion-icon>}
                </button>
            </div>
        </div>
    )
}
export default PlaylistCard;