import SkeletonTracks from '../../skeletons/skeletonTracks';
import UserPartyItem from './userPartyItem';
import { removeFromParty } from '../../firebase/handlers';

function UserPartyList({ list, votingId }) {
    const handleRemoveItem = (id) => {
        removeFromParty({ id: id, votingId: votingId });
    }
    return (
        <div className=" mt-3">
            <hr />
            <div
                className={'p-t-container'}
            >
                <div className="p-tracks-pic">
                    <span className='m-auto' style={{ color: 'var(--main-theme)' }}>Votes</span>
                </div>
                <div className='p-tracks-right' style={{ flex: '80% 1' }}>
                    <div className="p-tracks-info">
                        <span className="ps-1" style={{ color: 'var(--main-theme)' }}>Name</span>
                    </div>
                    <div className="p-tracks-album">
                        <span className="ps-1" style={{ color: 'var(--main-theme)' }}>Album</span>
                    </div>
                    <div className="p-tracks-btn ">
                        <span className='px-2' style={{ color: 'var(--main-theme)' }}>Tap</span>
                    </div>
                </div>
            </div>
            <hr />

            {list?.map((item, index) => (
                <UserPartyItem
                    key={index}
                    index={index}
                    item={item}
                    handleRemoveItem={handleRemoveItem}
                />
            ))}
            {!list && <SkeletonTracks />}
        </div>
    );
}
export default UserPartyList;
