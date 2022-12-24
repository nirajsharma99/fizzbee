import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import useSpotify from '../../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setCurrentPlaylist } from '../../store/actions/library-actions';
import {
    setNotibar,
    setTrackToAdd,
    toggleAddToPlaylist,
} from '../../store/actions/app-actions';
import { play } from '../../store/actions/spotify-actions';

function PartyOptionsDropDown({ item, closeMenu, handleRemoveItem }) {
    const { currentPlaylist } = useSelector((state) => state.library);
    const { token, current, deviceId } = useSelector((state) => state.player);
    const dispatch = useDispatch();
    const spotify = useSpotify();
    const check = item?.album ? item : item?.track ? item.track : item;
    //console.log(check, isUsers, playlistId)

    const openInSpotify = (e) => {
        window.open(
            `https://open.spotify.com/track/${check.id}`,
            '_blank' // <- This is what makes it open in a new window.
        );
        closeMenu();
        e.stopPropagation();
    };

    const handleAddToPlaylist = (e) => {
        dispatch(setTrackToAdd(check));
        dispatch(toggleAddToPlaylist(true));
        closeMenu();
        e.stopPropagation();
    };

    const handleRemove = (e) => {
        handleRemoveItem(check?.id);
        e.stopPropagation();
        closeMenu();
    };
    return (
        <ul className="more-options-list">
            <li>
                <button className="more-options-btn" onClick={handleAddToPlaylist}>
                    <QueueMusicIcon style={{ color: 'gray' }} fontSize="medium" />
                    <span className="ms-2">Add to Playlist</span>
                </button>
            </li>

            <li>
                <button className="more-options-btn" onClick={handleRemove}>
                    <DeleteForeverTwoToneIcon
                        style={{ color: 'gray' }}
                        fontSize="medium"
                    />
                    <span className="ms-2">Remove</span>
                </button>
            </li>
            <li>
                <button className="more-options-btn" onClick={openInSpotify}>
                    <LaunchIcon style={{ color: 'gray' }} fontSize="medium" />
                    <span className="ms-2">Open in Spotify</span>
                </button>
            </li>
        </ul>
    );
}
export default PartyOptionsDropDown;
