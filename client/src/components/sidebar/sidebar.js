import '../styling/routes.css';
import { useDispatch, useSelector } from 'react-redux';
import Sidebar1 from './sidebarTypes/sidebar1';
import Sidebar2 from './sidebarTypes/sidebar2';

function Sidebar() {
  const { sideBartype } = useSelector((state) => state.player);

  const returnSideBar = () => {
    switch (sideBartype) {
      case 0:
        return (<Sidebar1 />);
      case 1:
        return (<Sidebar2 />);
      default:
        console.log('Error');
        break;
    }
  }
  return (
    <>{returnSideBar()}</>
  );
}
export default Sidebar;
