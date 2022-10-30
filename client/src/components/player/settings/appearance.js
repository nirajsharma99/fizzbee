import RadioTwoToneIcon from '@material-ui/icons/RadioTwoTone';
import LibraryMusicTwoToneIcon from '@material-ui/icons/LibraryMusicTwoTone';
import DoneIcon from '@material-ui/icons/Done';
import PaletteTwoToneIcon from '@material-ui/icons/PaletteTwoTone';
import { min, max, themes, cp } from './appearanceConstants';
import { useRef, useState } from 'react';
import '../../styling/settings.css';
import {
  setMaxType,
  setMinType,
  setTheme,
} from '../../store/actions/player-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColorPalette } from '../../store/actions/app-actions';
import { handleThemeChange } from '../../utils/helperFunctions';

function Appearance() {
  const dispatch = useDispatch();
  const { minplayertype, maxplayertype, theme } = useSelector(
    (state) => state.player
  );
  const { darkMode, colorpalette } = useSelector((state) => state.app);
  const [customColor, setCustomColor] = useState(
    JSON.parse(window.localStorage.getItem('customtheme'))
  );
  const pickerRef = useRef();

  const handleMini = () => {
    if (minplayertype < 2) {
      dispatch(setMinType(minplayertype + 1));
    } else {
      dispatch(setMinType(0));
    }
  };
  const handleMax = () => {
    if (maxplayertype < 3) {
      dispatch(setMaxType(maxplayertype + 1));
    } else {
      dispatch(setMaxType(0));
    }
  };

  const handleTheme = (hex) => {
    handleThemeChange(hex);
    dispatch(setTheme(hex));
  };
  const handleCustomTheme = (hex) => {
    handleTheme(hex);
    setCustomColor(hex);
    window.localStorage.setItem('customtheme', JSON.stringify(hex));
  };

  return (
    <div>
      <p className="section-heading mb-0">Appearance</p>
      <hr />
      <div className="btn-settings-holder">
        <div className="btn-settings" onClick={handleMini}>
          <span
            style={{
              color: darkMode ? min['type' + minplayertype].color : 'black',
            }}
          >
            <RadioTwoToneIcon className="me-2" />
            Mini Player
          </span>
          <span style={{ color: 'var(--text-primary)' }}>
            {min['type' + minplayertype].name}
          </span>
          <div
            className="btn-settings-slider"
            style={{
              width: min['type' + minplayertype].width,
              background: min['type' + minplayertype].background,
            }}
          ></div>
        </div>
        <div className="btn-settings" onClick={handleMax}>
          <span
            style={{
              color: darkMode ? max['type' + maxplayertype].color : 'black',
            }}
          >
            <LibraryMusicTwoToneIcon className="me-2" />
            Max Player
          </span>
          <span style={{ color: 'var(--text-primary)' }}>
            {max['type' + maxplayertype].name}
          </span>
          <div
            className="btn-settings-slider"
            style={{
              width: max['type' + maxplayertype].width,
              background: max['type' + maxplayertype].background,
            }}
          ></div>
        </div>
        <div
          className="btn-settings themer"
          style={{
            border: 'none',
          }}
        >
          <span className="text-light">
            <PaletteTwoToneIcon className="me-2" />
            Theme
          </span>

          <div className="custom-radio mt-1">
            {themes.map((inside, index) => (
              <div
                className={'fake-radio'}
                style={{
                  background: themes[index].color,
                }}
                key={index}
                onClick={() => handleTheme(themes[index].name)}
              >
                <DoneIcon
                  style={{
                    color:
                      theme === themes[index].name
                        ? 'var(--background)'
                        : 'transparent',
                  }}
                  fontSize="small"
                />
              </div>
            ))}
            <div
              className={(customColor ? '' : 'mix-colors') + ' fake-radio'}
              style={{ background: customColor }}
              onClick={() => pickerRef.current.click()}
            >
              <input
                type="color"
                ref={pickerRef}
                onChange={(e) => handleCustomTheme(e.target.value)}
                value={customColor}
                hidden
              />
              <DoneIcon
                style={{
                  color:
                    customColor === theme ? 'var(--background)' : 'transparent',
                }}
                fontSize="small"
              />
            </div>
          </div>
        </div>
      </div>
      <div>
        <p className="section-heading mb-0">Color pallete</p>
        <div className="color-p-outer">
          {cp.map((c, i) => (
            <div
              className="cp-circle"
              onClick={() => dispatch(toggleColorPalette(cp[i].cp))}
              key={i}
            >
              <DoneIcon
                style={{
                  display: colorpalette !== cp[i].cp && 'none',
                }}
                fontSize="small"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default Appearance;
