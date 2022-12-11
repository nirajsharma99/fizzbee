import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setIslandDouble, setIslandPos } from "../../store/actions/player-actions";
import { islandConstants, islandPositionSettings } from "./settingConstants";

const useStyles = makeStyles(() => ({
    formControl: {
        "& .MuiInputBase-root": {
            color: "var(--main-theme)",
            borderColor: "rgba(191, 191, 191,0.2)",
            border: 0,
            borderWidth: "1px",
            borderStyle: "solid",
            borderRadius: "5px",
            minWidth: "170px",
            justifyContent: "center"
        },
        "& .MuiSelect-select.MuiSelect-select": {
            paddingRight: "0px"
        }
    },
    select: {
        width: "auto",
        fontFamily: 'var(--font)',
        fontWeight: 'bolder',
        letterSpacing: '1px',
        fontSize: "12px",
        "&:focus": {
            backgroundColor: "transparent"
        }
    },
    selectIcon: {
        color: "var(--main-theme)",
    },
    paper: {
        borderRadius: 2,
        marginTop: 4,
        background: 'rgb(24,24,24)',
        color: 'white'
    },
    list: {
        paddingTop: 0,
        paddingBottom: 0,
        "& li": {
            fontWeight: 200,
            paddingTop: 4,
            paddingBottom: 4,
            fontSize: "12px",
            fontFamily: 'var(--font)',
            fontWeight: 'bolder',
            letterSpacing: '1px',
            minWidth: "170px",
        },
        "& li.Mui-selected": {
            color: "var(--background)",
            background: "var(--main-theme)"
        },
        "& li.Mui-selected:hover": {
            color: 'white',
            background: 'grey'
        }
    }
}));

function IslandSettings() {
    const dispatch = useDispatch();
    const { islandDouble, islandPos } = useSelector((state) => state.player);

    const classes = useStyles();

    const menuProps = {
        classes: {
            list: classes.list,
            paper: classes.paper
        },
        anchorOrigin: {
            vertical: "bottom",
            horizontal: "center"
        },
        transformOrigin: {
            vertical: "top",
            horizontal: "center"
        },
        getContentAnchorEl: null
    };

    const handleChange = (e) => {
        switch (e.target.name) {
            case 'Double Tap':
                dispatch(setIslandDouble(islandConstants.findIndex(item => item.value === e.target.value)));
                break;
            case 'Island Position':
                dispatch(setIslandPos(islandPositionSettings.findIndex(item => item.value === e.target.value)))
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
            <div className="island-sets-outer">
                <div>
                    <div className="island-sets">
                        <p className="section-heading">
                            Double Tap
                        </p>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                value={islandConstants[islandDouble]?.value}
                                name="Double Tap"
                                onChange={handleChange}
                                classes={{
                                    select: classes.select,
                                    icon: classes.selectIcon
                                }}
                                MenuProps={menuProps}
                            >
                                {islandConstants.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="island-sets mt-3">
                        <p className="section-heading">
                            Island Position
                        </p>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                value={islandPositionSettings[islandPos]?.value}
                                name="Island Position"
                                onChange={handleChange}
                                classes={{
                                    select: classes.select,
                                    icon: classes.selectIcon
                                }}
                                MenuProps={menuProps}
                            >
                                {islandPositionSettings.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default IslandSettings;