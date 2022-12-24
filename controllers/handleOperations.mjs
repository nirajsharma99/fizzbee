import { database } from '../utils/firebase.mjs';
import { child, onValue, ref, get } from 'firebase/database';

export const getPartyDetails = (io, x, socket) => {
    const dbRef = ref(database);
    get(child(dbRef, `list/${x.votingId}`)).then((snapshot) => {
        var data = snapshot.val();
        const listRef = ref(database, `list/${x.votingId}/playlist`);
        onValue(listRef, (snapshot) => {
            if (data?.playlist) {
                data.playlist = snapshot.val();
                var list;
                list = Object.values(data.playlist);
                data.playlist = list.sort((a, b) => b.votes - a.votes);
                io.to(socket.id).emit('receivePartyDetails', data);
            } else {
                io.to(socket.id).emit('receivePartyDetails', data);
            }
        })
    }).catch((err) => { console.log(err) })

};