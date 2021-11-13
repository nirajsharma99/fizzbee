import './player.css';
import Home from './home';
import Library from './library';
import Search from './search';
import Settings from './settings';

function Player({ tab }) {
  return (
    <div className="player">
      {tab === 'Home' && <Home />}
      {tab === 'Search' && <Search />}
      {tab === 'Your library' && <Library />}
      {tab === 'Settings' && <Settings />}
    </div>
  );
}
export default Player;
