function SkeletonTracks() {
  return (
    <div>
      {Array(10)
        .fill()
        .map((x, i) => (
          <div key={i} className="skeleton-t-container">
            <div className="skeleton-p-tracks-pic">
              <div className="track-pic shimmer"></div>
            </div>
            <div className="skeleton-p-tracks-info">
              <span className="skeleton-heading-2 shimmer mb-2"></span>
              <span className="skeleton-text-2 shimmer"></span>
            </div>
            <div className="skeleton-p-tracks-album">
              <span className="skeleton-text-2 shimmer w-50"></span>
            </div>
            <div className="skeleton-p-tracks-btn">
              <div className="skeleton-btn shimmer"></div>
              <div className="skeleton-btn shimmer"></div>
            </div>
          </div>
        ))}
    </div>
  );
}
export default SkeletonTracks;
