import { useEffect } from 'react';
import { useSelector } from 'react-redux';

function DarkMode() {
  const darkMode = useSelector((state) => state.app.darkMode);
  useEffect(() => {
    if (darkMode) {
      document.body.style.background = `black`;
    } else {
      document.body.style.background = `url('/abstract.jpg') no-repeat center`;
      document.body.style.backgroundSize = 'cover';
    }
  }, [darkMode]);
  return null;
}
export default DarkMode;
