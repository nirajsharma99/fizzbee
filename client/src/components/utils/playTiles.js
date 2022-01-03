import { useDataHandlerValue } from '../contextapi/DataHandler';
import PlayArrowIcon from '@material-ui/icons/PlayArrowTwoTone';
import { buttontype } from './buttontype';
import { useState, useEffect } from 'react';
import useSpotify from '../hooks/useSpotify';

function PlayTiles({ index, id, type, covertype }) {
  const [{ deviceId, token, playlist }, dispatch] = useDataHandlerValue();
  const [tilesCList, setTilesCList] = useState();

  const spotify = useSpotify();

  useEffect(() => {
    if (token) {
      switch (covertype) {
        case 'album':
          if (!id) return;
          spotify.getAlbum(id).then(
            function (data) {
              //console.log('Album information', data.body);
              let list = data?.body?.tracks?.items;
              let uris = [];
              list.map((item) => uris.push(item.uri));
              setTilesCList(list);
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
          if (!id) return;
          spotify
            .getPlaylist(id)
            .then((data) => {
              let list = data?.body?.tracks?.items;
              let uris = [];
              list.map((item) =>
                uris.push(item.track ? item.track?.uri : item.uri)
              );
              setTilesCList(list);
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
  }, [id, token]);

  const playfromlist = (index, playlist) => {
    if (playlist) {
      //console.log(playlist[index]);
      spotify
        .play({
          uris: playlist,
          offset: { uri: playlist[index] },
          device_id: deviceId,
        })
        .then((res) => {
          dispatch({
            type: 'SET_CURRENT_PLAYLIST',
            list: tilesCList,
          });
        })
        .catch((err) => console.error(err));
    }
  };
  return (
    <button
      className={buttontype[type].className}
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
