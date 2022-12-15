import { FormControl, makeStyles, MenuItem, Select } from "@material-ui/core";



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


function CustomDropDown({ settName, settConstants, currentValue, handleChange }) {

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
    return (
        <FormControl variant="standard" className={classes.formControl}>
            <Select
                value={settConstants[currentValue]?.value}
                name={settName}
                onChange={handleChange}
                classes={{
                    select: classes.select,
                    icon: classes.selectIcon
                }}
                MenuProps={menuProps}
            >
                {settConstants.map((item, index) => (
                    <MenuItem key={index} value={item.value}>{item.value}</MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}
export default CustomDropDown;