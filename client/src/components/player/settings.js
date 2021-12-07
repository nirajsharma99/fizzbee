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
        <span className="user-name my-2">{user?.display_name}</span>
        <div className="sts-container">
          <div className="user-sts">
            <span>{user?.followers?.total}</span>
            <p>FOLLOWERS</p>
          </div>
          <div className="user-sts">
            <span>{user?.following}</span>
            <p>FOLLOWING</p>
          </div>
          <div className="user-sts">
            <span>{user?.playlists}</span>
            <p>PLAYLISTS</p>
          </div>
        </div>
        <button className="sign-out-btn" onClick={handleLogout}>
          Log Out
        </button>
      </div>
      <Appearance />
      <OtherSettings />
      <div className="text-center"></div>
    </div>
  );
}
export default Settings;
