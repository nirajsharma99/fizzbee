import '../../styling/notibar.css';
import HighlightOff from '@material-ui/icons/HighlightOff';
import { useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { notibarPositionSettings } from '../settings/settingConstants';
import { setNotibar } from '../../store/actions/app-actions';

function Notibar1() {
  const barRef = useRef();
  const dispatch = useDispatch();
  const { notibar, notibarPos } = useSelector((state) => state.app);

  useEffect(() => {
    if (notibar.msg) {
      barRef.current.style.display = 'block';
      const timeout = setTimeout(() => {
        closeNotibar();
      }, notibar.delay);
      return () => {
        clearTimeout(timeout);
      };
    } else {
      closeNotibar();
    }
  }, [notibar.msg]);

  function closeNotibar() {
    barRef.current.style.display = 'none';
    if (notibar.msg) {
      dispatch(setNotibar(null, false, null));
    }
  }

  return (
    <div
      ref={barRef}
      className={'n-outer ' + (notibar.type ? 'n-success ' : 'n-error ') + (notibarPositionSettings[notibarPos]?.class)}
    >
      <div className="n-text-holder">
        <span>{notibar.msg}</span>
        <button
          className={(notibar.type ? 'c-success' : 'c-error') + ' t-btn'}
          onClick={closeNotibar}
        >
          <HighlightOff />
        </button>
      </div>
    </div>
  );
}
export default Notibar1;
