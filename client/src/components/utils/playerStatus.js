import './styling.css';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useEffect } from 'react';

function PlayerStatus() {
  const [{ playerReady }, dispatch] = useDataHandlerValue();

  const timeoutOf = document.getElementsByClassName('n-outer n-success');
  useEffect(() => {
    if (playerReady) {
      setTimeout(() => {
        closeNotibar();
      }, 7000);
    }
  }, [playerReady]);

  function closeNotibar() {
    if (!timeoutOf) return;
    timeoutOf[0].style.display = 'none';
  }
  return (
    <div className={'n-outer ' + (playerReady ? 'n-success' : 'n-error')}>
      {playerReady ? (
        <div className="n-text-holder">
          <span>◕‿◕ Player is ready!!</span>
          <button className="c-success t-btn" onClick={closeNotibar}>
            <HighlightOff />
          </button>
        </div>
      ) : (
        <div className="n-text-holder">
          <span>(҂⌣̀_⌣́) Player isn't ready...</span>
        </div>
      )}
    </div>
  );
}
export default PlayerStatus;
