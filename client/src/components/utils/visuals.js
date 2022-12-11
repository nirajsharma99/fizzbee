import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handleFontChange, handleThemeChange, hexToRgb } from './helperFunctions';

function SetVisuals() {
  const { albumBackground, darkMode } = useSelector((state) => state.app);
  const { theme, font } = useSelector((state) => state.player);

  useEffect(() => {
    if (albumBackground) return;
    if (darkMode) {
      document.body.style.background = `black`;
    } else {
      document.body.style.background = `url('/abstract.jpg') no-repeat center`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [darkMode, albumBackground]);

  useEffect(() => {
    const hex = hexToRgb(theme);
    handleThemeChange(hex);
    handleFontChange(font);
  }, [theme, font]);

  return null;
}
export default SetVisuals;
