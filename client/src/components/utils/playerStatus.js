import '../styling/notibar.css';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setNotibar } from '../store/actions/app-actions';

function PlayerStatus() {
  const dispatch = useDispatch();
  const { playerReady, isPremium } = useSelector((state) => state.player);
  useEffect(() => {
    if (playerReady) {
      dispatch(setNotibar('(^◡^) Player is ready!!', true, 7000));
    } else {
      if (isPremium) {
        dispatch(setNotibar("(ㆆ_ㆆ) Player isn't ready...", false, 70000));
      } else {
        dispatch(setNotibar('(ㆆ_ㆆ) Not a premium user!', false, 600000));
      }
    }
  }, [playerReady, isPremium])

  return null;
}
export default PlayerStatus;
