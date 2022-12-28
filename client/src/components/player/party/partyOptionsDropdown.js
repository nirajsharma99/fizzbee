import QueueMusicIcon from '@material-ui/icons/QueueMusic';
import LaunchIcon from '@material-ui/icons/Launch';
import DeleteForeverTwoToneIcon from '@material-ui/icons/DeleteForeverTwoTone';
import { useDispatch } from 'react-redux';
import {
    setTrackToAdd,
    toggleAddToPlaylist,
} from '../../store/actions/app-actions';

function PartyOptionsDropDown({ item, closeMenu, handleRemoveItem }) {
    const dispatch = useDispatch();
    const check = item?.album ? item : item?.track ? item.track : item;

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
