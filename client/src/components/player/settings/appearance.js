import RadioTwoToneIcon from '@material-ui/icons/RadioTwoTone';
import LibraryMusicTwoToneIcon from '@material-ui/icons/LibraryMusicTwoTone';
import Apps from '@material-ui/icons/Apps';
import CheckCircleOutline from '@material-ui/icons/CheckCircleOutline';
import DoneIcon from '@material-ui/icons/Done';
import PaletteTwoToneIcon from '@material-ui/icons/PaletteTwoTone';
import { min, max, sideBar, themes, cp } from './settingConstants';
import { useRef, useState } from 'react';
import '../../styling/settings.css';
import {
  setSideBarType,
  setMaxType,
  setMinType,
  setTheme,
} from '../../store/actions/player-actions';
import { useDispatch, useSelector } from 'react-redux';
import { toggleColorPalette } from '../../store/actions/app-actions';
import { handleThemeChange } from '../../utils/helperFunctions';

function Appearance() {
  const dispatch = useDispatch();
  const { minplayertype, maxplayertype, sideBartype, theme } = useSelector(
    (state) => state.player
  );
  const { darkMode, colorpalette } = useSelector((state) => state.app);
  const [customColor, setCustomColor] = useState(
    JSON.parse(window.localStorage.getItem('customtheme'))
  );
  const pickerRef = useRef();

  const handleSelection = (type, setts, op) => {
    var inSetts = (type + op) % Object.keys(setts).length === 0 ? 0 : type + op;
    inSetts = inSetts < 0 ? 0 : inSetts;
    switch (setts) {
      case min:
        dispatch(setMinType(inSetts));
        break;
      case max:
        dispatch(setMaxType(inSetts));
        break;
      case sideBar:
        dispatch(setSideBarType(inSetts));
        break;
      default:
        console.log('Selection error');
        break;
    }
    inSetts = 0;
  }

  function handleTheme(hex) {
    handleThemeChange(hex);
    dispatch(setTheme(hex));
  }
  const handleCustomTheme = (hex) => {
    handleTheme(hex);
    setCustomColor(hex);
    window.localStorage.setItem('customtheme', JSON.stringify(hex));
  };

  return (
    <div>
      <div>
        <p className="section-heading mb-0">Appearance</p>
        <hr />
        <div className="btn-settings-holder">
          <div className="btn-settings">
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
                background: `linear-gradient(to right,${min['type' + minplayertype].background} ${min['type' + minplayertype].width}%, transparent ${100 - min['type' + minplayertype].width}%)`
              }}
            >
              <button
                onClick={() => handleSelection(minplayertype, min, -1)}
              ><ion-icon name="chevron-back-outline" style={{ color: min['type' + minplayertype].color }}></ion-icon></button>
              <button
                onClick={() => handleSelection(minplayertype, min, +1)}
              ><ion-icon name="chevron-forward-outline" style={{ color: min['type' + minplayertype].color }}></ion-icon></button>
            </div>
          </div>
          <div className="btn-settings">
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
                background: `linear-gradient(to right,${max['type' + maxplayertype].background} ${max['type' + maxplayertype].width}%, transparent ${100 - max['type' + maxplayertype].width}%)`

              }}
            >
              <button
                onClick={() => handleSelection(maxplayertype, max, -1)}
              ><ion-icon name="chevron-back-outline" style={{ color: max['type' + maxplayertype].color }}></ion-icon></button>
              <button
                onClick={() => handleSelection(maxplayertype, max, +1)}
              ><ion-icon name="chevron-forward-outline" style={{ color: max['type' + maxplayertype].color }}></ion-icon></button>
            </div>
          </div>
          <div className="btn-settings">
            <span
              style={{
                color: darkMode ? sideBar['type' + sideBartype].color : 'black',
              }}
            >
              <Apps className="me-2" />
              App Bar
            </span>
            <span style={{ color: 'var(--text-primary)' }}>
              {sideBar['type' + sideBartype].name}
            </span>
            <div
              className="btn-settings-slider"
              style={{
                background: `linear-gradient(to right,${sideBar['type' + sideBartype].background} ${sideBar['type' + sideBartype].width}%, transparent ${100 - sideBar['type' + sideBartype].width}%)`
              }}
            >
              <button
                onClick={() => handleSelection(sideBartype, sideBar, -1)}
              ><ion-icon name="chevron-back-outline" style={{ color: sideBar['type' + sideBartype].color }}></ion-icon></button>
              <button
                onClick={() => handleSelection(sideBartype, sideBar, +1)}
              ><ion-icon name="chevron-forward-outline" style={{ color: sideBar['type' + sideBartype].color }}></ion-icon></button>
            </div>
          </div>

        </div>
      </div>

      <div
        className="btn-settings themer"
        style={{
          border: 'none',
        }}
      >
        <span className="section-heading my-2">
          <PaletteTwoToneIcon className="me-2" />
          Theme
        </span>
        <div><span className='color-info'>{customColor ? customColor : theme}</span><CheckCircleOutline style={{ color: theme }} /></div>
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
      <div>
        <p className="section-heading mb-0">Color pallete</p>
        <hr />
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
