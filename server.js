const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const cors = require('cors');
const PORT = process.env.PORT || 3001;
const dotenv = require('dotenv');
const path = require('path');
const Genius = require('genius-lyrics');
const Client = new Genius.Client(process.env.GENIUS_TOKEN);
const http = require('http');

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

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
    .catch(() => {
      res.send(false);
    });
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
