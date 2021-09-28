import { useDataHandlerValue } from './contextapi/DataHandler';
import { useLocation } from 'react-router';
import { useEffect } from 'react';

const NavHistory = () => {
  const location = useLocation();
  const [{ history }, dispatch] = useDataHandlerValue();
  console.log(history);
  useEffect(() => {
    console.log('changed nav');
    const { pathname } = location;
    const relativeRoute = pathname.split('/')[2]; //["","app","search",..]
    const relativeRouteHistory = history[relativeRoute] || [];
    const prevRelativeRoute =
      relativeRouteHistory[0] || `/app/${relativeRoute}`;

    if (prevRelativeRoute === pathname) {
      //mobile returning to tab,not navigating to new page
      return;
    }
    dispatch({ type: 'SAVE_ROUTE', relativeRoute, payload: pathname });
  }, [location]);
  return null;
};
export default NavHistory;
