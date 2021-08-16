const express = require('express');
const spotifyWebApi = require('spotify-web-api-node');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());

app.post('/login', (req, res) => {
  const code = req.body.code;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000/home',
    clientId: 'cbb93bd5565e430a855458433142789f',
    clientSecret: 'e1a32155ab484080abbf7e2bdea8ac38',
  });

  spotifyApi
    .authorizationCodeGrant(code)
    .then((data) => {
      //console.log(data);
      res.json({
        accessToken: data.body.access_token,
        refreshToken: data.body.refresh_token,
        exiresIn: data.body.expires_in,
      });
    })
    .catch((err) => {
      res.sendStatus(400);
    });
});

app.post('/refresh', (req, res) => {
  const refreshToken = req.body.refreshToken;
  const spotifyApi = new spotifyWebApi({
    redirectUri: 'http://localhost:3000/home',
    clientId: 'cbb93bd5565e430a855458433142789f',
    clientSecret: 'e1a32155ab484080abbf7e2bdea8ac38',
    refreshToken,
  });
  spotifyApi
    .refreshAccessToken()
    .then((data) => {
      res.send({
        accessToken: data.body.access_token,
        expiresIn: data.body.expires_in,
      });
      spotifyApi.setAccessToken(data.body['access_token']);
    })
    .catch((err) => res.sendStatus(err));
});

app.listen(3001, () => console.log('listening on port 3001'));
