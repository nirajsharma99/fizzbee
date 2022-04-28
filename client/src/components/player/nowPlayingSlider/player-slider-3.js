import { useState, useEffect, useRef } from 'react';
import {
  getImage,
  getColorOnly,
  millisToMinutesAndSeconds,
} from '../../utils/helperFunctions';
import useSpotify from '../../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';

function MaxPlayer3Slider() {
  const spotify = useSpotify();
  const dispatch = useDispatch();
  const { current, playing, position_ms } = useSelector(
    (state) => state.player
  );
  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const imgRef = useRef();
  const [dragging, setDragging] = useState(false);
  var angle;
  useEffect(() => {
    if (!current) return;
    setInstance(pos / current.duration_ms);
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

  const handleSeeker = (seekTo) => {
    var seekms = (seekTo * current?.duration_ms).toFixed(0);
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

  const start = function (e) {
    setDragging(true);
  };

  const move = (e) => {
    var touch;
    if (e.buttons === 0) return;
    if (e?.touches?.[0]) touch = e?.touches[0];
    const target = document.getElementById('dot').getBoundingClientRect();
    let centerX = target.width / 2 + target.left;
    let centerY = target.height / 2 + target.top;
    let posX = e.pageX ? e.pageX : touch?.pageX;
    let posY = e.pageY ? e.pageY : touch?.pageY;
    let deltaY = centerY - posY;
    let deltaX = centerX - posX;
    angle = Math.atan2(deltaY, deltaX) * (180 / Math.PI);
    angle -= 90;
    if (angle < 0) {
      angle = 360 + angle;
    }
    angle = Math.round(angle);

    if (dragging) {
      document.getElementById(
        'dot-seeker'
      ).style.transform = `rotate(${+angle}deg)`;
      setInstance(angle / 360);
    }
    setDragging(true);
  };
  const stop = function () {
    setDragging(false);
    if (dragging) {
      let seekTo = angle / 360;
      setInstance(seekTo);
      handleSeeker(seekTo);
    }
  };

  return (
    <div className="circular-slider-cont">
      <div className="circling">
        {current && (
          <img
            className="player-3-album"
            src={getImage(current?.album?.images, 'lg')}
            alt="default-art"
            ref={imgRef}
            crossOrigin="anonymous"
            onLoad={() => {
              let col = getColorOnly(imgRef);
              document.documentElement.style.setProperty(
                '--col-thief',
                `rgb(${col[0]},${col[1]},${col[2]})`
              );
            }}
          />
        )}
        <div
          className="dots dot"
          id="dot"
          onMouseDown={start}
          onTouchStart={start}
          onMouseMove={move}
          onMouseUp={stop}
          onTouchMove={move}
          onTouchEnd={stop}
        >
          <div
            className="dot-seeker"
            id="dot-seeker"
            style={{ transform: `rotate(${instance * 360}deg)` }}
          ></div>
        </div>
        <div className="p-3-dur">
          {current ? (
            <>
              <span className="h1" style={{ width: '3.5rem' }}>
                {millisToMinutesAndSeconds(
                  ((instance * 100 * current?.duration_ms) / 100).toFixed(0)
                )}
              </span>
              <span className="h5">
                {'/' + millisToMinutesAndSeconds(current.duration_ms)}
              </span>
            </>
          ) : (
            ''
          )}
        </div>
        <svg width="200" height="200" viewBox="0 0 200 200">
          <circle cx="100" cy="100" r="100"></circle>
          <circle
            cx="100"
            cy="100"
            r="100"
            style={{
              strokeDasharray: 6.2831 * 100,
              strokeDashoffset: 6.2831 * 100 * (1 - instance),
            }}
          ></circle>
        </svg>
      </div>
    </div>
  );
}

export default MaxPlayer3Slider;
