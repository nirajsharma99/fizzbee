import { useDispatch, useSelector } from "react-redux";
import { setHeaderInvert, setHeaderPos, setHeaderHide, setHeaderCollapse } from "../../store/actions/app-actions";
import CustomSwitch from "../../utils/CustomSwitch";

function HeaderSettings() {
    const dispatch = useDispatch();
    const { headerPos, headerInvert, headerHide, headerCollapse } = useSelector((state) => state.app);

    return (
        <>
            <hr />
            <p className="section-heading mb-0">Header Settings</p>
            <hr />
            <div className="inner-sets-outer">
                <div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Invert Header icons
                        </p>
                        <CustomSwitch currentValue={headerInvert} handleChange={() => dispatch(setHeaderInvert(!headerInvert))} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Hide Header
                        </p>
                        <CustomSwitch currentValue={headerHide} handleChange={() => dispatch(setHeaderHide(!headerHide))} />
                    </div>
                    <div className="inner-sets mt-3">
                        <p className="section-heading">
                            Collapse on Scroll
                        </p>
                        <CustomSwitch currentValue={headerCollapse} handleChange={() => dispatch(setHeaderCollapse(!headerCollapse))} />
                    </div>
                </div>
            </div>
        </>
    )
}
export default HeaderSettings;