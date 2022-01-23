import './player.css';
import MinPlayer1 from './minplayerTypes/player1';
import MinPlayer2 from './minplayerTypes/player2';
import MinPlayer3 from './minplayerTypes/player3';
import { useSelector } from 'react-redux';
function MinPlayer({
  maxPlayer,
  handlePlayPause,
  minPlayer,
  skipNext,
  skipPrevious,
}) {
  const { minplayertype } = useSelector((state) => state.player);
  //console.log(item);
  function minType() {
    switch (minplayertype) {
      case 0:
        return <MinPlayer1 handlePlayPause={handlePlayPause} />;

      case 1:
        return (
          <MinPlayer2
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
          />
        );

      case 2:
        return (
          <MinPlayer3
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
          />
        );

      default:
        console.log('Error');
        break;
    }
  }
  return (
    <div onClick={maxPlayer} hidden={!minPlayer}>
      {minType()}
    </div>
  );
}
export default MinPlayer;
