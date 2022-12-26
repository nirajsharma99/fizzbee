import express from 'express';
import spotifyWebApi from 'spotify-web-api-node';
import cors from 'cors';
const PORT = process.env.PORT || 3001;
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import { Server } from 'socket.io';
import Genius from 'genius-lyrics';
const Client = new Genius.Client(process.env.GENIUS_TOKEN);
import { database } from './utils/firebase.mjs';
import { getPartyDetails } from './controllers/handleOperations.mjs';
import { child, ref, get, set, update, remove } from 'firebase/database';
import shortUUID from 'short-uuid';
import http from 'http';
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    allowedHeaders: ['Access-Control-Allow-Origin'],
    methods: ['GET', 'POST'],
    credentials: false
  },
  transports: ["polling", "websocket"]
});

io.on('connection', (socket) => {
  console.log('socket connection ' + socket.id);
  socket.on('getPartyDetails', (x) => {
    getPartyDetails(io, x, socket);
  });
  socket.on('getPartyListToUser', (x) => {
    getPartyListToUser(io, x, socket);
  })
  socket.on('getParty', (x) => {
    getParty(io, x, socket);
  })
});

let spotifyApi;

app.post('/login', (req, res) => {
  const code = req.body.code;
  spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      //console.log(data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        expiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  console.log(refreshToken);
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.send({
        access_token: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
      spotifyApi.setAccessToken(data.body.access_token);
    })
    .catch((err) => res.sendStatus(err));
});

app.post('/removeItem', (req, res) => {
  console.log(req.body)
  const dbRef = ref(database);
  let id = req.body.id;
  let votingId = req.body.votingId;
  remove(child(dbRef, `list/${votingId}/playlist/${id}`))
    .then(() => res.send(true))
    .catch(() => res.send(false));
})


const getParty = (io, x, socket) => {
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
          ).then(() => { io.to(socket.id).emit('receiveParty', snapshot.val()); })
            .catch((err) => { console.log(err) })
        }
        else {
          io.to(socket.id).emit('receiveParty', snapshot.val());
        }
      })
    } else {
      //Create entry, user id needed to identify spotify user
      let id = shortUUID.generate();
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
      io.to(socket.id).emit('receiveParty', data);
    }
  }).catch((error) => {
    console.error(error);
  });
};


app.post('/getSongInfo', (req, res) => {
  const spotifyApi = new spotifyWebApi({
    redirectUri: process.env.REDIRECT_URI,
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
  });
  spotifyApi.setAccessToken(req.body.token);
  spotifyApi.search(req.body.songName, [
    'track',
  ], { limit: 10, offset: 1 })
    .then((response) => res.send(response.body.tracks.items))
    .catch((err) => {
      console.log(err);
      //update partyOn/Off as token has expired
      let votingId = req.body.votingId;
      let updates = {};
      const dbRef = ref(database);
      get(child(dbRef, 'list/' + votingId)).then((snapshot) => {
        updates[`list/${votingId}`] = { ...snapshot.val(), partyOn: false };
        update(ref(database),
          updates,
        ).then(() => { })
          .catch((err) => { console.log(err) })
      })
    });
})


app.post('/addSong', (req, res) => {
  let id = req.body.votingId;
  //console.log(req.body)
  const dbRef = ref(database);
  const listPath = `list/${id}/playlist/${req.body.item.id}`;
  get(child(dbRef, listPath)).then((snapshot) => {
    if (snapshot.val()) {
      let votes = snapshot.val().votes + 1;
      let updates = {};
      updates[listPath] = { ...snapshot.val(), votes: votes };
      update(ref(database),
        updates,
      ).then(() => res.send({ data: 'Success' }))
        .catch(() => res.send({ data: 'Error' }))
    } else {
      set(ref(database, listPath),
        { ...req.body.item, votes: 1 },
      ).then(() => res.send({ data: 'Success' }))
        .catch(() => res.send({ data: 'Error' }))
    }
  })

})


app.get('/lyrics', async (req, res) => {
  const trackname = req.query.track.replace(/ *\([^)]*\) */g, '');
  const searches = await Client.songs.search(trackname);

  // Pick first one
  const firstSong = searches[0];

  // Ok lets get the lyrics
  const lyrics = firstSong ? await firstSong.lyrics().then((res) => { return res; }).catch((err) => console.log(err)) : 'No Lyrics Found';
  res.json({ lyrics });
});

app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

server.listen(PORT, () => console.log('listening on port', PORT));
