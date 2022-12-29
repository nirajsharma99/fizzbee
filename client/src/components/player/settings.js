import Appearance from './settings/appearance';
import SelectFont from './settings/font';
import HeaderSettings from './settings/headerSettings';
import ImageSlider from './settings/imageSlider';
import IslandSettings from './settings/islandSettings';
import NotibarSettings from './settings/notibarSettings';
import UserData from './settings/user';

function Settings() {
  return (
    <div className="display-cut">
      <div className="settings">
        <UserData />
        <Appearance />
        <ImageSlider />
        <HeaderSettings />
        <IslandSettings />
        <NotibarSettings />
        <SelectFont />
      </div>
    </div>
  );
}
export default Settings;
