import { useEffect, useRef, useState } from 'react';
import { useDataHandlerValue } from '../../contextapi/DataHandler';
import { millisToMinutesAndSeconds } from '../../utils/helperFunctions';
import './playerSlider.css';
import useSpotify from '../../hooks/useSpotify';

function PlayerSlider1() {
  const [{ current, position, playing }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  //console.log(position);

  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!current) return;
    setInstance((pos / current.duration_ms) * 100);
  }, [pos]);
  useEffect(() => {
    setPos(position);
  }, [position]);

  useEffect(() => {
    if (playing) {
      countRef.current = setInterval(() => {
        setPos((pos) => pos + 1000);
      }, 1000);
    } else {
      clearInterval(countRef.current);
    }
  }, [playing]);

  const handleSeeker = () => {
    var seekms = ((instance * current?.duration_ms) / 100).toFixed(0);
    spotify
      .seek(seekms)
      .then(function () {
        //console.log('Seek to ' + instance);
      })
      .catch(function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      });
  };

  return (
    <>
      <div className="justify-content-center align-items-center d-flex">
        <div className="playerSlider w-100">
          <p
            className="m-0 text-center"
            style={{ width: '45px', color: 'rgba(255,255,255,0.7)' }}
          >
            {current
              ? millisToMinutesAndSeconds(
                  ((instance * current.duration_ms) / 100).toFixed(0)
                )
              : '00:00'}
          </p>
          <input
            type="range"
            className="range-2"
            min="0"
            max="100"
            value={instance}
            style={{
              background: `linear-gradient(90deg, var(--main-theme) ${instance}%, #fff 60%)`,
            }}
            onChange={(e) => setInstance(e.target.value)}
            onMouseUp={handleSeeker}
            onKeyUp={handleSeeker}
            onTouchEnd={handleSeeker}
          />
          <p
            className="m-0 text-center"
            style={{ width: '45px', color: 'rgba(255,255,255,0.7)' }}
          >
            {current ? millisToMinutesAndSeconds(current.duration_ms) : '00:00'}
          </p>
        </div>
      </div>
    </>
  );
}
export default PlayerSlider1;
