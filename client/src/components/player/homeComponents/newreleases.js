import './newreleases.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { useState } from 'react';
import ColorThief from '../../../../node_modules/colorthief/dist/color-thief.mjs';

function NewReleases() {
  const [{ newReleases }, dispatch] = useDataHandlerValue();
  const [bgColor, setBgColor] = useState(null);

  const getColor = () => {
    const colorThief = new ColorThief();
    const img = document.getElementById('main-album');
    var color;
    if (img.complete) {
      color = colorThief.getColor(img);
    } else {
      img.addEventListener('load', function () {
        color = colorThief.getColor(img);
      });
    }
    setBgColor(color);
  };
  return (
    <div className="slide hi-slide">
      <div className="hi-prev"></div>
      <div className="hi-next"></div>
      {newReleases && (
        <div className="tile-container">
          <div className="tiled">
            <img
              src={newReleases?.albums?.items[1]?.images[0]?.url}
              alt="new_releases"
              className="tiled"
              id="main-album"
              onLoad={getColor}
              style={{
                background: `rgb(${bgColor?.[0]},${bgColor?.[1]},${bgColor?.[2]})`,
              }}
              crossOrigin="anonymous"
            />
            <div className="tiled-left">
              <span className="al">{newReleases?.albums?.items[1]?.type}</span>
              <span className="aln">{newReleases?.albums?.items[1]?.name}</span>
            </div>
            <div className="tiled-right">
              <span className="ar">
                {newReleases?.albums?.items[1]?.artists?.[0]?.type}
              </span>
              {newReleases?.albums?.items[1]?.artists?.map((x, index) => (
                <span key={index} className="arn">
                  {x.name}
                </span>
              ))}
            </div>
          </div>

          <img
            src={newReleases?.albums?.items[0]?.images[0]?.url}
            alt="new_releases"
            className="tile"
          />

          <img
            src={newReleases?.albums?.items[2]?.images[0]?.url}
            alt="new_releases"
            className="tile"
          />
          <img
            src={newReleases?.albums?.items[3]?.images[0]?.url}
            alt="new_releases"
            className="tile"
          />
          <img
            src={newReleases?.albums?.items[4]?.images[0]?.url}
            alt="new_releases"
            className="tile"
          />
        </div>
      )}
    </div>
  );
}
export default NewReleases;
