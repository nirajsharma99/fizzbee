import '../styling/utils.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotibar } from '../store/actions/app-actions';

function Notibar() {
  const barRef = useRef();
  const dispatch = useDispatch();
  const { notibar } = useSelector((state) => state.app);

  useEffect(() => {
    if (notibar.msg) {
      barRef.current.style.display = 'block';
      const timeout = setTimeout(() => {
        closeNotibar();
      }, 7000);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      closeNotibar();
    }
  }, [notibar.msg]);

  function closeNotibar() {
    barRef.current.style.display = 'none';
    dispatch(setNotibar(null, false));
  }

  return (
    <div
      ref={barRef}
      className={'n-outer ' + (notibar.type ? 'n-success' : 'n-error')}
    >
      {notibar.type ? (
        <div className="n-text-holder">
          <span>{notibar.msg}</span>
          <button className="c-success t-btn" onClick={closeNotibar}>
            <HighlightOff />
          </button>
        </div>
      ) : (
        <div className="n-text-holder">
          <span>{notibar.msg}</span>
          <button
            className="c-success t-btn"
            onClick={closeNotibar}
            style={{ color: 'red' }}
          >
            <HighlightOff />
          </button>
        </div>
      )}
    </div>
  );
}
export default Notibar;
