import { useDispatch, useSelector } from "react-redux";
import { setAppBackground, setAppBackgroundBlur, setNotibar } from "../../store/actions/app-actions";
import DoneIcon from '@material-ui/icons/Done';
import OtherSettings from "./otherSettings";
import CustomDigitInput from "../../utils/CustomDigitInput";
import { useEffect, useRef, useState } from "react";
import { deleteUserBackground, getUserBackgrounds, uploadFileAppBackground } from "../../firebase/handlers";

function AppBackground() {
    const dispatch = useDispatch();
    const [userBackgounds, setUserBackgrounds] = useState(null);
    const [progress, setProgress] = useState(0);
    const fileInputRef = useRef();
    const { user } = useSelector((state) => state.user);
    const { darkMode, appBackground, appBackgroundBlur } = useSelector((state) => state.app);
    const bgType = darkMode ? 'bgd' : 'bgl';

    const handleBlur = (blur) => {
        dispatch(setAppBackgroundBlur(blur));
    }

    const showNotibar = (message, result) => {
        dispatch(setNotibar(message, result, 7000));
        setProgress(0);
        getUserBackgrounds({ userId: user.id, setData: setUserBackgrounds });
    }

    const handleFile = (e) => {
        let file = (e.target.files[0]);
        if (file && user) {
            uploadFileAppBackground(file, user.id, showNotibar, setProgress);
        }
    }
    const handleDelete = (item, index) => {
        if (!user) return;
        if (appBackground === item.link)
            dispatch(setAppBackground(''));
        deleteUserBackground(item, user.id, showNotibar);
        userBackgounds.splice(index, 1);
    }

    useEffect(() => {
        if (!user) return;
        getUserBackgrounds({ userId: user.id, setData: setUserBackgrounds });
    }, [user])

    return (
        <div className='inner-sets' style={{ flexDirection: 'column' }}>
            <div className="bg-p-outer">
                <input ref={fileInputRef} type="file" onChange={handleFile} hidden />
                <div className="bg-circle-add"
                    onClick={() => !progress && fileInputRef.current.click()}
                >
                    <svg width="60" height="60" viewBox="0 0 60 60">
                        <circle
                            cx="30"
                            cy="30"
                            r="30"
                            style={{
                                strokeDasharray: 6.2831 * 30,
                                strokeDashoffset: 6.2831 * 30 * (1 - progress),
                            }}
                        ></circle>
                    </svg>
                    {progress ? <ion-icon style={{ color: 'var(--main-theme)', width: '50%', height: '50%' }} name="cloud-upload-outline"></ion-icon> : <ion-icon name="add-circle"></ion-icon>}

                </div>
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
                {userBackgounds?.map((pic, i) => (
                    <div className="bg-circle-outer"
                    >
                        <div
                            className="bg-circle"
                            onClick={() => dispatch(setAppBackground(pic.link))}
                            key={i}
                            style={{
                                backgroundImage: `url(${pic.link})`,
                                width: appBackground === pic.link ? '80px' : '',
                                height: appBackground === pic.link ? '80px' : '',
                                minWidth: appBackground === pic.link ? '80px' : '',
                            }}
                        >
                            <DoneIcon
                                style={{
                                    display: appBackground !== pic.link && 'none',
                                    color: 'var(--main-theme)',
                                    background: 'black',
                                    borderRadius: '50%',
                                }}
                                fontSize="small"
                            />
                        </div>
                        <button className="delete-bg-btn t-btn" onClick={() => handleDelete(pic, i)}>
                            <ion-icon name="remove-circle"></ion-icon>
                        </button>
                    </div>
                ))}
                {Array(darkMode ? 25 : 7)
                    .fill()
                    .map((c, i) => (
                        <div
                            className="bg-circle"
                            onClick={() => dispatch(setAppBackground(`/${bgType}${i + 1}.jpg`))}
                            key={i}
                            style={{
                                backgroundImage: `url(/${bgType}${i + 1}.jpg)`,
                                width: appBackground === `/${bgType}${i + 1}.jpg` ? '80px' : '',
                                height: appBackground === `/${bgType}${i + 1}.jpg` ? '80px' : '',
                                minWidth: appBackground === `/${bgType}${i + 1}.jpg` ? '80px' : '',
                            }}
                        >
                            <DoneIcon
                                style={{
                                    display: appBackground !== `/${bgType}${i + 1}.jpg` && 'none',
                                    color: 'var(--main-theme)',
                                    background: 'black',
                                    borderRadius: '50%',
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