import { useDataHandlerValue } from '../contextapi/DataHandler';

function Settings() {
  const [{ user }, dispatch] = useDataHandlerValue();
  //console.log(user);
  return (
    <div className="settings">
      <div className="d-flex justify-content-center">
        <div className="user-pic-outer">
          <img src={user?.body?.images?.[0]?.url} className="user-pic" />
          <div className="s-logo">
            <img src={'spotify.png'} />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Settings;
