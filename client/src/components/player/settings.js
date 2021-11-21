import { useDataHandlerValue } from '../contextapi/DataHandler';
import Appearance from './settings/appearance';
import SelectFont from './settings/font';
import OtherSettings from './settings/otherSettings';

function Settings() {
  const [{ user }, dispatch] = useDataHandlerValue();

  const handleLogout = () => {
    window.localStorage.removeItem('token');
    window.location.href = '/';
  };
  return (
    <div className="display-cut">
      <div className="account-info">
        <div className="user-pic-outer">
          <img src={user?.images?.[0]?.url} className="user-pic" />
          <div className="s-logo">
            <img src={'spotify.png'} />
          </div>
        </div>
      </div>
      <Appearance />
      <SelectFont />
      <OtherSettings />
      <div className="text-center">
        <button className="sign-out-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
    </div>
  );
}
export default Settings;
