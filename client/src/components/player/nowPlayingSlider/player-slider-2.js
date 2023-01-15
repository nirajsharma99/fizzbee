import { useEffect, useRef, useState } from 'react';
import useSpotify from '../../hooks/useSpotify';
import { millisToMinutesAndSeconds } from '../../utils/helperFunctions';
import '../../styling/playerSlider.css';
import { useSelector } from 'react-redux';

function PlayerSlider2() {
  const { current, position_ms, playing } = useSelector(
    (state) => state.player
  );
  const spotify = useSpotify();
  //console.log(position_ms);

  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const countRef = useRef(null);

  useEffect(() => {
    if (!current) return;
    setInstance((pos / current.duration_ms) * 100);
  }, [pos]);
  useEffect(() => {
    setPos(position_ms);
  }, [position_ms]);

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
        console.log('Seek to ' + instance);
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

          <div class="range">
            <input
              type="range"
              name="points"
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
              class="count"
            />
            <div class="slice left">
              <div class="blocker"></div>
            </div>
            <div class="slice right">
              <div class="blocker"></div>
            </div>
            <span class="info">
              <span class="count">0</span>
              points
            </span>
            <div class="dial" tabindex={instance}></div>
          </div>

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
export default PlayerSlider2;
