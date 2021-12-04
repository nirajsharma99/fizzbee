import React from 'react';
import '../style/video.css';

const VideoItem = ({ video, handleVideoSelect }) => {
  return (
    <div onClick={() => handleVideoSelect(video)} className="video-container">
      <img
        src={video.snippet.thumbnails.medium.url}
        alt={video.snippet.description}
      />

      <span className="video-title ">{video.snippet.title}</span>
    </div>
  );
};
export default VideoItem;
