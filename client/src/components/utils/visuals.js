import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { handleCustomThemeChange, hexToRgb } from './helperFunctions';

function SetVisuals() {
  const { albumBackground, darkMode } = useSelector((state) => state.app);
  const theme = useSelector((state) => state.player.theme);

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
    handleCustomThemeChange(hex);
  }, [theme]);

  return null;
}
export default SetVisuals;
