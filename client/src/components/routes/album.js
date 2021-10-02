import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import ColorThief from '../../../node_modules/colorthief/dist/color-thief.mjs';

import SpotifyWebApi from 'spotify-web-api-node';
import PlayFromList from '../utils/playfromlist';
import PlayTiles from '../utils/playTiles';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function Album(props) {
  const id = props?.match?.params?.id;
  //console.log(props?.match?.params?.id);
  const [{ deviceId, token }, dispatch] = useDataHandlerValue();
  spotify.setAccessToken(token);
  const [album, setAlbum] = useState();
  useEffect(() => {
    spotify.getAlbum(id).then(
      function (data) {
        //console.log('Album information', data.body);
        setAlbum({ info: data.body, tracks: data.body.tracks.items });
      },
      function (err) {
        console.error(err);
      }
    );
  }, [id]);
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }

  const getColor = (id, index) => {
    console.log('here', id);
    const colorThief = new ColorThief();
    const img = document.getElementById(id);
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    document.getElementById(
      'choose1'
    ).style.background = `linear-gradient(360deg, rgb(${color[0]},${color[1]},${color[2]}), transparent)`;
  };

  return (
    <div style={{ paddingBottom: '8rem' }}>
      <div
        className="album-info"
        style={{
          background: `url(${album?.info?.images[0]?.url}) no-repeat center center / cover`,
          borderRadius: '20px',
        }}
      >
        <div className="album-r">
          <div className="album-data w-100 px-3 font-1" id="choose1">
            <p className="text-light mb-0">ALBUM</p>
            <span className="h1 text-light">{album?.info?.name}</span>
            <div className="d-md-flex d-block justify-content-between">
              content
            </div>
          </div>
        </div>
        <div className="album-l">
          <img
            src={album?.info?.images[1]?.url}
            id={album?.info?.id}
            crossOrigin="anonymous"
            alt={album?.info?.name}
            onLoad={() => getColor(id)}
            style={{ borderRadius: '15px', width: '100%' }}
          />
          <PlayTiles
            index={0}
            id={album?.info.id}
            type="cover"
            covertype="playlist"
          />
        </div>
      </div>
      <div className="mt-3">
        <div className="d-flex">
          <div className="album-tracks-info d-inline-block ms-2 text-left text-secondary">
            <span className="p-heading">TITLE</span>
          </div>

          <div className="album-tracks-btn text-center text-secondary">
            <ScheduleTwoToneIcon style={{ color: 'rgb(0, 255, 127)' }} />
          </div>
        </div>

        {album?.tracks?.map((item, index) => (
          <div key={index} className="p-t-container">
            <div className="album-tracks-info font-1 ms-2">
              <span className="text-light h5 mb-0">{item?.name}</span>
              <span className="text-secondary">
                {item?.artists.map(
                  (item, index) => (index ? ', ' : '') + item.name
                )}
              </span>
            </div>

            <div className="album-tracks-btn d-flex justify-content-end align-items-center">
              <span className="text-secondary me-5 d-lg-block d-none">
                {millisToMinutesAndSeconds(item?.duration_ms)}
              </span>
              <PlayFromList index={index} list={album?.tracks} type="small" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Album;
