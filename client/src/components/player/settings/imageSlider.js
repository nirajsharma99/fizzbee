import { useDispatch, useSelector } from 'react-redux';
import { FormControl, FormControlLabel, makeStyles, MenuItem, Select, styled, Switch } from "@material-ui/core";
import '../../styling/settings.css';
import { homeSliderConstants } from './settingConstants';
import { setHomeSliderAutoplay, setHomeSliderDelay, setHomeSliderType } from '../../store/actions/app-actions';

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
const CustomSwitch = styled((props) => (
    <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
    width: 42,
    height: 26,
    padding: 0,
    '& .MuiSwitch-switchBase': {
        padding: 0,
        margin: 2,
        transitionDuration: '300ms',
        '&.Mui-checked': {
            transform: 'translateX(16px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
                backgroundColor: 'var(--main-theme)',
                opacity: 1,
                border: 0,
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: 0.5,
            },
        },
        '&.Mui-focusVisible .MuiSwitch-thumb': {
            color: '#33cf4d',
            border: '6px solid #fff',
        },
        '&.Mui-disabled .MuiSwitch-thumb': {
            color:
                theme.palette.mode === 'light'
                    ? theme.palette.grey[100]
                    : theme.palette.grey[600],
        },
        '&.Mui-disabled + .MuiSwitch-track': {
            opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
        },
    },
    '& .MuiSwitch-thumb': {
        boxSizing: 'border-box',
        width: 22,
        height: 22,
    },
    '& .MuiSwitch-track': {
        borderRadius: 26 / 2,
        backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
        opacity: 1,
        transition: theme.transitions.create(['background-color'], {
            duration: 500,
        }),
    },
}));
function ImageSlider() {
    const classes = useStyles();
    const dispatch = useDispatch();
    const { sliderType, autoPlay, autoPlayDelay } = useSelector((state) => state.app.homeSlider);

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
            <p className="section-heading mb-0">Home Image Slider</p>
            <hr />
            <div className="island-sets-outer">
                <div>
                    <div className="island-sets">
                        <p className="section-heading">
                            Slider Type
                        </p>
                        <FormControl variant="standard" className={classes.formControl}>
                            <Select
                                value={homeSliderConstants[sliderType]?.value}
                                name="Double Tap"
                                onChange={handleChange}
                                classes={{
                                    select: classes.select,
                                    icon: classes.selectIcon
                                }}
                                MenuProps={menuProps}
                            >
                                {homeSliderConstants.map((item, index) => (
                                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <div className="island-sets mt-3">
                        <p className="section-heading me-5">
                            Autoplay
                        </p>
                        <FormControlLabel
                            control={<CustomSwitch sx={{ m: 1 }} checked={autoPlay} defaultChecked onClick={handleAutoplay} />}
                        />
                    </div>
                    <div className="island-sets mt-3">
                        <p className="section-heading me-5">
                            Autoplay Delay (In Seconds)
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