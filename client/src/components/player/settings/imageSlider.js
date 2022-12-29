import { useDispatch, useSelector } from 'react-redux';
import '../../styling/settings.css';
import { homeSliderConstants } from './settingConstants';
import { setHomeSliderAutoplay, setHomeSliderDelay, setHomeSliderType } from '../../store/actions/app-actions';
import useCheckDevice from '../../utils/checkDevice';
import CustomDropDown from '../../utils/CustomDropDown';
import CustomSwitch from '../../utils/CustomSwitch';
import CustomDigitInput from '../../utils/CustomDigitInput';

function ImageSlider() {
    const dispatch = useDispatch();
    const { sliderType, autoPlay, autoPlayDelay } = useSelector((state) => state.app.homeSlider);
    const { isMobile } = useCheckDevice();

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'Image Slider':
                dispatch(setHomeSliderType(homeSliderConstants.findIndex(item => item.value === e.target.value)));
                break;
            default:
                console.log('Label Error');
                break;
        }
    }
    const handleAutoplay = () => {
        dispatch(setHomeSliderAutoplay(!autoPlay));
    }

    const handleDelay = (delay) => {
        dispatch(setHomeSliderDelay(delay));
    }

    return (
        <>
            <hr />
            <p className="section-heading mb-0">Home Image Slider</p>
            <hr />
            <div className="inner-sets-outer">
                <div>
                    <div className="inner-sets">
                        <p className="section-heading">
                            Slider Type
                        </p>
                        <CustomDropDown settName="Image Slider" settConstants={homeSliderConstants} currentValue={sliderType} handleChange={handleChange} />
                    </div>
                    <div className="inner-sets mt-3" hidden={!isMobile && (homeSliderConstants[sliderType]?.value == 'Cards')}>
                        <p className="section-heading me-5">
                            Autoplay
                        </p>
                        <CustomSwitch currentValue={autoPlay} handleChange={handleAutoplay} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Autoplay Delay (sec)
                        </p>
                        <CustomDigitInput id="digit-input-1" handleOp={handleDelay} min={0} max={10} step={0.5} value={autoPlayDelay} />
                    </div>
                </div>
            </div>
        </>
    )
};
export default ImageSlider;