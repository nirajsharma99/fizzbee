import ScheduleTwoToneIcon from '@material-ui/icons/ScheduleTwoTone';
import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';

function ListTracks({ list, isUsers, playlistId }) {
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
          <ScheduleTwoToneIcon className="theme" />
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
        />
      ))}
      {!list && <SkeletonTracks />}
    </div>
  );
}
export default ListTracks;
