import KeyboardArrowRightIcon from '@material-ui/icons/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@material-ui/icons/KeyboardArrowLeft';
import { useState } from 'react';

function ScrollSection(props) {
  const holderRef = props.children.ref;
  const [scrollP, setScrollP] = useState(false);
  const [scrollN, setScrollN] = useState(true);

  const scroll = (scrollOffset) => {
    let scrollLeft = holderRef.current.scrollLeft;
    let scrollDiff = holderRef.current.scrollWidth - scrollLeft;
    let clientWidth = holderRef.current.clientWidth;
    if (scrollLeft > 0) setScrollP(true);
    else setScrollP(false);
    if (Math.trunc(scrollDiff) < clientWidth) setScrollN(false);
    else setScrollN(true);

    holderRef.current.scrollLeft += scrollOffset;
  };

  return (
    <div className="position-relative">
      <button
        className="scroll-nxt-btn"
        onClick={() => scroll(+300)}
        hidden={!scrollN}
      >
        <KeyboardArrowRightIcon style={{ color: 'black' }} />
      </button>
      <button
        className="scroll-prev-btn"
        onClick={() => scroll(-300)}
        hidden={!scrollP}
      >
        <KeyboardArrowLeftIcon style={{ color: 'black' }} />
      </button>
      {props.children}
    </div>
  );
}
export default ScrollSection;
