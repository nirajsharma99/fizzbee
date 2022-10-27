import { useState, useEffect, useRef } from 'react';
import {
  getImage,
  getColorOnly,
  millisToMinutesAndSeconds,
  pauseEvent,
} from '../../utils/helperFunctions';
import useSpotify from '../../hooks/useSpotify';
import { useSelector } from 'react-redux';

function MaxPlayer3Slider() {
  const spotify = useSpotify();
  const { current, playing, position_ms } = useSelector(
    (state) => state.player
  );
  const [instance, setInstance] = useState(0);
  const [pos, setPos] = useState(0);
  const imgRef = useRef();
  const [dragging, setDragging] = useState(false);
  let angle;

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
  //Album theme color
  const setColor = (col) => {
    document.documentElement.style.setProperty(
      '--col-thief',
      `rgb(${col[0]},${col[1]},${col[2]})`
    );
    document.documentElement.style.setProperty(
      '--col-thief-bg-lite',
      `rgba(${col[0]},${col[1]},${col[2]}, 0.7)`
    );
  };
  //Seeker Code
  const handleSeeker = (seekTo) => {
    var seekms = (seekTo * current?.duration_ms).toFixed(0);
    if (typeof seekms === NaN) return;
    spotify
      .seek(seekms)
      .then(function () {
        //console.log('Seek to ' + instance);
      })
      .catch(function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be  returned
        console.log('Something went wrong!', err);
      });
  };

  const start = function (e) {
    setDragging(true);
  };

  const move = (e) => {
    var posX, posY;
    if (e.buttons === 0) return;
    pauseEvent(e);
    const target = document.getElementById('dot').getBoundingClientRect();
    let centerX = target.width / 2 + target.left;
    let centerY = target.height / 2 + target.top;
    if (e.type === 'touchmove') {
      posX = e.touches[0].pageX;
      posY = e.touches[0].pageY;
    } else {
      posX = e.pageX;
      posY = e.pageY;
    }
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
          <div className="player-3-album">
            <img
              src={getImage(current?.album?.images, 'lg')}
              alt="default-art"
              ref={imgRef}
              crossOrigin="anonymous"
              onLoad={() => {
                let col = getColorOnly(imgRef);
                setColor(col);
              }}
            />
            <div className="p-3-dur">
              {current ? (
                <>
                  <span className="h1" style={{ width: '3.5rem' }}>
                    {millisToMinutesAndSeconds(
                      (instance * current?.duration_ms).toFixed(0)
                    )}
                  </span>
                  <span className="h5">
                    {' / ' + millisToMinutesAndSeconds(current?.duration_ms)}
                  </span>
                </>
              ) : (
                ''
              )}
            </div>
          </div>
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
