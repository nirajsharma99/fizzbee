const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 3001;
require('dotenv').config();
const path = require('path');
const Genius = require('genius-lyrics');
const Client = new Genius.Client(process.env.GENIUS_TOKEN);

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
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

app.get('/lyrics', async (req, res) => {
  const trackname = req.query.track.replace(/ *\([^)]*\) */g, '');
  const searches = await Client.songs.search(trackname);

  // Pick first one
  const firstSong = searches[0];

  // Ok lets get the lyrics
  const lyrics = firstSong ? await firstSong.lyrics() : 'No Lyrics Found';
  res.json({ lyrics });
});

if (process.env.NODE_ENV == 'production') {
  app.use(express.static('client/build'));
}
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, './client/build/index.html'));
});

app.listen(PORT, () => console.log('listening on port 3001'));
