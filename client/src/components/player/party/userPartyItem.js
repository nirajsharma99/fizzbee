import { getImage, millisToMinutesAndSeconds } from '../../utils/helperFunctions';
import MoreOptions from '../../templates/more-options';
import { useDispatch, useSelector } from 'react-redux';
import {
    handlePlayPause,
    playfromlist,
} from '../../store/actions/spotify-actions';
import { SmallPlayButton } from '../../player/buttons';
import useCheckDevice from '../../utils/checkDevice';

function UserPartyItem({ item, index, list }) {
    const { current } = useSelector((state) => state.player);
    const playing = useSelector((state) => state.player.playing);
    const dispatch = useDispatch();
    const musicItem = item?.track ? item.track : item;
    const isCurrent = current?.id === musicItem.id;
    const { isMobile } = useCheckDevice();
    const handlePlayingSong = () => {
        if (isCurrent) {
            dispatch(handlePlayPause());
        } else {
            dispatch(playfromlist(index, list));
        }
    };

    const handleClick = (e) => {
        const tagNames = ['svg', 'path', 'button'];
        const parent = ['button', 'more-btn', 'more-options-btn'];
        if (tagNames.includes(e.target.tagName) || parent.includes(e.target.parentNode.className)) return;
        if (!isMobile) return;
        else {
            dispatch(playfromlist(index, list))
        }
    }

    return (
        <div
            key={index}
            className={'p-t-container' + (isCurrent ? ' themeBG' : '')}
            onClick={(e) => !isCurrent && handleClick(e)}
        >
            <div className="p-tracks-pic">
                <img
                    src={getImage(musicItem.album?.images, 'sm')}
                    alt="music-album"
                    style={{ borderRadius: '10px' }}
                />
            </div>
            <div className='p-tracks-right'>
                <div className="p-tracks-info">
                    <span className="ps-name">{musicItem.name}</span>
                    <span className="text-secondary">
                        {musicItem?.artists.map(
                            (item, index) => (index ? ', ' : '') + item.name
                        )}
                    </span>
                </div>
                <div className="p-tracks-album ">
                    <span className="text-secondary h6">{musicItem.album?.name}</span>
                </div>
                <div className="p-tracks-btn ">
                    <MoreOptions
                        item={item}
                        isUsers={true}
                        playlistId={null}
                    />
                    <span className="text-secondary me-5 d-lg-block d-none">
                        {millisToMinutesAndSeconds(musicItem.duration_ms)}
                    </span>
                    <div className='p-tracks-play-btn'>
                        <SmallPlayButton
                            playing={playing}
                            isCurrent={isCurrent}
                            onClick={handlePlayingSong}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default UserPartyItem;
