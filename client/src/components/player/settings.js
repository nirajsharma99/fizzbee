import { useDataHandlerValue } from '../contextapi/DataHandler';
import RadioTwoToneIcon from '@material-ui/icons/RadioTwoTone';
import LibraryMusicTwoToneIcon from '@material-ui/icons/LibraryMusicTwoTone';
import PaletteTwoToneIcon from '@material-ui/icons/PaletteTwoTone';
import { useState } from 'react';
import { min, max, themes } from './appearanceConstants';
function Settings() {
  const [{ user, minplayertype, maxplayertype, theme }, dispatch] =
    useDataHandlerValue();

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
  const handleTheme = () => {
    if (theme < 2) {
      dispatch({ type: 'SET_THEME', theme: theme + 1 });
    } else {
      dispatch({ type: 'SET_THEME', theme: 0 });
    }
  };
  return (
    <div className="display-cut">
      <div className="d-flex justify-content-center">
        <div className="user-pic-outer">
          <img src={user?.images?.[0]?.url} className="user-pic" />
          <div className="s-logo">
            <img src={'spotify.png'} />
          </div>
        </div>
      </div>
      <div>
        <p className="section-heading mb-0">Appearance</p>
        <div className="btn-settings-holder">
          <div className="btn-settings" onClick={handleMini}>
            <span style={{ color: min['type' + minplayertype].color }}>
              <RadioTwoToneIcon className="me-2" />
              Mini Player
            </span>
            <span className="text-light">
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
            <span style={{ color: max['type' + maxplayertype].color }}>
              <LibraryMusicTwoToneIcon className="me-2" />
              Max Player
            </span>
            <span className="text-light">
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
          <div className="btn-settings" onClick={handleTheme}>
            <span style={{ color: themes['type' + theme].color }}>
              <PaletteTwoToneIcon className="me-2" />
              Theme
            </span>
            <span className="text-light">{themes['type' + theme].name}</span>
            <div
              className="btn-settings-slider"
              style={{
                width: themes['type' + theme].width,
                background: themes['type' + theme].background,
              }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
