import { useEffect, useState } from 'react';
import CancelIcon from '@material-ui/icons/CancelTwoTone';

function Suggestion() {
  const suggest = JSON.parse(window.localStorage.getItem('suggest'));
  const [show, setShow] = useState(false);
  useEffect(() => {
    const { innerWidth: width } = window;
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
      <div>
        <h3>Note</h3>
        <p>
          For better UI experience in Smartphones, Open options and click on{' '}
          <i>"Add to Home Screen" </i>
          or You can just install the app from the prompt shown above.
          <br />
          Then play through App Shortcut :)
        </p>
      </div>
      <button className="ok-btn" onClick={closeModal}>OK</button>
    </div>
  );
}
export default Suggestion;
