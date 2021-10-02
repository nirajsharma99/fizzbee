import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { buttontype } from './buttontype';
import { useEffect } from 'react';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
//const accessToken = window.localStorage.getItem('token');
function PlayTiles({ index, id, type, covertype }) {
  const [{ deviceId, token, playlist }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);

  useEffect(() => {
    if (token) {
      switch (covertype) {
        case 'album':
          spotify.getAlbum(id).then(
            function (data) {
              //console.log('Album information', data.body);
              let list = data?.body?.tracks?.items;
              let uris = [];
              list.map((item) =>
                uris.push(item.track ? item.track?.uri : item.uri)
              );
              dispatch({
                type: 'SET_PLAYLIST',
                playlist: uris,
              });
            },
            function (err) {
              console.error(err);
            }
          );
          break;
        case 'playlist':
          spotify
            .getPlaylist(id)
            .then((data) => {
              let list = data?.body?.tracks?.items;
              let uris = [];
              list.map((item) =>
                uris.push(item.track ? item.track?.uri : item.uri)
              );
              dispatch({
                type: 'SET_PLAYLIST',
                playlist: uris,
              });
            })
            .catch((err) => console.log(err));
          break;
        default:
          console.log('Invalid cover');
          break;
      }
    }
  }, [id]);

  const playfromlist = (index, playlist) => {
    console.log(playlist[index]);

    spotify
      .play({
        uris: playlist,
        offset: { uri: playlist[index] },
        device_id: deviceId,
      })
      .then((res) => {
        spotify.getMyCurrentPlayingTrack().then((x) => {
          /*console.log('current in api', x.body);
          dispatch({
            type: 'SET_ITEM',
            item: x.body.item,
          });
          dispatch({
            type: 'SET_PLAYING',
            playing: true,
          });*/
          spotify
            .getAudioFeaturesForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio features', data.body);
            })
            .catch((err) => {
              console.log(err);
            });

          /* Get Audio Analysis for a Track */
          spotify
            .getAudioAnalysisForTrack(x.body.item.id)
            .then(function (data) {
              console.log('audio analysis', data.body);
            })
            .catch((err) => {
              console.log(err);
            });
        });
      })
      .catch((err) => console.error(err));
  };
  return (
    <button
      className={buttontype[type].className}
      style={{ color: 'rgb(0, 255, 127)' }}
      onClick={() => {
        playfromlist(index, playlist);
      }}
    >
      <PlayArrowIcon
        fontSize="large"
        style={{ color: buttontype[type].color }}
      />
    </button>
  );
}
export default PlayTiles;
