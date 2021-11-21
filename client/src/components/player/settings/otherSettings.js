import { useState } from 'react';
import './settings.css';
import { useDataHandlerValue } from '../../contextapi/DataHandler';

function OtherSettings() {
  const [{ vcLang }, dispatch] = useDataHandlerValue();
  const [lang, setLang] = useState(vcLang);
  const [bg, setBg] = useState(false);

  const languages = [
    'en-IN/(English India)',
    'en-US/(English US)',
    'en-GB/(English UK)',
    'en-IE/(English Ireland)',
  ];

  const handleChange = (event) => {
    setLang(event.target.value);
    dispatch({ type: 'SET_VC_LANG', lang: event.target.value.split('/')[0] });
  };
  const handleAlbumBG = () => {
    setBg(!bg);
    dispatch({
      type: 'SET_ALBUM_BG',
      show: !bg,
    });
  };
  return (
    <div>
      <p className="section-heading mb-0">Other Settings</p>
      <hr />
      <div className="vc-settings mt-3 ms-5">
        <label className="section-heading mb-2 me-3" for="vc-lang">
          Voice command language
        </label>
        <div className="custom-select-2">
          <select name="vc-lang" value={lang} onChange={handleChange}>
            {languages.map((lang, i) => (
              <option value={lang} ket={i}>
                {lang}
              </option>
            ))}
          </select>
        </div>
      </div>
      <div className="vc-settings mt-3 ms-5">
        <span className="section-heading mb-2 me-3">
          Current song background
        </span>
        <label class="toggle-switch-3">
          <input type="checkbox" value={bg} onChange={handleAlbumBG}></input>
          <span>
            <i></i>
          </span>
        </label>
      </div>
    </div>
  );
}
export default OtherSettings;
