import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import Play from '../utlil/play';
import PlayFromList from '../utlil/playfromlist';

function ListTracks({ list }) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <div className=" mt-3">
      <div className="d-flex">
        <div className="p-tracks-pic text-left text-secondary"></div>
        <div className="p-tracks-info d-inline-block ms-2 text-left text-secondary">
          <span className="p-heading">TITLE</span>
        </div>
        <div className="p-tracks-album d-inline-block text-left text-secondary">
          <span className="p-heading">ALBUM</span>
        </div>
        <div className="p-tracks-btn text-center text-secondary">
          <ScheduleTwoToneIcon style={{ color: 'rgb(0, 255, 127)' }} />
        </div>
      </div>
      {list?.map((item, index) => (
        <div key={index} className="p-t-container">
          <div className="p-tracks-pic">
            <img
              src={item?.track?.album?.images[2].url}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="p-tracks-info">
            <span className="text-light h5 mb-0">{item?.track?.name}</span>
            <span className="text-secondary">
              {item.track?.artists.map(
                (item, index) => (index ? ', ' : '') + item.name
              )}
            </span>
          </div>
          <div className="p-tracks-album ">
            <span className="text-secondary h6">
              {item?.track?.album?.name}
            </span>
          </div>
          <div className="p-tracks-btn d-flex justify-content-end align-items-center">
            <span className="text-secondary me-5 d-lg-block d-none">
              {millisToMinutesAndSeconds(item?.track?.duration_ms)}
            </span>
            <PlayFromList index={index} list={list} type="small" />
          </div>
        </div>
      ))}
    </div>
  );
}
export default ListTracks;
