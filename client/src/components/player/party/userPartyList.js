import SkeletonTracks from '../../skeletons/skeletonTracks';
import UserPartyItem from './userPartyItem';

function UserPartyList({ list, isUsers, playlistId, setChanges }) {
    return (
        <div className=" mt-3">
            {list?.map((item, index) => (
                <UserPartyItem
                    key={index}
                    index={index}
                    item={item}
                    list={list}
                />
            ))}
            {!list && <SkeletonTracks />}
        </div>
    );
}
export default UserPartyList;
