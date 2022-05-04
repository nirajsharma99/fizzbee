import { useSelector } from 'react-redux';
import { logOut } from '../../utils/helperFunctions';
function UserData() {
  const { user } = useSelector((state) => state.user);
  const userPic = user?.images?.[0]
    ? user?.images?.[0]?.url
    : '/nullavatar.jpg';

  return (
    <div className="account-info">
      <div className="user-pic-outer">
        <img src={userPic} className="user-pic" />
        <div className="s-logo">
          <img src={'/spotify.png'} />
        </div>
      </div>
      <span className="user-name my-2">{user?.display_name}</span>
      <div className="sts-container">
        <div className="user-sts">
          <span>{user?.followers?.total}</span>
          <p>FOLLOWERS</p>
        </div>
        <div className="user-sts">
          <span>{user?.following}</span>
          <p>FOLLOWING</p>
        </div>
        <div className="user-sts">
          <span>{user?.playlists}</span>
          <p>PLAYLISTS</p>
        </div>
      </div>
      <button className="sign-out-btn" onClick={logOut}>
        Log Out
      </button>
    </div>
  );
}
export default UserData;
