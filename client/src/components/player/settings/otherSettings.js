import { useState } from 'react';
import '../../styling/settings.css';
import { setVCLang } from '../../store/actions/player-actions';
import { setAlbumBG, toggleDarkMode } from '../../store/actions/app-actions';
import { useDispatch, useSelector } from 'react-redux';
import { FormControlLabel, styled, Switch } from "@material-ui/core";


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

function OtherSettings() {
  const dispatch = useDispatch();
  const vcLang = useSelector((state) => state.player.vcLang);
  const albumBackground = useSelector((state) => state.app.albumBackground);
  const darkMode = useSelector((state) => state.app.darkMode);
  const [lang, setLang] = useState(vcLang);

  const languages = [
    'en-IN/(English India)',
    'en-US/(English US)',
    'en-GB/(English UK)',
    'en-IE/(English Ireland)',
  ];

  const handleChange = (event) => {
    setLang(event.target.value);
    const getLang = event.target.value.split('/')[0];
    dispatch(setVCLang(getLang));
  };

  const handleAlbumBG = () => {
    dispatch(setAlbumBG(!albumBackground));
  };
  return (
    <div className='other-setting-outer'>
      <hr />
      <p className="section-heading mb-0">Other Settings</p>
      <hr />
      <div className='m-auto'>
        <div className="other-settings vc-settings d-none">
          <label className="section-heading mb-2 me-3" htmlFor="vc-lang">
            Voice command language
          </label>
          <div className="custom-select-2">
            <select name="vc-lang" value={lang} onChange={handleChange}>
              {languages.map((lang, i) => (
                <option value={lang} key={i}>
                  {lang}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="other-settings">
          <span className="section-heading mb-2 me-3">
            Current song background
          </span>
          <FormControlLabel
            control={<CustomSwitch sx={{ m: 1 }} checked={albumBackground} defaultChecked onClick={handleAlbumBG} />}
          />
        </div>
        <div className="other-settings">
          <span className="section-heading mb-2 me-3">Dark Mode</span>
          <FormControlLabel
            control={<CustomSwitch sx={{ m: 1 }} checked={darkMode} defaultChecked onClick={() => dispatch(toggleDarkMode())} />}
          />
        </div>
      </div>
    </div>
  );
}
export default OtherSettings;
