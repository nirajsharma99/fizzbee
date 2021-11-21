import { useState } from 'react';
import './settings.css';
function SelectFont() {
  const fonts = [
    "'Shadows Into Light', cursive",
    "'Cookie', cursive",
    "'Poiret One', cursive",
    " 'Raleway', sans-serif",
    "'Mountains of Christmas', cursive",
  ];
  const [font, setFont] = useState(fonts[0]);

  const handleChange = (event) => {
    setFont(event.target.value);
    document.documentElement.style.setProperty('--font', event.target.value);
  };
  return (
    <div className="font-container mt-3">
      <label className="section-heading mb-2" for="fonts">
        Font
      </label>
      <div className="custom-select">
        <select
          name="fonts"
          value={font}
          style={{ fontFamily: font }}
          onChange={handleChange}
        >
          {fonts.map((font, i) => (
            <option value={font} ket={i} style={{ fontFamily: font }}>
              {font}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
export default SelectFont;
