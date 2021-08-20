import Sidebar from '../components/sidebar/sidebar';
import Player from '../components/player/player';
import useAuth from '../components/useAuth';
import { useEffect, useState } from 'react';
import '../App.css';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  const [tab, setTab] = useState('Home');
  useAuth(code);
  const accessToken = window.localStorage.getItem('token');

  return (
    <div className="homepage">
      <Sidebar setTab={setTab} />
      {accessToken && <Player accessToken={accessToken} tab={tab} />}
    </div>
  );
}
export default Homepage;
