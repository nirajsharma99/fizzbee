import AddCircleIcon from '@material-ui/icons/AddCircle';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setNotibar } from '../../store/actions/app-actions';
import { getImage, millisToMinutesAndSeconds } from '../../utils/helperFunctions';

import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;

function PartySongs({ item, index, votingId, voteTrackCheck, handleVoteTrack }) {
    const dispatch = useDispatch();
    const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';

    const handleAdd = (e) => {
        e.preventDefault();
        axios({
            method: 'POST',
            data: { votingId: votingId, item: item },
            url: `${API_ENDPOINT}/addSong`
        }).then((res) => {
            dispatch(setNotibar('Request submitted!', true, 7000));
            handleVoteTrack(item.id);
        }).catch((err) => {
            console.log(err);
            dispatch(setNotibar('Error occurred', false, 7000));
        })
    }
    return (
        <div
            key={index}
            className={'p-t-container'}
        >
            <div className="p-tracks-pic">
                <img
                    src={getImage(item.album?.images, 'sm')}
                    alt="music-album"
                    style={{ borderRadius: '10px', width: '50px' }}
                />
            </div>
            <div className='p-tracks-right'>
                <div className="p-tracks-info" >
                    <span className="ps-name">{item.name}</span>
                    <span className="text-secondary">
                        {item?.artists.map(
                            (item, index) => (index ? ', ' : '') + item.name
                        )}
                    </span>
                </div>
                <div className="p-tracks-album ">
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
export default PartySongs;
