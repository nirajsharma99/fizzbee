import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAppBackground } from '../store/actions/app-actions';
import { getImage, handleFontChange, handleThemeChange, hexToRgb } from './helperFunctions';

function SetVisuals() {
  const dispatch = useDispatch();
  const { albumBackground, darkMode, appBackgroundBlur, appBackground } = useSelector((state) => state.app);
  const { theme, font, current } = useSelector((state) => state.player);

  useEffect(() => {
    if (darkMode) {
      document.body.style.background = `black`;
    } else {
      document.body.style.background = `url('/abstract.jpg') no-repeat center`;
      dispatch(setAppBackground('/abstract.jpg'));
    }
    document.body.style.backgroundSize = 'cover';
    document.documentElement.style.setProperty(
      '--app-background-blur',
      `${appBackgroundBlur}px`
    );
    if (appBackground)
      dispatch(setAppBackground(appBackground));
  }, [darkMode, albumBackground]);


  useEffect(() => {
    if (!current) return;
    if (albumBackground) {
      document.body.style.background = `${darkMode ? 'black' : 'white'
        } url(${getImage(current.album.images, 'lg')}) no-repeat center`;
      document.body.style.backgroundSize = 'contain';
    }
  }, [current?.name, darkMode, albumBackground]);

  useEffect(() => {
    const hex = hexToRgb(theme);
    handleThemeChange(hex);
    handleFontChange(font);
  }, [theme, font]);

  return null;
}
export default SetVisuals;
