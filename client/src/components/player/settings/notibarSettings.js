import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { setNotibarPos, setNotibarType } from "../../store/actions/app-actions";
import { notibarPositionSettings, notibarSettings } from "./settingConstants";


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
        background: 'var(--background)',
        color: 'var(--bp-name)'
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
            color: 'var(--bp-name)',
            background: 'grey'
        }
    }
}));

function NotibarSettings() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { notibarType, notibarPos } = useSelector((state) => state.app);

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
            case 'Notibar Type':
                dispatch(setNotibarType(notibarSettings.findIndex(item => item.value === e.target.value)));
                break;
            case "Notibar Position":
                dispatch(setNotibarPos(notibarPositionSettings.findIndex(item => item.value === e.target.value)));
                break;
            default:
                console.log('Label Error');
                break;
        }
    }


    return (
        <>
            <p className="section-heading mb-0">Notification Bar Settings</p>
            <hr />
            <div className="island-sets-outer">
                <div>
                    <div className="island-sets">
                        <p className="section-heading">
                            Notification Type
                        </p>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                value={notibarSettings[notibarType]?.value}
                                name="Notibar Type"
                                onChange={handleChange}
                                classes={{
                                    select: classes.select,
                                    icon: classes.selectIcon
                                }}
                                MenuProps={menuProps}
                            >
                                {notibarSettings.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="island-sets mt-3">
                        <p className="section-heading">
                            Notification Position
                        </p>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                value={notibarPositionSettings[notibarPos]?.value}
                                name="Notibar Position"
                                onChange={handleChange}
                                classes={{
                                    select: classes.select,
                                    icon: classes.selectIcon
                                }}
                                MenuProps={menuProps}
                            >
                                {notibarPositionSettings.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </>
    )

}
export default NotibarSettings;