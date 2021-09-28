import RepeatOne from '@material-ui/icons/RepeatOne';
import RepeatIcon from '@material-ui/icons/Repeat';

const RepButton = ({ repeatMode }) => {
  return (
    <>
      {() => {
        switch (repeatMode) {
          case 0:
            return <RepeatIcon />;
          case 1:
            return (
              <>
                <RepeatIcon />
                <span className="repeat-type">∞</span>
              </>
            );
          case 2:
            return <RepeatOne />;
        }
      }}
    </>
  );
};
export default RepButton;
