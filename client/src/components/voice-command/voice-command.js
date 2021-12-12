import './styling.css';
import SpeechRecognition, {
  useSpeechRecognition,
} from 'react-speech-recognition';
import { useEffect, useState } from 'react';
import { useDataHandlerValue } from '../contextapi/DataHandler';

import SpotifyWebApi from 'spotify-web-api-node';
const spotify = new SpotifyWebApi({
  clientId: 'cbb93bd5565e430a855458433142789f',
});
function VC() {
  const [{ token, deviceId, vcLang }, dispatch] = useDataHandlerValue();
  const accessToken = token ? token : window.localStorage.getItem('token');
  spotify.setAccessToken(accessToken);

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
            dispatch({
              type: 'SET_CURRENT_PLAYLIST',
              list: [items[0]],
            });
            dispatch({
              type: 'SET_NOTIBAR',
              errorMsg: `Playing ${items[0]?.name}..`,
              errorType: true,
            });
            resetTranscript();
          })
          .catch((err) => console.error(err));
      })
      .catch((err) => {
        console.log(err);
        dispatch({
          type: 'SET_NOTIBAR',
          errorMsg: 'No results :(',
          errorType: false,
        });
      });
  };

  const skipNext = () => {
    spotify
      .skipToNext({ device_id: deviceId })
      .then(() => {
        console.log('Playing next..');
        dispatch({
          type: 'SET_NOTIBAR',
          errorMsg: 'Playing next song..',
          errorType: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const skipPrev = () => {
    spotify
      .skipToPrevious({ device_id: deviceId })
      .then(() => {
        dispatch({
          type: 'SET_NOTIBAR',
          errorMsg: 'Playing previous song..',
          errorType: true,
        });
      })
      .catch((err) => console.log(err));
  };

  const quit = () => {
    dispatch({
      type: 'SET_NOTIBAR',
      errorMsg: 'good bye :(',
      errorType: true,
    });
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
  const handleKeyUp = (event) => {
    if (event.target.classList.contains('escapeEvent')) return;
    if (event.key === 'f') {
      stopListening();
    }
  };

  useEffect(() => {
    if (!transcript || !accessToken) return;
    const playSong = transcript.split('play').pop();
    console.log(playSong);
    const timeoutVC = setTimeout(() => {
      processSearched(playSong);
    }, 2000);
    return () => {
      clearTimeout(timeoutVC);
    };
  }, [transcript]);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyPress);
      window.removeEventListener('keyup', handleKeyUp);
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
