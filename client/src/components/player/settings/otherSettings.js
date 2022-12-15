import { useState } from 'react';
import '../../styling/settings.css';
import { setVCLang } from '../../store/actions/player-actions';
import { setAlbumBG, toggleDarkMode } from '../../store/actions/app-actions';
import { useDispatch, useSelector } from 'react-redux';
import CustomSwitch from '../../utils/CustomSwitch';

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
          <CustomSwitch currentValue={albumBackground} handleChange={handleAlbumBG} />

        </div>
        <div className="other-settings">
          <span className="section-heading mb-2 me-3">Dark Mode</span>
          <CustomSwitch currentValue={darkMode} handleChange={() => dispatch(toggleDarkMode())} />

        </div>
      </div>
    </div>
  );
}
export default OtherSettings;
