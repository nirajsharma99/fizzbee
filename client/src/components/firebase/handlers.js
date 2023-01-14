import { onValue, ref, child, get, set, update, remove, push } from "firebase/database";
import { database, storage } from "./firebase";
import ShortUniqueId from 'short-unique-id';
import { deleteObject, getDownloadURL, ref as refStorage, uploadBytesResumable } from "firebase/storage";

export const getPartyDetails = (x) => {
    const listRef = ref(database, `list/${x.votingId}`);
    onValue(listRef, (snapshot) => {
        var data = snapshot.val();
        if (data.playlist) {
            var list;
            list = Object.values(data.playlist);
            data.playlist = list.sort((a, b) => b.votes - a.votes);
            data.playlist.splice(20);   //show 20 ranked songs only
        }
        if (x.user) {
            x.setData(data.playlist);
        } else {
            x.setData(data);
        }
    })
};

export const getParty = (x) => {
    const uid = new ShortUniqueId({ length: 7 });
    const dbRef = ref(database);
    get(child(dbRef, `data/${x.userId}`)).then((snapshot) => {
        if (snapshot.exists()) {
            let votingId = snapshot.val().votingId;
            //update partyOn/Off, token
            let updates = {};
            get(child(dbRef, 'list/' + votingId)).then((snapshot) => {
                if (snapshot.val().partyOn != x.partyOn || snapshot.val().token !== x.token) {
                    updates[`list/${votingId}`] = { ...snapshot.val(), partyOn: x.partyOn, token: x.token };
                    update(ref(database),
                        updates,
                    ).then(() => { x.setData(snapshot.val()) })
                        .catch((err) => { console.log(err) })
                }
                else {
                    x.setData(snapshot.val());
                }
            })
        } else {
            //Create entry, user id needed to identify spotify user
            let id = uid();
            let data = {
                playlist: [],
                username: x.username,
                partyOn: x.partyOn,
                votingId: id,
                token: x.token,
                date: Date()
            }
            set(ref(database, 'data/' + x.userId), {
                username: x.username,
                partyOn: x.partyOn,
                votingId: id,
                date: Date()
            })
            set(ref(database, 'list/' + id), {
                ...data
            })
            x.setData(data)
        }
    }).catch((error) => {
        console.error(error);
    });
};

export const endParty = (votingId) => {
    let updates = {};
    const dbRef = ref(database);
    get(child(dbRef, 'list/' + votingId)).then((snapshot) => {
        updates[`list/${votingId}`] = { ...snapshot.val(), partyOn: false };
        update(ref(database),
            updates,
        ).then(() => { })
            .catch((err) => { console.log(err) })
    })
}

export const removeFromParty = (data) => {
    const dbRef = ref(database);
    let id = data.id;
    let votingId = data.votingId;
    remove(child(dbRef, `list/${votingId}/playlist/${id}`))
        .then(() => { return true })
        .catch(() => { return false });
}

export const addPartySong = (data) => {
    let id = data.votingId;
    //console.log(data)
    const dbRef = ref(database);
    const listPath = `list/${id}/playlist/${data.item.id}`;
    get(child(dbRef, listPath)).then((snapshot) => {
        if (snapshot.val()) {
            let votes = snapshot.val().votes + 1;
            let updates = {};
            updates[listPath] = { ...snapshot.val(), votes: votes };
            update(ref(database),
                updates,
            ).then(() => { data.handleOp(true) })
                .catch(() => { data.handleOp(false) })
        } else {
            set(ref(database, listPath),
                { ...data.item, votes: 1 },
            ).then(() => { data.handleOp(true) })
                .catch(() => { data.handleOp(false) })
        }
    })
}

export const uploadFileAppBackground = (file, userId, showNotibar, setProgress) => {
    const storageRef = refStorage(storage, `backgrounds/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);
    uploadTask.on('state_changed', (snapshot) => {
        setProgress(snapshot.bytesTransferred / snapshot.totalBytes);
    }, (error) => {
        showNotibar('Upload Failed', false);
    }, () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            const picListRef = ref(database, `data/${userId}/backgrounds/`)
            const newPicRef = push(picListRef);
            set(newPicRef, {
                link: downloadURL,
                filename: file.name,
                key: newPicRef.key,
            }).then(() => {
                showNotibar('Upload Successful', true);
            }).catch(() => {
                showNotibar('Upload Failed', false);
            })
        })
    })
}

export const deleteUserBackground = (item, userId, showNotibar) => {
    const deleteRef = refStorage(storage, `backgrounds/${item.filename}`);
    deleteObject(deleteRef).then(() => {
    }).catch((err) => {
        console.log(err);
    })
    const dbRef = ref(database);
    remove(child(dbRef, `data/${userId}/backgrounds/${item.key}`))
        .then(() => { showNotibar('Deleted background..', true) })
        .catch(() => { showNotibar('Delete failed', false) });
}

export const getUserBackgrounds = (x) => {
    const listRef = ref(database, `data/${x.userId}/backgrounds`);
    onValue(listRef, (snapshot) => {
        if (snapshot.val()) {
            x.setData(Object.values(snapshot.val()).reverse());
        }
    })
}