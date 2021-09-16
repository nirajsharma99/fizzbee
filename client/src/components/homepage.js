import Sidebar from '../components/sidebar/sidebar';
import Player from '../components/player/player';
import useAuth from '../components/useAuth';
import { useEffect, useState } from 'react';
import { Route, HashRouter, NavLink } from 'react-router-dom';
import '../App.css';
import Playlist from './routes/playlist';
import Header from './header';

const code = new URLSearchParams(window.location.search).get('code');

function Homepage() {
  const [tab, setTab] = useState('Home');
  useAuth(code);
  const accessToken = window.localStorage.getItem('token');

  return (
    <HashRouter>
      <div className="homepage">
        <Sidebar setTab={setTab} />
        <div className="player" style={{ padding: '20px' }}>
          <Header />
          <Route exact path="/">
            {accessToken && <Player accessToken={accessToken} tab={tab} />}
          </Route>
          <Route path="/playlist/:id" component={Playlist} />
        </div>
      </div>
    </HashRouter>
  );
}
export default Homepage;
