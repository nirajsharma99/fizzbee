import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setPartyId, setPartyMode } from '../../store/actions/player-actions';
import '../../styling/party.css'
import dotenv from 'dotenv';
import SocialShare from './partyShare';
import io from 'socket.io-client';
import UserPartyList from './userPartyList';
import { setCurrentPlaylist } from '../../store/actions/library-actions';
import QRCode from 'qrcode.react';
import { setNotibar } from '../../store/actions/app-actions';

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
    const [showQR, setShowQR] = useState(false);

    const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';
    const ENDPOINT = REACT_APP_ENDPOINT || 'http://localhost:3000';


    useEffect(() => {
        if (!user?.id || !token) return;
        socket = io(API_ENDPOINT, {
            transports: ['websocket', 'polling']
        });
        socket.emit('getParty', { userId: user.id, username: user.display_name, partyOn: partyMode, token: token });
        socket.on('receiveParty', (data) => {
            if (data) {
                setData(data);
                dispatch(setPartyId(data.votingId));
            }
        })
    }, [user?.id, token, partyMode])

    useEffect(() => {
        if (data?.votingId) {
            socket = io(API_ENDPOINT, {
                transports: ['websocket', 'polling']
            });
            socket.emit('getPartyDetails', { votingId: data.votingId });
            socket.on('receivePartyDetails', (data) => {
                if (data) {
                    //console.log(data)
                    setPlaylist(data.playlist);
                }
            })
        }
    }, [data?.votingId])

    useEffect(() => {
        dispatch(setCurrentPlaylist(playlist))
    }, [playlist])

    const handlePartyMode = () => {
        if (partyMode) {
            dispatch(setPartyMode(!partyMode));
            dispatch(setNotibar('Disabled party mode', true, 2500))
        } else {
            dispatch(setPartyMode(!partyMode));
            dispatch(setNotibar('Enabled party mode', true, 2500))
        }
    }


    const QR = () => (
        <div
            className="w-100 justify-content-center d-flex align-items-center position-fixed fixed-top"
            onClick={() => {
                setShowQR(false);
            }}
            style={{
                height: '100%',
                zIndex: 1,
                backgroundColor: 'var(--main-theme-bg-lite)',
            }}
        >
            <div className="d-flex flex-column align-items-center bg-white">
                <span className="font-weight-bold ">Scan QR Code</span>
                <QRCode
                    value={`${API_ENDPOINT}/joinme?at=${data?.votingId}`}
                    size={290}
                    level={'H'}
                    includeMargin={true}
                />
            </div>
        </div>
    );

    return (
        <div className="display-cut">
            {showQR ? <QR /> : null}
            <div className='power-container'>
                <label className="power">
                    <input type="checkbox" checked={partyMode} onClick={handlePartyMode} />
                    <div>
                        <ion-icon id='skull' style={{ color: partyMode ? 'var(--main-theme)' : 'grey' }} name="skull"></ion-icon>
                    </div>
                </label>
                <SocialShare votingId={data?.votingId} url={`${ENDPOINT}/joinme?at=${data?.votingId}`} message={"Fizzbee: Welcome to my Party!"} showQR={() => setShowQR(!showQR)} />
            </div>
            <div>
                {playlist ? <UserPartyList list={playlist} votingId={data?.votingId} /> : null}
            </div>
        </div>
    )
}
export default Party;