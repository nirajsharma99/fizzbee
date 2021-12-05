import { useState } from 'react';
import { loginUrl } from './config/spotify';

function Frontpage() {
  const [selected, setSelected] = useState('holder-5');
  return (
    <div className="front-page">
      <div className="logo">Fizzbee.</div>
      <div className="login-div">
        <a className="login-link" href={loginUrl}>
          login with&nbsp;
          <img src="spotify.png" width="20" alt="spotify-icon" />
        </a>
      </div>
      <div className="fpage-pic">
        <img src="f1.png" altt="f-pic" alt="demo-music" />
      </div>

      <div className="about-holder">
        <div
          className={`holder-1 ` + (selected === `holder-1` ? 'zf' : '')}
          onClick={() => setSelected(`holder-1`)}
        >
          <img src={'about5.png'} alt="about1" className="about-img" />
        </div>
        {Array(4)
          .fill()
          .map((item, index) => (
            <div
              className={
                `holder-` +
                (index + 2) +
                ' hold-pic ' +
                (selected === `holder-` + (index + 2) ? 'zf' : '')
              }
              key={index}
              onClick={() => setSelected(`holder-` + (index + 2))}
            >
              <img
                src={`about${5 - (index + 1)}.png`}
                alt="about1"
                className="about-img"
              />
            </div>
          ))}
      </div>
      <h5 className="made-by">
        made with &#10084; by
        <a
          href="https://www.linkedin.com/in/niraj-sharma-40132b165"
          className="ms-2 text-decoration-none made-by"
        >
          Niraj
        </a>
      </h5>
    </div>
  );
}
export default Frontpage;
