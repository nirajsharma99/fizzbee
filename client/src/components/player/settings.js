import Appearance from './settings/appearance';
import SelectFont from './settings/font';
import IslandSettings from './settings/islandSettings';
import OtherSettings from './settings/otherSettings';
import UserData from './settings/user';

function Settings() {
  return (
    <div className="display-cut">
      <div className="settings">
        <UserData />
        <Appearance />
        <IslandSettings />
        <SelectFont />
        <OtherSettings />
      </div>
    </div>
  );
}
export default Settings;
