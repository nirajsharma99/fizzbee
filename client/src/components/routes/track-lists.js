import { useEffect } from 'react';
import SkeletonTracks from '../skeletons/skeletonTracks';
import TrackItems from './track-item';

function ListTracks({ list, isUsers, playlistId, setChanges }) {
  const containers = document.querySelectorAll('.p-t-container');
  const handleScroll = (e) => {
    console.log(e)
    const triggerBottom = window.innerHeight / 5 * 4;
    console.log(triggerBottom)

    containers?.forEach(box => {
      const boxTop = box.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        box.classList.add('show');
      } else {
        box.classList.remove('show');
      }
    })
  }
  useEffect(() => {

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  })

  return (
    <div className=" mt-3" onScroll={handleScroll}>
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
