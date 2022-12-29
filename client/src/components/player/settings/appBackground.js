import { useDispatch, useSelector } from "react-redux";
import { setAppBackground, setAppBackgroundBlur } from "../../store/actions/app-actions";
import DoneIcon from '@material-ui/icons/Done';
import OtherSettings from "./otherSettings";
import CustomDigitInput from "../../utils/CustomDigitInput";

function AppBackground() {
    const dispatch = useDispatch();
    const { darkMode, appBackground, appBackgroundBlur } = useSelector((state) => state.app);
    const bgType = darkMode ? 'bgd' : 'bgl';

    const handleBlur = (blur) => {
        dispatch(setAppBackgroundBlur(blur));
    }

    return (
        <div className='inner-sets' style={{ flexDirection: 'column' }}>
            <div className="bg-p-outer">
                <div
                    className="bg-circle"
                    onClick={() => dispatch(setAppBackground(darkMode ? `` : '/abstract.jpg'))}
                    style={{ background: darkMode ? `black` : 'white', backgroundImage: !darkMode && `url(/abstract.jpg)` }}
                >
                    <DoneIcon
                        style={{
                            display: (darkMode ? appBackground !== '' : appBackground !== '/abstract.jpg') && 'none',
                            color: 'var(--main-theme)',
                            background: 'black',
                            borderRadius: '50%'
                        }}
                        fontSize="small"
                    />
                </div>
                {Array(darkMode ? 25 : 7)
                    .fill()
                    .map((c, i) => (
                        <div
                            className="bg-circle"
                            onClick={() => dispatch(setAppBackground(`/${bgType}${i + 1}.jpg`))}
                            key={i}
                            style={{ backgroundImage: `url(/${bgType}${i + 1}.jpg)` }}
                        >
                            <DoneIcon
                                style={{
                                    display: appBackground !== `/${bgType}${i + 1}.jpg` && 'none',
                                    color: 'var(--main-theme)',
                                    background: 'black',
                                    borderRadius: '50%'
                                }}
                                fontSize="small"
                            />
                        </div>
                    ))}
            </div>
            <OtherSettings />
            <div className="inner-sets-outer">
                <div className="inner-sets mt-3">
                    <p className="section-heading">
                        Background Blur
                    </p>
                    <CustomDigitInput id="digit-input-blur" handleOp={handleBlur} min={0} max={10} step={1} value={appBackgroundBlur} />
                </div>
            </div>
        </div>
    )
}

export default AppBackground;