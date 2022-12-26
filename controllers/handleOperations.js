const database = require('../utils/firebase.js');
const { onValue, ref } = require('firebase/database');

exports.getPartyDetails = (io, x, socket) => {
    const listRef = ref(database, `list/${x.votingId}`);
    onValue(listRef, (snapshot) => {
        var data = snapshot.val();
        if (data.playlist) {
            var list;
            list = Object.values(data.playlist);
            data.playlist = list.sort((a, b) => b.votes - a.votes);
            data.playlist.splice(20);   //show 20 ranked songs only
            io.to(socket.id).emit('receivePartyDetails', data);
        } else {
            io.to(socket.id).emit('receivePartyDetails', data);
        }
    })

};