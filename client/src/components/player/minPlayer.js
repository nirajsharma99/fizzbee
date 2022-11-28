import '../styling/player.css';
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
  const { minplayertype, sideBartype } = useSelector((state) => state.player);
  //console.log(item);
  function minType() {
    switch (minplayertype) {
      case 0:
        return <MinPlayer1 handlePlayPause={handlePlayPause} sideBartype={sideBartype} />;

      case 1:
        return (
          <MinPlayer2
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            sideBartype={sideBartype}
          />
        );

      case 2:
        return (
          <MinPlayer3
            handlePlayPause={handlePlayPause}
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            sideBartype={sideBartype}
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
