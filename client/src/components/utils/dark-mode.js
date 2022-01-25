import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function DarkMode() {
  const { albumBackground, darkMode } = useSelector((state) => state.app);

  useEffect(() => {
    if (albumBackground) return;
    if (darkMode === 'dark') {
      document.body.style.background = `black`;
    } else {
      document.body.style.background = `url('/abstract.jpg') no-repeat center`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [darkMode, albumBackground]);
  return null;
}
export default DarkMode;
