import AddCircleIcon from '@material-ui/icons/AddCircle';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPartySong } from '../../firebase/handlers';
import { setNotibar } from '../../store/actions/app-actions';
import { getImage, millisToMinutesAndSeconds } from '../../utils/helperFunctions';


function GuestRankedSongs({ item, index, votingId, voteTrackCheck, handleVoteTrack }) {
    const dispatch = useDispatch();
    const [result, setResult] = useState(false);
    const handleAdd = (e) => {
        e.preventDefault();
        addPartySong({ votingId: votingId, item: item, setResult: setResult })
        if (result) {
            dispatch(setNotibar('Request submitted', true, 7000));
            handleVoteTrack(item.id);
        } else {
            dispatch(setNotibar('Error occurred', false, 7000));
        }
    }

    return (
        <div
            key={index}
            className={'p-t-container'}
        >
            <div className="p-tracks-pic">
                <div className='p-tracks-pic-party'>
                    <span className='ps-name'>{item.votes}</span>
                    <img
                        src={getImage(item.album?.images, 'sm')}
                        alt="music-album"
                        style={{ borderRadius: '10px' }}
                    />
                </div>
            </div>
            <div className='p-tracks-right' style={{ flex: '80% 1' }}>
                <div className="p-tracks-info">
                    <span className="ps-name">{item.name}</span>
                    <span className="text-secondary">
                        {item?.artists.map(
                            (item, index) => (index ? ', ' : '') + item.name
                        )}
                    </span>
                </div>
                <div className="p-tracks-album">
                    <span className="text-secondary h6">{item.album?.name}</span>
                </div>
                <div className="p-tracks-btn ">
                    <span className="text-secondary me-5 d-lg-block d-none">
                        {millisToMinutesAndSeconds(item.duration_ms)}
                    </span>
                    <div className='p-tracks-play-btn'>
                        <button className='t-btn' onClick={handleAdd} disabled={voteTrackCheck}>
                            <AddCircleIcon
                                style={{ color: voteTrackCheck ? 'grey' : 'var(--main-theme)' }}
                            />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default GuestRankedSongs;
