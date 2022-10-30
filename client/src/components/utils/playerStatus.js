import '../styling/utils.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';

function PlayerStatus() {
  const barRef = useRef();
  const { playerReady, isPremium } = useSelector((state) => state.player);
  useEffect(() => {
    if (playerReady) {
      const timeout = setTimeout(() => {
        closeNotibar();
      }, 7000);
      return () => {
        clearTimeout(timeout);
      };
    }
  }, [playerReady]);

  function closeNotibar() {
    barRef.current.style.display = 'none';
  }
  return (
    <div
      ref={barRef}
      className={'n-outer ' + (playerReady ? 'n-success' : 'n-error')}
    >
      {playerReady ? (
        <div className="n-text-holder">
          <span>(̶◉͛‿◉̶) Player is ready!!</span>
          <button className="c-success t-btn" onClick={closeNotibar}>
            <HighlightOff />
          </button>
        </div>
      ) : (
        <div className="n-text-holder">
          <span>
            {isPremium
              ? "(ㆆ_ㆆ) Player isn't ready..."
              : '(ㆆ_ㆆ) Not a premium user!'}
          </span>
        </div>
      )}
    </div>
  );
}
export default PlayerStatus;
