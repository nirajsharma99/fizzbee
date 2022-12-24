import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';

function ListTracks({ list, isUsers, playlistId, setChanges }) {
  return (
    <div className=" mt-3">
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
