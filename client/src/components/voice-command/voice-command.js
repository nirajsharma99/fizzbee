import './styling.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import useSpotify from '../hooks/useSpotify';
import { useDispatch, useSelector } from 'react-redux';
import { setNotibar } from '../store/actions/app-actions';
import { setCurrentPlaylist } from '../store/actions/library-actions';
import {
  handleSkipNext,
  handleSkipPrev,
} from '../store/actions/spotify-actions';

function VC() {
  const dispatch = useDispatch();
  const { deviceId, vcLang, token } = useSelector((state) => state.player);
  const spotify = useSpotify();

  const [animDur, setAnimDur] = useState('10s');

  const { transcript, resetTranscript } = useSpeechRecognition();
  if (!SpeechRecognition.browserSupportsSpeechRecognition()) {
    alert('Voice command not supported');
  }

  const playSearched = (playSong) => {
    spotify
      .search(playSong, ['track'])
      .then((res) => {
        const { items } = res.body.tracks;
        spotify
          .play({
            uris: [items[0]?.uri],
            device_id: deviceId,
          })
          .then((res) => {
            dispatch(setCurrentPlaylist([items[0]]));
            dispatch(setNotibar(`Playing ${items[0]?.name}..`, true));
            resetTranscript();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(err);
        dispatch(setNotibar('No results :(', false));
      });
  };

  const skipNext = () => {
    dispatch(handleSkipNext());
  };

  const skipPrev = () => {
    dispatch(handleSkipPrev());
  };

  const quit = () => {
    dispatch(setNotibar('good bye :(', true));
    window.localStorage.removeItem('token');
    window.location.href = '/';
  };

  const processSearched = (playSong) => {
    switch (playSong) {
      case 'next':
        skipNext();
        break;
      case 'previous':
        skipPrev();
        break;
      case 'bye':
        quit();
        break;

      default:
        playSearched(playSong);
        break;
    }
  };

  const startListening = () => {
    setAnimDur('1s');
    document.documentElement.style.setProperty('--vc-theme', 'cyan');
    SpeechRecognition.startListening({ language: vcLang });
  };
  const stopListening = () => {
    setAnimDur('10s');
    document.documentElement.style.setProperty('--vc-theme', '#fff');
    SpeechRecognition.stopListening();
  };
  const handleKeyPress = (event) => {
    if (event.target.classList.contains('escapeEvent')) return;
    if (event.key === 'v') {
      startListening();
    }
  };
  const handleTouchDown = () => {
    startListening();
  };
  const handleKeyUp = (event) => {
    if (event.target.classList.contains('escapeEvent')) return;
    if (event.key === 'f') {
      stopListening();
    }
  };

  useEffect(() => {
    if (!transcript || !token) return;
    const playSong = transcript.split('play').pop();
    console.log(playSong);
    const timeoutVC = setTimeout(() => {
      processSearched(playSong);
    }, 2000);
    return () => {
      clearTimeout(timeoutVC);
    };
  }, [transcript]);

  var timer;
  var touchduration = 4000; //length of time we want the user to touch before we do something
  const touchstart = () => {
    timer = setTimeout(handleTouchDown, touchduration);
  };
  const touchend = () => {
    //stops short touches from firing the event
    if (timer) clearTimeout(timer); // clearTimeout, not cleartimeout..
    stopListening();
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);
    window.addEventListener('touchstart', touchstart);
    window.addEventListener('touchend', touchend);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
      window.removeEventListener('touchstart', touchstart);
      window.removeEventListener('touchend', touchend);
    };
  }, [handleKeyPress]);

  useEffect(() => {
    if (transcript) {
      const timeoutTranscript = setTimeout(() => {
        resetTranscript();
      }, 10000);
      return () => {
        clearTimeout(timeoutTranscript);
      };
    }
  }, [transcript]);

  return (
    <div className="vc-outer">
      <button
        className="circle t-btn"
        onMouseDown={startListening}
        onMouseUp={stopListening}
      ></button>
      <svg hidden>
        <filter id="wavy">
          <feTurbulence
            x="0"
            y="0"
            baseFrequency="0.009"
            numOctaves="5"
            seed="1"
          >
            <animate
              attributeName="baseFrequency"
              dur={animDur}
              values="0.02;0.005;0.5"
              repeatCount="indefinite"
            ></animate>
          </feTurbulence>
          <feDisplacementMap in="SourceGraphic" scale="5"></feDisplacementMap>
        </filter>
      </svg>
    </div>
  );
}
export default VC;
