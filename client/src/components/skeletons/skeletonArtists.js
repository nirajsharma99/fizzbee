import './skeleton.css';
function SkeletonArtists() {
  return (
    <div>
      <p className="skeleton-heading shimmer mb-0"></p>
      <div className="skeleton-trackholder">
        {Array(10)
          .fill()
          .map((x, i) => (
            <div key={i} className="skeleton-artists shimmer"></div>
          ))}
      </div>
    </div>
  );
}
export default SkeletonArtists;
