import './skeleton.css';

function SkeletonSPlaylist() {
  return (
    <div>
      <p className="skeleton-heading shimmer mb-0"></p>
      <div className="library-cards-holder">
        {Array(12)
          .fill()
          .map((item, i) => (
            <div
              className="d-flex flex-column align-items-center me-2 p-2 text-decoration-none"
              key={i}
            >
              <div className="skeleton-library-playlist-cards shimmer"></div>
              <span className="skeleton-text w-100 shimmer"></span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default SkeletonSPlaylist;
