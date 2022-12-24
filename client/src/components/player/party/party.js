import axios from 'axios';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPartyMode } from '../../store/actions/player-actions';
import '../../styling/party.css'
import dotenv from 'dotenv';
import SocialShare from './partyShare';
import io from 'socket.io-client';
import UserPartyList from './userPartyList';
let socket;

dotenv.config();
const { REACT_APP_API_ENDPOINT, REACT_APP_ENDPOINT } = process.env;

function Party() {
    const dispatch = useDispatch();
    const partyMode = useSelector((state) => state.player.partyMode);
    const token = useSelector((state) => state.player.token)
    const user = useSelector((state) => state.user.user);
    const [data, setData] = useState();
    const [playlist, setPlaylist] = useState();

    const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';
    const ENDPOINT = REACT_APP_ENDPOINT || 'http://localhost:3000';

    useEffect(() => {
        if (!user?.id || !token) return;
        /*axios({
            method: 'POST',
            data: { userId: user.id, username: user.display_name, partyOn: partyMode, token: token },
            url: `${API_ENDPOINT}/party`
        }).then((res) => {
            let data = res.data.data;
            console.log(data)
            setVotingId(data.votingId);
        }).catch((err) => {
            console.log(err);
        })*/
        socket = io(API_ENDPOINT);
        socket.emit('getParty', { userId: user.id, username: user.display_name, partyOn: partyMode, token: token });
        socket.on('receiveParty', (data) => {
            if (data) {
                console.log(data)
                setData(data);
            }
        })


    }, [user?.id, token, partyMode])

    useEffect(() => {
        if (data?.votingId) {
            socket.emit('getPartyDetails', { votingId: data.votingId });
            socket.on('receivePartyDetails', (data) => {
                if (data) {
                    //console.log(data)
                    setPlaylist(data.playlist);
                }
            })
        }
    }, [playlist, data?.votingId])

    return (
        <div className="display-cut">
            <div className='power-container'>
                <label className="power">
                    <input type="checkbox" checked={partyMode} onClick={() => dispatch(setPartyMode(!partyMode))} />
                    <div>
                        <ion-icon id='skull' style={{ color: partyMode ? 'var(--main-theme)' : 'grey' }} name="skull-sharp"></ion-icon>
                    </div>
                </label>
                <SocialShare url={`${ENDPOINT}/joinme?at=${data?.votingId}`} />
            </div>
            <div>
                {playlist ? <UserPartyList list={playlist} /> : null}
            </div>
        </div>
    )
}
export default Party;