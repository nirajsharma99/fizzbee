import MusicVideoTwoToneIcon from '@material-ui/icons/MusicVideoTwoTone';
import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';
function SwitchPlatform({ utubeMode, handleSwitch }) {
  return (
    <div
      className="platform-toggle"
      style={{
        border: utubeMode ? '2px solid red' : '2px solid green',
        background: utubeMode ? 'rgba(255,0,0,0.3)' : 'rgba(30,215,96,0.3)',
      }}
      onClick={handleSwitch}
    >
      {utubeMode ? (
        <MusicVideoTwoToneIcon
          style={{ width: '30px', color: 'rgba(255,0,0,0.8)' }}
        />
      ) : (
        <img src="spotify2.png" width="30" height="30" />
      )}

      {!utubeMode ? (
        <MusicNoteTwoToneIcon
          style={{ width: '30px', color: 'rgba(30,215,96,0.8)' }}
        />
      ) : (
        <img src="youtube.png" width="30" height="20" />
      )}
    </div>
  );
}
export default SwitchPlatform;
