import SkeletonTracks from '../../skeletons/skeletonTracks';
import UserPartyItem from './userPartyItem';
import axios from 'axios';
import dotenv from 'dotenv';
dotenv.config();
const { REACT_APP_API_ENDPOINT } = process.env;

function UserPartyList({ list, votingId }) {
    const API_ENDPOINT = REACT_APP_API_ENDPOINT || '';

    const handleRemoveItem = (id) => {
        axios({
            method: 'POST',
            data: { id: id, votingId: votingId },
            url: `${API_ENDPOINT}/removeItem`
        }).then((res) => {
            console.log(res)
        }).catch((err) => {
            console.log(err)
        })
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
