import { useDataHandlerValue } from '../../contextapi/DataHandler';
import RadioTwoToneIcon from '@material-ui/icons/RadioTwoTone';
import LibraryMusicTwoToneIcon from '@material-ui/icons/LibraryMusicTwoTone';
import DoneIcon from '@material-ui/icons/Done';
import PaletteTwoToneIcon from '@material-ui/icons/PaletteTwoTone';
import { min, max, themes } from './appearanceConstants';
import { useState } from 'react';

import './settings.css';
function Appearance() {
  const [{ minplayertype, maxplayertype, theme }, dispatch] =
    useDataHandlerValue();
  const [selected, setSelected] = useState(themes[theme]);
  const handleMini = () => {
    if (minplayertype < 2) {
      dispatch({ type: 'SET_MIN_TYPE', minplayertype: minplayertype + 1 });
    } else {
      dispatch({ type: 'SET_MIN_TYPE', minplayertype: 0 });
    }
  };
  const handleMax = () => {
    if (maxplayertype < 1) {
      dispatch({ type: 'SET_MAX_TYPE', maxplayertype: maxplayertype + 1 });
    } else {
      dispatch({ type: 'SET_MAX_TYPE', maxplayertype: 0 });
    }
  };
  const handleTheme = (index) => {
    setSelected(themes[index]);

    dispatch({ type: 'SET_THEME', theme: index });

    document.documentElement.style.setProperty(
      '--main-theme',
      themes[index].theme
    );
    document.documentElement.style.setProperty(
      '--main-theme-bg',
      themes[index].themeBG
    );
  };
  console.log(selected);
  return (
    <div>
      <p className="section-heading mb-0">Appearance</p>
      <hr />
      <div className="btn-settings-holder">
        <div className="btn-settings" onClick={handleMini}>
          <span style={{ color: min['type' + minplayertype].color }}>
            <RadioTwoToneIcon className="me-2" />
            Mini Player
          </span>
          <span className="text-light">{min['type' + minplayertype].name}</span>
          <div
            className="btn-settings-slider"
            style={{
              width: min['type' + minplayertype].width,
              background: min['type' + minplayertype].background,
            }}
          ></div>
        </div>
        <div className="btn-settings" onClick={handleMax}>
          <span style={{ color: max['type' + maxplayertype].color }}>
            <LibraryMusicTwoToneIcon className="me-2" />
            Max Player
          </span>
          <span className="text-light">{max['type' + maxplayertype].name}</span>
          <div
            className="btn-settings-slider"
            style={{
              width: max['type' + maxplayertype].width,
              background: max['type' + maxplayertype].background,
            }}
          ></div>
        </div>
        <div
          className="btn-settings"
          style={{
            backgroundColor: selected.theme,
          }}
        >
          <span className="text-light">
            <PaletteTwoToneIcon className="me-2" />
            Theme
          </span>

          <div className="custom-radio mt-1">
            {themes.map((theme, index) => (
              <div
                className={'fake-radio'}
                style={{
                  background: themes[index].color,
                }}
                onClick={() => handleTheme(index)}
              >
                <DoneIcon
                  style={{
                    color:
                      selected.name === themes[index].name
                        ? 'black'
                        : 'transparent',
                  }}
                  fontSize="small"
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Appearance;
