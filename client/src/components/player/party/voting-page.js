import axios from 'axios';
import { useEffect, useState } from 'react';
import dotenv from 'dotenv';
import '../../../App.css';
import '../../styling/party.css'
import { TextField } from '@material-ui/core';
import PartySongs from './partySongs';
import io from 'socket.io-client';
import GuestRankedSongs from './guestRankedSongs';

dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;
const at = new URLSearchParams(window.location.search).get('at');
let socket;

function VotingPage() {
    const [data, setData] = useState();
    const [form, setForm] = useState();
    const [songs, setSongs] = useState();
    const [voteTrack, setVoteTrack] = useState([]);

    const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';

    useEffect(() => {
        if (!at) return;
        socket = io(API_ENDPOINT);
        socket.emit('getPartyDetails', { votingId: at });
        socket.on('receivePartyDetails', (data) => {
            if (data) {
                //console.log(data)
                setData(data);
            }
        })
    }, [at, API_ENDPOINT])

    useEffect(() => {
        if (!at) return;
        let local = window.localStorage.getItem(at);
        if (local) {
            setVoteTrack(JSON.parse(window.localStorage.getItem(at)));
        }
    }, [])
    useEffect(() => {
        window.localStorage.setItem(at, JSON.stringify(voteTrack));
    }, [voteTrack])

    const handleVoteTrack = (id) => {
        setVoteTrack(voteTrack => [...voteTrack, id])
    }

    const handleSubmit = (e) => {
        console.log('submitted');
        e.preventDefault();
        axios({
            method: 'POST',
            data: { songName: form, token: data.token, votingId: at },
            url: `${API_ENDPOINT}/getSongInfo`
        }).then((res) => {
            console.log(res.data);
            setSongs(res.data);
        }).catch((err) => {
            console.log(err);
        })
    }

    return (
        <div className='voting-outer' style={{ backgroundImage: 'url(party2.jpg', backgroundSize: 'cover' }}>
            <a href='/' className="logo text-decoration-none">Fizzbee.</a>
            {data?.partyOn ? <div className='message'>
                <span style={{ color: 'rgb(0, 255, 127)' }}>Hey,</span>
                <span>Welcome to the Party!</span>
                <span>Please suggest me the next song..</span>
                <span>Thanks,</span>
                <span style={{ color: 'rgb(0, 255, 127)' }}>{data ? data.username : 'fizzbee'}</span>
            </div> : <div className='message'>
                <span style={{ color: 'rgb(0, 255, 127)' }}>Hey,</span>
                <span>You arrived late!</span>
                <span>The Party is over..</span>
                <span>Sorry,</span>
                <span style={{ color: 'rgb(0, 255, 127)' }}>{data ? data.username : 'fizzbee'}</span>
            </div>}
            <div hidden={!data?.partyOn}
                className="voting-list-outer">
                <form className='textfield-outer' onSubmit={handleSubmit} autoComplete="true">
                    <TextField
                        name="question"
                        multiline={true}
                        className="voting-textfield"
                        placeholder="Songname.."
                        value={form}
                        onChange={(e) => setForm(e.target.value)}
                        required
                    />
                    <button type='submit'>Search</button>
                </form>
                <div hidden={!songs}>
                    <hr />
                    <span className='section-heading'>Search Results</span>
                    <hr />
                    <div
                        className='guest-ranked-list'
                    >
                        {songs?.map((item, index) => (
                            <PartySongs item={item} index={index} votingId={at} voteTrackCheck={voteTrack?.includes(item.id)} handleVoteTrack={handleVoteTrack} />
                        ))}
                    </div>
                </div>
                <div hidden={!data?.playlist}>
                    <hr />
                    <span className='section-heading'>Live playlist</span>
                    <hr />
                    <div className='guest-ranked-list'>
                        <div
                            className={'p-t-container'}
                        >
                            <div className="p-tracks-pic">
                                <span className='m-auto' style={{ color: 'var(--main-theme)' }}>Votes</span>

                            </div>
                            <div className='p-tracks-right' style={{ flex: '80% 1' }}>
                                <div className="p-tracks-info">
                                    <span className="ps-1" style={{ color: 'var(--main-theme)' }}>Name</span>
                                </div>
                                <div className="p-tracks-album">
                                    <span className="ps-1" style={{ color: 'var(--main-theme)' }}>Album</span>
                                </div>
                                <div className="p-tracks-btn ">
                                    <span className='px-2' style={{ color: 'var(--main-theme)' }}>+1</span>
                                </div>
                            </div>
                        </div>
                        {data?.playlist?.map((item, index) => (
                            <GuestRankedSongs item={item} index={index} votingId={at} voteTrackCheck={voteTrack?.includes(item.id)} handleVoteTrack={handleVoteTrack} />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default VotingPage;