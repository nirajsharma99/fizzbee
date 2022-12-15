import '../../styling/notibar.css';
import { useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import Close from '@material-ui/icons/Close';
import { notibarPositionSettings } from '../settings/settingConstants';

function Notibar2() {
    const barRef = useRef();
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
    }

    return (
        <div
            ref={barRef}
            className={'n-outer ' + (notibar.type ? 'n2-success ' : 'n2-error ') + (notibarPositionSettings[notibarPos]?.class)}
        >
            <div className="n-text-holder">
                {notibar.type ? <ion-icon name="checkmark-done-circle-outline"></ion-icon> : <ion-icon name="alert-circle-outline"></ion-icon>}<span>{notibar.msg}</span>
                <button
                    className={(notibar.type ? 'n2-c-success' : 'n2-c-error') + ' t-btn'}
                    onClick={closeNotibar}
                >
                    <Close />
                </button>
            </div>
        </div>
    );
}
export default Notibar2;
