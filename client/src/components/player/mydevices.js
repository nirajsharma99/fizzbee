import ComputerIcon from '@material-ui/icons/Computer';
import PhoneIphoneIcon from '@material-ui/icons/PhoneIphone';
import SurroundSoundIcon from '@material-ui/icons/SurroundSound';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMyDevices } from '../store/actions/app-actions';
import { getMyDevices, transferMyPlayback } from '../store/actions/spotify-actions';
import { useEffect } from 'react';

function MyDevices({ handedness, playerType }) {
  const dispatch = useDispatch();
  const { deviceId, maxplayertype } = useSelector((state) => state.player);
  const { settings, colorpalette } = useSelector((state) => state.app);
  const { mydevices } = useSelector((state) => state.user);
  let hside;
  if (typeof handedness === 'boolean') {
    hside = handedness ? 'right' : 'left';
  }

  const playerTypes = ['maxPlayer3', 'maxPlayer4'];
  let colorBackground = playerTypes.includes(playerType) ? (colorpalette ? 'var(--col-thief)' : 'var(--main-theme)') : 'var(--main-theme)';

  useEffect(() => {
    dispatch(getMyDevices());
  }, [settings?.isDevices])

  const showDevices = () => {
    dispatch(toggleMyDevices(!settings.isDevices));
  };

  function deviceType(type, check) {
    switch (type) {
      case 'Computer':
        return (
          <ComputerIcon
            fontSize="medium"
            style={{
              color: check ? 'var(--main-theme)' : 'var(--text-secondary)',
            }}
          />
        );
      case 'Smartphone':
        return (
          <PhoneIphoneIcon
            fontSize="medium"
            style={{
              color: check ? 'var(--main-theme)' : 'var(--text-secondary)',
            }}
          />
        );
      default:
        return (
          <PhoneIphoneIcon
            fontSize="medium"
            style={{
              color: check ? 'var(--main-theme)' : 'var(--text-secondary)',
            }}
          />
        );
    }
  }
  function setDevice(device) {
    if (!device?.id) return;
    dispatch(transferMyPlayback(device));
  }

  function DevicesLayout({ device }) {
    const check = deviceId === device?.id;
    return (
      <div className="device-list" onClick={() => setDevice(device)}>
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
              style={{
                color: check ? colorBackground : 'var(--text-secondary)',
              }}
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
      <button className="t-btn ms-4" onClick={showDevices}>
        <ion-icon
          style={{
            color: settings.isDevices
              ? 'var(--main-theme)'
              : 'white', fontSize: '1.5rem'
          }}
          name="radio"></ion-icon>
      </button>
      {settings.isDevices && (
        <div className={`my-devices ${hside}`}>
          <p
            className="section-heading p-3"
            style={{ color: 'var(--text-secondary)' }}
          >
            Connected devices
          </p>
          <img src="/devices.png" alt="devices" />
          {mydevices?.map((device, index) => (
            <DevicesLayout key={index} device={device} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyDevices;
