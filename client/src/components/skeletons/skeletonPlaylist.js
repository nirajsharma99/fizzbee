import './skeleton.css';
function SkeletonPlaylist() {
  return (
    <div className="d-flex flex-column">
      <p className="skeleton-heading shimmer mb-0"></p>
      <span className="skeleton-text shimmer"></span>
      <div className="skeleton-trackholder">
        {Array(10)
          .fill()
          .map((x, i) => (
            <div
              key={i}
              className="d-flex flex-column align-items-start me-2 p-2"
            >
              <div className="skeleton-playlist shimmer"></div>
              <span className="skeleton-text shimmer"></span>
            </div>
          ))}
      </div>
    </div>
  );
}
export default SkeletonPlaylist;
