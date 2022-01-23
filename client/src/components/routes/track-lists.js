import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';
import MusicNoteTwoToneIcon from '@material-ui/icons/MusicNoteTwoTone';

function ListTracks({ list, isUsers, playlistId, setChanges }) {
  return (
    <div className=" mt-3">
      <div className="d-flex">
        <div className="p-tracks-pic text-left text-secondary"></div>
        <div className="p-tracks-info d-inline-block p-1 ms-2 text-left text-secondary">
          <span className="p-heading">TITLE</span>
        </div>
        <div className="p-tracks-album d-md-block d-none p-1 text-left text-secondary">
          <span className="p-heading">ALBUM</span>
        </div>
        <div className="p-tracks-btn text-center text-secondary">
          <MusicNoteTwoToneIcon className="theme" />
        </div>
      </div>
      {list?.map((item, index) => (
        <TrackItems
          key={index}
          index={index}
          item={item}
          list={list}
          isUsers={isUsers}
          playlistId={playlistId}
          setChanges={setChanges}
        />
      ))}
      {!list && <SkeletonTracks />}
    </div>
  );
}
export default ListTracks;
