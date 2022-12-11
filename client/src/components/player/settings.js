import Appearance from './settings/appearance';
import SelectFont from './settings/font';
import ImageSlider from './settings/imageSlider';
import IslandSettings from './settings/islandSettings';
import NotibarSettings from './settings/notibarSettings';
import OtherSettings from './settings/otherSettings';
import UserData from './settings/user';

function Settings() {
  return (
    <div className="display-cut">
      <div className="settings">
        <UserData />
        <Appearance />
        <ImageSlider />
        <IslandSettings />
        <NotibarSettings />
        <SelectFont />
        <OtherSettings />
      </div>
    </div>
  );
}
export default Settings;
