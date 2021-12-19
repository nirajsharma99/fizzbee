import DevicesTwoToneIcon from '@material-ui/icons/DevicesTwoTone';
import ComputerIcon from '@material-ui/icons/Computer';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { useDataHandlerValue } from '../contextapi/DataHandler';
import useSpotify from '../hooks/useSpotify';

function MyDevices() {
  const [{ settings, mydevices, deviceId }, dispatch] = useDataHandlerValue();
  const spotify = useSpotify();

  const showDevices = () => {
    dispatch({ type: 'TOGGLE_MY_DEVICES', show: !settings.isDevices });
  };

  function deviceType(type, check) {
    switch (type) {
      case 'Computer':
        return (
          <ComputerIcon
            fontSize="medium"
            style={{ color: check ? 'var(--main-theme)' : 'white' }}
          />
        );
      case 'Smartphone':
        return (
          <PhoneIphoneIcon
            fontSize="medium"
            style={{ color: check ? 'var(--main-theme)' : 'white' }}
          />
        );
      default:
        return (
          <PhoneIphoneIcon
            fontSize="medium"
            style={{ color: check ? 'var(--main-theme)' : 'white' }}
          />
        );
    }
  }
  function setDevice(id) {
    if (!id) return;
    spotify.transferMyPlayback([id]).then(
      function () {
        console.log('Transfering playback to ' + id);
        dispatch({
          type: 'SET_NOTIBAR',
          errorMsg: 'Transfering playback..',
          errorType: true,
        });
      },
      function (err) {
        //if the user making the request is non-premium, a 403 FORBIDDEN response code will be returned
        console.log('Something went wrong!', err);
      }
    );
  }

  function DevicesLayout({ device }) {
    const check = deviceId === device?.id;
    return (
      <div className="device-list" onClick={() => setDevice(device.id)}>
        {deviceType(device.type, check)}
        <div className="device-info font-1-s">
          <span
            className="device-name"
            style={{ color: check ? 'var(--main-theme)' : 'white' }}
          >
            {device.name}
          </span>
          <span
            className="device-desc"
            style={{ color: check ? 'var(--main-theme)' : 'grey' }}
          >
            <SurroundSoundIcon
              style={{ color: check ? 'var(--main-theme)' : 'grey' }}
              fontSize="small"
            />{' '}
            Spotify Connect
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="devices-container">
      <button className="t-btn ms-lg-0 ms-4" onClick={showDevices}>
        <DevicesTwoToneIcon
          style={{
            color: settings.isDevices ? 'var(--main-theme)' : 'white',
          }}
        />
      </button>
      {settings.isDevices && (
        <div className="my-devices">
          <p className="section-heading p-3">Connected devices</p>
          <img src="devices.png" alt="devices" />
          {mydevices.map((device, index) => (
            <DevicesLayout key={index} device={device} />
          ))}
        </div>
      )}
    </div>
  );
}
export default MyDevices;
