import NewReleases from './homeComponents/newreleases';
import TrackHolders from './homeComponents/trackholders';
import { useDataHandlerValue } from '../contextapi/DataHandler';

function Home({ play }) {
  const [{ newReleases, mytoptracks }, dispatch] = useDataHandlerValue();

  return (
    <div className="" style={{ paddingBottom: '200px' }}>
      <NewReleases />
      {mytoptracks && (
        <div>
          <p className="section-heading mb-0">My top tracks</p>
          <TrackHolders show={mytoptracks} play={play} />
        </div>
      )}
    </div>
  );
}
export default Home;
