import { useDispatch, useSelector } from "react-redux";
import { setIslandDouble, setIslandPos, setIslandSwipeLeft, setIslandSwipeRight } from "../../store/actions/player-actions";
import CustomDropDown from "../../utils/CustomDropDown";
import { islandConstants, islandPositionSettings } from "./settingConstants";

function IslandSettings() {
    const dispatch = useDispatch();
    const { islandDouble, islandPos, islandSwipeLeft, islandSwipeRight } = useSelector((state) => state.player);

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'Double Tap':
                dispatch(setIslandDouble(islandConstants.findIndex(item => item.value === e.target.value)));
                break;
            case 'Island Position':
                dispatch(setIslandPos(islandPositionSettings.findIndex(item => item.value === e.target.value)));
                break;
            case 'Swipe Left':
                dispatch(setIslandSwipeLeft(islandConstants.findIndex(item => item.value === e.target.value)));
                break;
            case 'Swipe Right':
                dispatch(setIslandSwipeRight(islandConstants.findIndex(item => item.value === e.target.value)));
                break;
            default:
                console.log('Label Error');
                break;
        }
    }

    return (
        <div>
            <hr />
            <p className="section-heading mb-0">Island Settings</p>
            <hr />
            <div className="inner-sets-outer">
                <div>
                    <div className="inner-sets">
                        <p className="section-heading">
                            Double Tap
                        </p>
                        <CustomDropDown settName="Double Tap" settConstants={islandConstants} currentValue={islandDouble} handleChange={handleChange} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Swipe Left
                        </p>
                        <CustomDropDown settName="Swipe Left" settConstants={islandConstants} currentValue={islandSwipeLeft} handleChange={handleChange} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Swipe Right
                        </p>
                        <CustomDropDown settName="Swipe Right" settConstants={islandConstants} currentValue={islandSwipeRight} handleChange={handleChange} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Island Position
                        </p>
                        <CustomDropDown settName="Island Position" settConstants={islandPositionSettings} currentValue={islandPos} handleChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IslandSettings;