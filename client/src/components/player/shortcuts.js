import CloseIcon from '@material-ui/icons/Close';
import { useDataHandlerValue } from '../contextapi/DataHandler';

function KeyboardShortcuts() {
  const [{ settings }, dispatch] = useDataHandlerValue();
  const data = [
    { name: 'Play/Pause', key: 'p' },
    { name: 'Mute/Unmute', key: 'm' },
    { name: 'Next Song', key: 'X' },
    { name: 'Previous Song', key: 'Z' },
    { name: 'Volume Up', key: '↑' },
    { name: 'Volume Down', key: '↓' },
    { name: 'Show/Hide Controls', key: 'H' },
    { name: 'Show/Hide Queue', key: 'Q' },
    { name: 'Expand/Collapse Player', key: 'F' },
  ];

  function closeModal() {
    dispatch({
      type: 'TOGGLE_KEYBOARD',
      show: false,
    });
  }
  return (
    <div className="atp-outer">
      <div className="atp">
        <div className="atp-header font-1-s ">
          <span className="text-light h4 p-1">Keyboard Shortcuts</span>
          <button className="t-btn" onClick={closeModal}>
            <CloseIcon fontSize="large" style={{ color: 'white' }} />
          </button>
        </div>
        <div className="atp-inner px-4">
          {data.map((item, index) => (
            <div key={index} className="key-info font-1">
              <span className="key-name">{item.name}</span>
              <span className="key-btn">{item.key}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
export default KeyboardShortcuts;
