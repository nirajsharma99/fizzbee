import { useDispatch, useSelector } from 'react-redux';
import '../../styling/settings.css';
import { homeSliderConstants } from './settingConstants';
import { setHomeSliderAutoplay, setHomeSliderDelay, setHomeSliderType } from '../../store/actions/app-actions';
import useCheckDevice from '../../utils/checkDevice';
import CustomDropDown from '../../utils/CustomDropDown';
import CustomSwitch from '../../utils/CustomSwitch';

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

    const handleDelay = (e) => {
        let input = document.getElementById("digit-input");
        let minimum = input.getAttribute("min");
        let maximum = input.getAttribute("max");
        let step = parseFloat(input.getAttribute("step"));
        let val = parseFloat(input.getAttribute("value"));


        if (e.target.id === 'increment') {
            let newValue = val + step;
            if (newValue >= minimum && newValue <= maximum)
                dispatch(setHomeSliderDelay(newValue));
        } else if (e.target.id === 'decrement') {
            let newValue = val - step;
            if (newValue >= minimum && newValue <= maximum)
                dispatch(setHomeSliderDelay(newValue));
        }
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
                        <div className='digit-input-container'>
                            <button id="decrement" onClick={handleDelay}> - </button>
                            <input className='digit-input' type="number" min={0} max={10} step={0.5} value={autoPlayDelay} id="digit-input" readOnly />
                            <button id="increment" onClick={handleDelay}> + </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
};
export default ImageSlider;