import '../styling/player.css';
import MinPlayer1 from './minplayerTypes/player1';
import MinPlayer2 from './minplayerTypes/player2';
import MinPlayer3 from './minplayerTypes/player3';
import { useSelector } from 'react-redux';
import MinPlayer4 from './minplayerTypes/player4';
function MinPlayer({
  maxPlayer,
  handlePlayPause,
  minPlayer,
  skipNext,
  skipPrevious,
}) {
  const { minplayertype, sideBartype } = useSelector((state) => state.player);
  //console.log(minplayertype);
  function minType() {
    switch (minplayertype) {
      case 0:
        return (
          <div onClick={maxPlayer} hidden={!minPlayer}>
            <MinPlayer1 handlePlayPause={handlePlayPause} sideBartype={sideBartype} />
          </div>
        );

      case 1:
        return (
          <div onClick={maxPlayer} hidden={!minPlayer}>
            <MinPlayer2
              handlePlayPause={handlePlayPause}
              skipNext={skipNext}
              skipPrevious={skipPrevious}
              sideBartype={sideBartype}
            />
          </div>
        );

      case 2:
        return (
          <div onClick={maxPlayer} hidden={!minPlayer}>
            <MinPlayer3
              handlePlayPause={handlePlayPause}
              skipNext={skipNext}
              skipPrevious={skipPrevious}
              sideBartype={sideBartype}
            />
          </div>
        );
      case 3:
        return (
          <MinPlayer4
            skipNext={skipNext}
            skipPrevious={skipPrevious}
            sideBartype={sideBartype}
            maxPlayer={maxPlayer}
          />
        );
      default:
        console.log('Error');
        break;
    }
  }
  return (
    <>
      {minType()}
    </>
  );
}
export default MinPlayer;
