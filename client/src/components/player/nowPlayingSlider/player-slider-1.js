import { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from '../../utils/helperFunctions';
import '../../styling/playerSlider.css';
import useSpotify from '../../hooks/useSpotify';
import { useSelector } from 'react-redux';

function PlayerSlider1() {
  const { current, position_ms, playing } = useSelector(
    (state) => state.player
  );
  const spotify = useSpotify();

  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);

  useEffect(() => {
    if (!current) return;
    setInstance((pos / current.duration_ms) * 100);
  }, [pos]);
  useEffect(() => {
    setPos(position_ms);
  }, [position_ms]);

  useEffect(() => {
    let interval = null;
    if (playing) {
      interval = setInterval(() => {
        setPos((pos) => pos + 1000);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
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
    <div className="justify-content-center align-items-center d-flex">
      <div className="playerSlider w-100">
        <p className="text-timer">
          {current
            ? millisToMinutesAndSeconds(
                ((instance * current.duration_ms) / 100).toFixed(0)
              )
            : '00:00'}
        </p>
        <input
          type="range"
          className="range-2 mx-2"
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
        <p className="text-timer">
          {current ? millisToMinutesAndSeconds(current.duration_ms) : '00:00'}
        </p>
      </div>
    </div>
  );
}
export default PlayerSlider1;
