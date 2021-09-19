import './player.css';
import Home from './home';
import Library from './library';
import Search from './search';
import Settings from './settings';

function Player({ tab, play, playFromList }) {
  return (
    <div className="player">
      {tab === 'Home' && <Home play={play} playFromList={playFromList} />}
      {tab === 'Search' && <Search play={play} playFromList={playFromList} />}
      {tab === 'Your library' && <Library />}
      {tab === 'Settings' && <Settings />}
    </div>
  );
}
export default Player;
