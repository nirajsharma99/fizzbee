import Sidebar from '../components/sidebar/sidebar';
import Player from '../components/player/player';
import useAuth from '../components/useAuth';
import { useEffect, useState } from 'react';
import '../App.css';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  const [tab, setTab] = useState('Home');
  //console.log(code);

  return (
    <div className="homepage">
      <Sidebar setTab={setTab} />
      {code && <Player /*spotify={spotify}*/ code={code} tab={tab} />}
    </div>
  );
}
export default Homepage;
