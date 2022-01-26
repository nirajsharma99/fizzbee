import { useState } from 'react';
import '../../styling/settings.css';
import { setVCLang } from '../../store/actions/player-actions';
import { setAlbumBG, toggleDarkMode } from '../../store/actions/app-actions';
import { useDispatch, useSelector } from 'react-redux';

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
    <div>
      <p className="section-heading mb-0">Other Settings</p>
      <hr />
      <div className="vc-settings mt-3 ms-3">
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
      <div className="vc-settings mt-3 ms-3">
        <span className="section-heading mb-2 me-3">
          Current song background
        </span>
        <label className="toggle-switch-3">
          <input
            type="checkbox"
            checked={albumBackground}
            onChange={handleAlbumBG}
          ></input>
          <span>
            <i></i>
          </span>
        </label>
      </div>
      <div className="vc-settings mt-3 ms-3">
        <span className="section-heading mb-2 me-3">Dark Mode</span>
        <label className="toggle-switch-3">
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => dispatch(toggleDarkMode())}
          ></input>
          <span>
            <i></i>
          </span>
        </label>
      </div>
    </div>
  );
}
export default OtherSettings;
