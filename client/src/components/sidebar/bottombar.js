import '../styling/sidebar.css';
import { useSelector } from 'react-redux';
import Bottombar1 from './bottombar/bottombar1';
import Bottombar2 from './bottombar/bottombar2';


function Bottombar() {
  const { sideBartype } = useSelector((state) => state.player);

  const returnSideBar = () => {
    switch (sideBartype) {
      case 0:
        return (<Bottombar1 />);
      case 1:
        return (<Bottombar2 />);
      default:
        console.log('Error');
        break;
    }
  }
  return (
    <>{returnSideBar()}</>
  );
}

export default Bottombar;
