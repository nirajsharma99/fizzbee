import { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/CancelTwoTone';

function Suggestion() {
  const suggest = JSON.parse(window.localStorage.getItem('suggest'));
  const [show, setShow] = useState(false);
  useEffect(() => {
    const { innerWidth: width, innerHeight: height } = window;
    if (width < 768) {
      setShow(suggest === null ? true : suggest);
    }
  }, []);
  const closeModal = () => {
    setShow(false);
    window.localStorage.setItem('suggest', false);
  };
  return (
    <div style={{ display: show ? 'block' : 'none' }} className="suggest-modal">
      <button className="t-btn" onClick={closeModal}>
        <CancelIcon fontSize="large" style={{ color: 'var(--main-theme)' }} />
      </button>
      <div>
        <p>
          For better UI experience in Smartphones, Open options and click on{' '}
          <i>"Add to Home Screen"</i>
          <br />
          Then play through App Shortcut :)
        </p>
      </div>
    </div>
  );
}
export default Suggestion;
