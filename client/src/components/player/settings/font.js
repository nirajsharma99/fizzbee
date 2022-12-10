import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setFont } from '../../store/actions/player-actions';
import '../../styling/settings.css';

function SelectFont() {
  const dispatch = useDispatch();
  const appFont = useSelector((state) => state.player.font);
  const fonts = [
    "'Shadows Into Light', cursive",
    "'Cookie', cursive",
    "'Poiret One', cursive",
    " 'Raleway', sans-serif",
    "'Mountains of Christmas', cursive",
  ];

  const handleChange = (font) => {
    dispatch(setFont(font));
    document.documentElement.style.setProperty('--font', font);
  };
  const equalFonts = (font) => {
    return appFont === font;
  };
  return (
    <>
      <p className="section-heading mb-0">Font</p>
      <hr />
      <div className="font-container mt-3">
        {fonts.map((font, i) => (
          <div
            className="font-select"
            key={i}
            style={{
              border: equalFonts(font)
                ? '2px solid var(--main-theme)'
                : '1px solid grey',
              color: equalFonts(font) ? 'var(--main-theme)' : 'grey',
            }}
            onClick={() => handleChange(font)}
          >
            <span style={{ fontFamily: font }}>Aa</span>
            <span style={{ fontFamily: font }}>abc</span>
          </div>
        ))}
      </div>
    </>
  );
}
export default SelectFont;
