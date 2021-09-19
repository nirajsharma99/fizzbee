import PlayArrowIcon from '@material-ui/icons/PlayArrow';

function ListTracks({ list, play }) {
  function millisToMinutesAndSeconds(millis) {
    var minutes = Math.floor(millis / 60000);
    var seconds = ((millis % 60000) / 1000).toFixed(0);
    return seconds === 60
      ? minutes + 1 + ':00'
      : minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
  }
  return (
    <div className="px-3">
      {list?.map((item, index) => (
        <div key={index} className="py-2 d-flex justify-content-center">
          <div className="p-tracks-pic">
            <img
              src={item?.track?.album?.images[2].url}
              style={{ borderRadius: '10px' }}
            />
          </div>
          <div className="p-tracks-info">
            <span className="text-light h5">{item?.track?.name}</span>
            <span className="text-secondary">
              {item.track?.artists.map((artist) => artist.name)}
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
            <button
              className="border-0 bg-transparent"
              style={{ color: 'rgb(0, 255, 127)' }}
              onClick={() => {
                play(item?.track?.uri);
              }}
            >
              <PlayArrowIcon fontSize="large" />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
export default ListTracks;
