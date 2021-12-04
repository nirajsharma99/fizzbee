import React from 'react';

const VideoDetail = ({ video }) => {
  if (!video) {
    return (
      <div>
        <h1 className="np-video-title">Please select a video to play.</h1>
        <h4 className="np-video-title">
          Try again later if there are no results.
        </h4>
      </div>
    );
  }

  const videoSrc = `https://www.youtube.com/embed/${video.id.videoId}`;

  return (
    <div className="video-details">
      <iframe
        src={videoSrc}
        className="utube-iframe"
        allowFullScreen
        title="Video player"
      />

      <h5 className="np-video-title">{video.snippet.title}</h5>
    </div>
  );
};

export default VideoDetail;
